/**
 * Interface for the request body of the Signup API.
 */
export interface ISignupRequestBody {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Interface for the request body of the Login API.
 */
export interface ILoginRequestBody {
  email: string;
  password: string;
}
