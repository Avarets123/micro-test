export namespace UserRegisterContract {
  export const route = "user.register";

  export class Request {
    email: string;

    password: string;
  }

  export class Response {
    email: string;

    password: string;
  }
}
