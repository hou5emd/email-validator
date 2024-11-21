declare module "is-valid-email" {
    export function isValidEmail(email: string): boolean;
}
declare module "index" {
    export * from "is-valid-email";
}
