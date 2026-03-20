# RFC vs Current Validator Comparison

This document compares what the [RFC 5321](https://www.rfc-editor.org/rfc/rfc5321) / [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322) email specifications allow with what the current `isValidEmail` implementation in [`src/is-valid-email.ts`](../src/is-valid-email.ts) supports.

## Summary

`isValidEmail` is a **lightweight, practical validator**. It rejects most obviously invalid addresses and provides fast, dependency-free checking. It is **not** a full RFC-compliant parser. As a result, a small set of technically valid RFC addresses will be rejected, and some edge cases (such as overall length limits or quoted local parts) are not enforced.

---

## Comparison Table

| Case | Example | RFC allows? | Current validator allows? | Notes |
|---|---|:---:|:---:|---|
| Simple email | `user@example.com` | ✅ | ✅ | Basic case works correctly |
| Plus addressing | `user+tag@example.com` | ✅ | ✅ | `+` is a valid `atext` character |
| Dot in local part | `first.last@example.com` | ✅ | ✅ | Dots are fine between characters |
| Quoted local part | `"john..doe"@example.com` | ✅ | ❌ | Quoted strings not supported |
| Escaped chars in quoted local | `"john\"doe"@example.com` | ✅ | ❌ | Escape sequences inside quotes not supported |
| Consecutive dots in unquoted local | `user..name@example.com` | ❌ | ❌ | Both reject (RFC forbids `..` outside quotes) |
| Local part starting with dot | `.user@example.com` | ❌ | ❌ | Both reject |
| Local part ending with dot | `user.@example.com` | ❌ | ⚠️ | RFC forbids it; validator may allow it (no explicit trailing-dot check) |
| RFC-allowed special chars in local | `!user@example.com` | ✅ | ❌ | Characters like `!`, `?`, `{`, `}`, `/`, `|` are RFC `atext` but blocked by `disallowInEmail` |
| Multiple `@` signs | `user@@example.com` | ❌ | ❌ | Both reject |
| Spaces | `user name@example.com` | ❌ | ❌ | Both reject |
| Domain without dot | `user@localhost` | ✅* | ❌ | RFC allows single-label domains; validator requires at least one dot |
| Domain label starting with hyphen | `user@-example.com` | ❌ | ❌ | Both reject |
| Domain label ending with hyphen | `user@example-.com` | ❌ | ❌ | Both reject |
| Underscore in domain label | `user@my_host.com` | ❌** | ❌ | Both reject |
| Consecutive hyphens (`--`) in domain | `user@exa--mple.com` | ❌*** | ❌ | Both reject; see punycode note below |
| Punycode / `xn--` domain | `user@xn--nxasmq6b.com` | ✅ | ❌ | `xn--` contains `--`; blocked by `disallowInDomain` regex |
| Domain literal (IP address) | `user@[192.168.1.1]` | ✅ | ❌ | Square brackets are blocked by `disallowInEmail` |
| IPv6 domain literal | `user@[IPv6:2001:db8::1]` | ✅ | ❌ | Same — brackets and `:` are not supported |
| Internationalized email (Unicode local) | `пользователь@example.com` | ✅**** | ⚠️ | Unicode chars pass current regex checks but are not validated for proper UTF-8 encoding |
| IDN domain (Unicode) | `user@пример.рф` | ✅**** | ⚠️ | Same as above |
| Local part longer than 64 chars | `aaaa…(65+)@example.com` | ❌ | ⚠️ | RFC limits local part to 64 chars; validator does not check this |
| Total address longer than 254 chars | `(very long address)` | ❌ | ⚠️ | RFC limits total to 254 chars; validator does not check this |
| Overall domain longer than 253 chars | `user@(very.long.domain)` | ❌ | ⚠️ | RFC limits domain to 253 chars; validator does not check this |
| Domain label longer than 63 chars | `user@aaaa…(64+).com` | ❌ | ❌ | Both reject (validator explicitly checks this) |
| Comment syntax | `john(comment)@example.com` | ✅ | ❌ | Historic RFC feature; not supported |
| Empty string | `` | ❌ | ❌ | Both reject |

> **Legend:** ✅ allowed &nbsp;|&nbsp; ❌ rejected &nbsp;|&nbsp; ⚠️ not checked (may pass or fail silently)

### Footnotes

- \* Single-label domains (e.g. `user@localhost`) are syntactically valid per RFC 5321 but rarely accepted by mail servers.
- \*\* Underscores are not permitted in hostnames per RFC 952, but are sometimes used in internal DNS names. RFC 5322 is more permissive about domain syntax.
- \*\*\* `--` in the third and fourth positions of a label is reserved for internationalized domain names (IDN/Punycode). Outside of that reserved use it is invalid per RFC 5891.
- \*\*\*\* Internationalized email addresses are defined in RFC 6530–6532 (SMTPUTF8 extension) and are not part of classic RFC 5321/5322.

---

## Practical Constraints Checked by the Current Validator

The following rules **are** enforced by `isValidEmail`:

1. **Non-empty** — rejects empty strings immediately.
2. **No illegal starting characters** — the local part cannot start with `-`, `_`, `/`, `[`, `]`, `{`, `}`, `|`, `!`, `?`, `;`, `:`, `,`, `.`, `#`, `&`, `$`, `@`, or `^`.
3. **No globally banned characters** — spaces, backslashes, forward slashes, square brackets, curly braces, `|`, `!`, `?`, `;`, `:`, `,`, `#`, `&`, `$`, `^` are rejected anywhere in the address.
4. **Exactly one `@`** — addresses with zero or more than one `@` are rejected.
5. **Domain requires at least one dot** — single-label domains (e.g. `localhost`) are rejected.
6. **No empty domain labels** — patterns like `user@example..com` are rejected.
7. **Domain label length ≤ 63 characters** — each label between dots is checked individually.
8. **Domain label cannot start or end with `-`** — e.g. `-example.com` or `example-.com` are rejected.
9. **No `--` in domain labels** — consecutive hyphens are rejected (this also blocks valid punycode `xn--` prefixes — see table).
10. **No `_` in domain labels** — underscores anywhere in a domain label are rejected.
11. **No consecutive `[-_.]` pairs in the local part** — patterns like `..`, `__`, `--`, `.-`, `_.` etc. are rejected.

---

## A Note on "RFC-valid" vs "Deliverable"

Passing an RFC syntax check does **not** mean an address is deliverable. To be actually usable, a mail server must:

- Exist and be reachable on the network
- Have valid DNS `MX` records pointing to it
- Accept the specific mailbox

If deliverability matters to your application, consider sending a confirmation email rather than relying solely on syntax validation.

---

## Related

- [`src/is-valid-email.ts`](../src/is-valid-email.ts) — the validator source code
- [RFC 5321 – Simple Mail Transfer Protocol](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5322 – Internet Message Format](https://www.rfc-editor.org/rfc/rfc5322)
- [RFC 6530 – Overview and Framework for Internationalized Email](https://www.rfc-editor.org/rfc/rfc6530)
