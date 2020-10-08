export interface AccesTokenParams {
  grant_type: string;
  code: string;
  client_id: string;
  redirect_uri: string;
  code_verifier: string;
  client_secret: string;
}

export interface RedirectQuery {
  code?: string;
  state?: string;
  error?: string;
}

export interface SuccessfulAccesToken {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}
