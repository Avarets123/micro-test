import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export namespace UserRegisterContract {
  export const route = 'user.register'

  export class Request {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
  }

  export class Response {
    email: string

    password: string
  }
}
