import { Module } from '@nestjs/common';
import { OddController } from './odd.controller';
import { OddService } from './odd.service';

@Module({
  controllers: [OddController],
  providers: [OddService]
})
export class OddModule {}
