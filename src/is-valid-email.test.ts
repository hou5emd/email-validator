import { isValidEmail } from './is-valid-email';

const validEmails = [
  'my_name@email.ru',
  'this.is.valid@e.mail.ru',
  'mail@e-mail.ru',
  'e-mail@mail.ru',
  'ron@джино.рф',
  'mail@mail.ru',
  'four@domain.level.email.ru',
  'ten@domain.level.email.email.ru.domain.level.email.email.ru',
];

const invalidEmails = [
  '',
  ' qqqqq@mail.ru',
  'q qq@mail.ru',
  'qqq@ma il.ru',
  '@mail.ru',
  'aaaa.ru',
  'a@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaa.ru',
  'ma..il@mail.ru',
  '!!!!!!!!mail@email.ru',
  '__asdasd__@mail@email.ru',
  'this@is..invalid.mail.ru',
  'this..is..invalid@mail.ru',
  '.mail@mail.ru',
  '-mail@mail.ru',
  'mail@e_mail.ru',
  'mai@lmail@e_mail.ru',
  'mail@e_mail_.ru',
  'mail@email_.ru',
  'the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-six-characters-cannot-be-longer-than-two-hundred-and-fifty-six-characters-cannot-be-longer-than-two-hundred-and-fifty-six-characters-cannot-be-longer-than-two-hundred-and-fifty-six-characters.and-this-address-is-257-characters-exactly.so-it-should-be-invalid.and-im-going-to-add-some-more-words-here.to-increase-the-lenght-blah-blah-blah-blah-blah-.org',
];

describe('Test email validation', () => {
  it('Should be valid', () => {
    validEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  it('Should be invalid', () => {
    invalidEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });
});
