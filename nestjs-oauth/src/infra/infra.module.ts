import { Module } from '@nestjs/common';
import { AuthModule } from '../domain/entities/auth/auth.module';
import { MongoModule } from './adapters/repositories/mongodb/mongo.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongoModule, AuthModule, HttpModule],
})
export class InfraModule {}
