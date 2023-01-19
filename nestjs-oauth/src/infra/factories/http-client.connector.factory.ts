import HttpClientConnector from '../adapters/http-client/connectors/http-client.connector';
import {
  API_URL,
} from '../environments/index';

export default class HttpClientConnectorFactory {
  static validUsersUriToGet(queryParams: string): HttpClientConnector {
    const httpClient = new HttpClientConnector();
    httpClient.setDomain(API_URL);
    httpClient.setApi('api-users/v1');
    httpClient.setResource(`users${queryParams}`);
    return httpClient;
  }

  static validUsersUriToPatch(pathParam: string): HttpClientConnector {
    const httpClient = new HttpClientConnector();
    httpClient.setDomain(API_URL);
    httpClient.setApi('api-users/v1');
    httpClient.setResource('users');
    httpClient.setPathParam(pathParam);

    return httpClient;
  }

  static validUserUriToPost(): HttpClientConnector {
    const httpClient = new HttpClientConnector();
    httpClient.setDomain(API_URL);
    httpClient.setApi('api-users/v1');
    httpClient.setResource('users');
    return httpClient;
  }
}
