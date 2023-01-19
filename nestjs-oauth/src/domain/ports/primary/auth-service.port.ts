export interface AuthServicePort {
  getUrlLogin();

  getAccessToken(code: string);

  refreshAccessToken(refresh_token: string);

  logout(refresh_token: string);
  
  getContentType();
}
