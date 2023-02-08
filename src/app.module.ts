import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [ConfigModule.forRoot(), TokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
