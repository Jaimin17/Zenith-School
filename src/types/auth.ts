export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse {
  data?: {
    tokens?: {
      accessToken: string;
      refreshToken: string;
    };
  };
  access?: string;
  refresh?: string;
  access_token?: string;
  refresh_token?: string;
  accessToken?: string;
  refreshToken?: string;
}

