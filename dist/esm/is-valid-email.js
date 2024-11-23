var disallowInStart = /[-_\\/[\]{}|!?;:,.#&$@^]/;
var disallowInName = /[-_.]{2,}/;
var disallowInDomain = /(?:(^[-])|([-]$)|([-]{2,})|(_))/g;
var disallowInEmail = /[\\/[\]{}|!?;:,#&$^\s]/;
export function isValidEmail(email) {
    if (email.length === 0 || email[0].match(disallowInStart) || email.match(disallowInEmail)) {
        return false;
    }
    var emailParts = email.split('@');
    if (emailParts.length !== 2) {
        return false;
    }
    var userName = emailParts[0];
    var domainParts = emailParts[1].split('.');
    if (domainParts.length === 1 ||
        domainParts.some(function (part) { return part === '' || part.length > 63 || part.match(disallowInDomain); })) {
        return false;
    }
    if (userName.match(disallowInName)) {
        return false;
    }
    return true;
}
module.exports = { isValidEmail: isValidEmail };
