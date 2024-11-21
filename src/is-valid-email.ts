const disallowInStart = /[-_\\/[\]{}|!?;:,.#&$@^]/;
const disallowInName = /[-_.]{2,}/;
const disallowInDomain = /(?:(^[-])|([-]$)|([-]{2,})|(_))/g;
const disallowInEmail = /[\\/[\]{}|!?;:,#&$^\s]/;

export function isValidEmail(email: string): boolean {
  if (email.length === 0 || email[0].match(disallowInStart) || email.match(disallowInEmail)) {
    return false;
  }
  const emailParts = email.split('@');

  if (emailParts.length !== 2) {
    return false;
  }

  const userName = emailParts[0];

  const domainParts = emailParts[1].split('.');

  if (
    domainParts.length === 1 ||
    domainParts.some((part) => part === '' || part.length > 63 || part.match(disallowInDomain))
  ) {
    return false;
  }

  if (userName.match(disallowInName)) {
    return false;
  }

  return true;
}
module.exports = { isValidEmail };
