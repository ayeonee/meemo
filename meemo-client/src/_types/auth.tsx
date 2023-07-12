export interface Response {
  type: string;
  payload: any;
}

export interface UserIdInfo {
  userIdInfo: string | null;
}

export interface OAuthUserPayload {
  loginSuccess: boolean;
  userId: string;
  name: string;
}

export interface LoginUserPayload {
  loginSuccess: boolean;
  userId: string;
  name: string;
  message: string;
}
