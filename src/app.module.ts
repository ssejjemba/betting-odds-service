import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OddModule } from './odd/odd.module';

@Module({
  imports: [OddModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
