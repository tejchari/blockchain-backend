import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Module,
  CacheModule,
  CacheInterceptor,
  CacheStore,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokensModule } from './tokens/tokens.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
const redisStore = require('cache-manager-redis-store').redisStore;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TokensModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
