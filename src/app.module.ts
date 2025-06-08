/* eslint-disable prettier/prettier */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { LoggingMiddleware } from './logging/logging.middleware';
import { AuthModule } from './modules/auth/auth.module';
// import mongoose from 'mongoose';
@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule,AuthModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    AuthModule,
    // MongooseModule.forRoot("mongodb://localhost:27017/nest-todo") 
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
  
}