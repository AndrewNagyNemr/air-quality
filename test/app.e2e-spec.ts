import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AirQuality (e2e)', () => {
  let app: INestApplication;

  afterAll(() => {
    app.close()
  })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/air-quality (GET)', () => {
    return request(app.getHttpServer())
      .get('/air-quality')
      .expect(200).expect((res) => {
        const { Result } = res.body
        expect(Result.Polution).toBeDefined()
        expect(Result.Polution.ts).toBeDefined()
        expect(Result.Polution.aqius).toBeDefined()
        expect(Result.Polution.mainus).toBeDefined()
        expect(Result.Polution.aqicn).toBeDefined()
        expect(Result.Polution.maincn).toBeDefined()
      })
  });
});
