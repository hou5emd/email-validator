# email-validator
JavaScript library for email validation

## Last stable release is `1.0.3`

## Usage

```typescript

import { isValidEmail } from '@hou5emd/email-validator';

isValidEmail("test@email.com"); // true


```

```typescript

const { isValidEmail } = require('@hou5emd/email-validator');

isValidEmail("test@email.com"); // true


```

## Documentation

- [RFC vs current validator comparison](docs/rfc-vs-current-validator.md) — what the RFC allows vs what `isValidEmail` checks
- [RFC vs текущий валидатор — сравнение](docs/rfc-vs-current-validator.ru.md) — что допускает RFC и что проверяет `isValidEmail` (на русском)

## Contribute

Contributions welcome!

## Setup

### Install the dependencies:

```bash
npm install
```

### Build the app:

```bash
npm run build
```

### Test the app:

```bash
npm run test
```
