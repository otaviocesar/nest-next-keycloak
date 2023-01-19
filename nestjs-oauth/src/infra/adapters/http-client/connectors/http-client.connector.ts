export default class HttpClientConnector {
  private domain: string;

  private api: string;

  private resource: string;

  private pathParam: string;

  private headers = {};

  public getDomain(): string {
    return this.domain;
  }

  public setDomain(value: string) {
    this.domain = value;
  }

  public getApi(): string {
    return this.api;
  }

  public setApi(value: string) {
    this.api = value;
  }

  public getResource(): string {
    return this.resource;
  }
  public setResource(value: string) {
    this.resource = value;
  }

  public getPathParam(): string {
    return this.pathParam;
  }

  public setPathParam(value: string) {
    this.pathParam = value;
  }

  public getHeaders() {
    return this.headers;
  }

  public getBasicUrl(): string {
    return `${this.getDomain()}/${this.getApi()}/${this.getResource()}`;
  }

  public getPatchUrl(): string {
    return `${this.getDomain()}/${this.getApi()}/${this.getResource()}/${this.getPathParam()}`;
  }
}
