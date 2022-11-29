import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Odd } from './entity/odd.entity';
import { OddController } from './odd.controller';
import { OddService } from './odd.service';

@Module({
  imports: [TypeOrmModule.forFeature([Odd])],
  controllers: [OddController],
  providers: [OddService],
})
export class OddModule {}
