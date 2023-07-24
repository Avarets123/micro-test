export namespace UserLoginContract {
  export const route = "user.auth";

  export class Request {
    email: string;

    password: string;
  }

  export class Response {
    accessToken: string;
  }
}
