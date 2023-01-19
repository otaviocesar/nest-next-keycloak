import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app/app.module';
import UserFactory from '../../src/infra/factories/user.factory';

describe('AppController (integration)', () => {
  let app: INestApplication;
  jest.setTimeout(20000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const mockUser = UserFactory.validUserToCreate();

  describe('/users (POST)', () => {
    it('it should return unauthorized if it makes a request without authorization token', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json; charset=utf-8')
        .send(mockUser)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/users (GET)', () => {
    it('it should return OK if it makes a request without authorization token', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json; charset=utf-8')
        .expect(HttpStatus.OK);
    });
  });
});
