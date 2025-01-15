export interface ISignupRequestBody {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ILoginRequestBody {
  email: string;
  password: string;
}
