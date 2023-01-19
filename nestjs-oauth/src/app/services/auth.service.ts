import { AuthServicePort } from '../../domain/ports/primary/auth-service.port';
import { HttpException, Injectable } from '@nestjs/common';
import * as queryString from 'querystring';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { KeycloakToken } from '../../domain/entities/auth/keycloack-token.model';
import {
  KEYCLOAK_LOGIN_URI,
  KEYCLOAK_RESPONSE_TYPE,
  KEYCLOAK_SCOPE,
  KEYCLOAK_REDIRECT_URI,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_TOKEN_URI,
  KEYCLOAK_LOGOUT_URI,
} from '../../infra/environments/index';

@Injectable()
export class AuthService implements AuthServicePort {
  constructor(private httpService: HttpService) {}

  getUrlLogin(): any {
    return {
      url:
        `${KEYCLOAK_LOGIN_URI}` +
        `?client_id=${KEYCLOAK_CLIENT_ID}` +
        `&response_type=${KEYCLOAK_RESPONSE_TYPE}` +
        `&scope=${KEYCLOAK_SCOPE}` +
        `&redirect_uri=${KEYCLOAK_REDIRECT_URI}`,
    };
  }

  getAccessToken(code: string) {
    const params = {
      grant_type: 'authorization_code',
      client_id: KEYCLOAK_CLIENT_ID,
      client_secret: KEYCLOAK_CLIENT_SECRET,
      code: code,
      redirect_uri: KEYCLOAK_REDIRECT_URI,
    };

    return this.httpService
      .post(
        KEYCLOAK_TOKEN_URI,
        queryString.stringify(params),
        this.getContentType(),
      )
      .pipe(
        map(
          (res) =>
            new KeycloakToken(
              res?.data?.access_token,
              res?.data?.refresh_token,
              res?.data?.expires_in,
              res?.data?.refresh_expires_in,
            ),
        ),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }

  refreshAccessToken(refresh_token: string) {
    const params = {
      grant_type: 'refresh_token',
      client_id: KEYCLOAK_CLIENT_ID,
      client_secret: KEYCLOAK_CLIENT_SECRET,
      refresh_token: refresh_token,
      redirect_uri: KEYCLOAK_REDIRECT_URI,
    };

    return this.httpService
      .post(
        KEYCLOAK_TOKEN_URI,
        queryString.stringify(params),
        this.getContentType(),
      )
      .pipe(
        map(
          (res) =>
            new KeycloakToken(
              res.data.access_token,
              res.data.refresh_token,
              res.data.expires_in,
              res.data.refresh_expires_in,
            ),
        ),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }

  logout(refresh_token: string) {
    const params = {
      client_id: KEYCLOAK_CLIENT_ID,
      client_secret: KEYCLOAK_CLIENT_SECRET,
      refresh_token: refresh_token,
    };

    return this.httpService
      .post(
        KEYCLOAK_LOGOUT_URI,
        queryString.stringify(params),
        this.getContentType(),
      )
      .pipe(
        map((res) => res.data),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }

  getContentType() {
    return { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
  }
}
