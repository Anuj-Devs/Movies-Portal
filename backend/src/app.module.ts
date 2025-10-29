import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/moviesdb'),
    AuthModule,
    MoviesModule,
  ],
})
export class AppModule {}
