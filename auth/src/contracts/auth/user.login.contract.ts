import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export namespace UserLoginContract {
  export const route = 'user.auth'

  export class Request {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
  }

  export class Response {
    accessToken: string
  }
}
