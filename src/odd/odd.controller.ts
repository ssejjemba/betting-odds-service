import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateOddsRequestDto,
  FindLeagueOddsRequestDto,
  UpdateGameOddsRequestDto,
} from './odd.dto';
import { OddService } from './odd.service';
import {
  CreateOddsResponse,
  DeleteGameOddsRequest,
  DeleteGameOddsResponse,
  FindLeagueOddsResponse,
  ODDS_SERVICE_NAME,
  UpdateGameOddsResponse,
} from './odds.pb';

@Controller('odd')
export class OddController {
  @Inject(OddService)
  private readonly service: OddService;

  @GrpcMethod(ODDS_SERVICE_NAME, 'createGameOdds')
  private createGameOdds(
    payload: CreateOddsRequestDto,
  ): Promise<CreateOddsResponse> {
    return this.service.create(payload);
  }

  @GrpcMethod(ODDS_SERVICE_NAME, 'findLeagueOdds')
  private findLeagueOdds(
    payload: FindLeagueOddsRequestDto,
  ): Promise<FindLeagueOddsResponse> {
    return this.service.find(payload);
  }

  @GrpcMethod(ODDS_SERVICE_NAME, 'updateGameOdds')
  private updateGameOdds(
    payload: UpdateGameOddsRequestDto,
  ): Promise<UpdateGameOddsResponse> {
    return this.service.update(payload);
  }

  @GrpcMethod(ODDS_SERVICE_NAME, 'deleteGameOdds')
  private deleteGameOdds(
    payload: DeleteGameOddsRequest,
  ): Promise<DeleteGameOddsResponse> {
    return this.service.delete(payload);
  }
}
