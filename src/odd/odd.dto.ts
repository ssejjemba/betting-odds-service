import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Timestamp } from './google/protobuf/timestamp.pb';
import {
  CreateOddsRequest,
  FindLeagueOddsRequest,
  UpdateGameOddsRequest,
  DeleteGameOddsRequest,
} from './odds.pb';

export class FindLeagueOddsRequestDto implements FindLeagueOddsRequest {
  @IsString()
  @IsNotEmpty()
  public readonly league: string;

  @IsDateString()
  public readonly gameDate: Timestamp;
}

export class UpdateGameOddsRequestDto implements UpdateGameOddsRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly homeTeamWinOdds: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly awayTeamWinOdds: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly drawOdds: number;
}

export class DeleteGameOddsRequestDto implements DeleteGameOddsRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}

export class CreateOddsRequestDto implements CreateOddsRequest {
  @IsString()
  @IsNotEmpty()
  public readonly league: string;

  @IsString()
  @IsNotEmpty()
  public readonly homeTeam: string;

  @IsString()
  @IsNotEmpty()
  public readonly awayTeam: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly homeTeamWinOdds: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly awayTeamWinOdds: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly drawOdds: number;

  @IsDateString()
  public readonly gameDate: Timestamp;
}
