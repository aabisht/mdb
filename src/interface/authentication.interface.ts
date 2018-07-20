export interface IRequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface IValidateWithLogin {
  success: boolean;
  request_token: string;
}

export interface ISession {
  success: boolean;
  session_id: string;
}
