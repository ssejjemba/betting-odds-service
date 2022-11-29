import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Odd } from './entity/odd.entity';
import {
  CreateOddsRequestDto,
  FindLeagueOddsRequestDto,
  UpdateGameOddsRequestDto,
  DeleteGameOddsRequestDto,
} from './odd.dto';
import {
  CreateOddsResponse,
  DeleteGameOddsResponse,
  FindLeagueOddsResponse,
  UpdateGameOddsResponse,
} from './odds.pb';

@Injectable()
export class OddService {
  @InjectRepository(Odd)
  private readonly repository: Repository<Odd>;

  public async find({
    league,
    gameDate,
  }: FindLeagueOddsRequestDto): Promise<FindLeagueOddsResponse> {
    try {
      const leagueOdds: Odd[] = await this.repository.find({
        where: { league, gameDate },
      });

      if (!leagueOdds) {
        return { data: null, error: [''], status: HttpStatus.NOT_FOUND };
      }

      return { data: leagueOdds, error: null, status: HttpStatus.OK };
    } catch (e) {
      return {
        data: null,
        error: ['Internal server error when saving entry'],
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  public async create(
    payload: CreateOddsRequestDto,
  ): Promise<CreateOddsResponse> {
    const odd: Odd = new Odd();

    odd.awayTeam = payload.awayTeam;
    odd.awayTeamWinOdds = payload.awayTeamWinOdds;
    odd.drawOdds = payload.drawOdds;
    odd.gameDate = payload.gameDate;
    odd.homeTeam = payload.homeTeam;
    odd.homeTeamWinOdds = payload.homeTeamWinOdds;
    odd.league = payload.league;

    try {
      await this.repository.save(odd);
      return { id: odd.id, error: null, status: HttpStatus.OK };
    } catch (e) {
      return {
        id: null,
        error: ['Internal server error when saving entry'],
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  public async update(
    payload: UpdateGameOddsRequestDto,
  ): Promise<UpdateGameOddsResponse> {
    try {
      const odd = await this.repository.findOne({ where: { id: payload.id } });
      if (!odd) {
        return {
          error: ['Odd does not exist in the database'],
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.repository.update(odd.id, {
        homeTeamWinOdds: payload.homeTeamWinOdds,
        awayTeamWinOdds: payload.awayTeamWinOdds,
        drawOdds: payload.drawOdds,
      });

      return { error: null, status: HttpStatus.OK };
    } catch (e) {
      return {
        error: ['Internal server error when saving entry'],
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  public async delete({
    id,
  }: DeleteGameOddsRequestDto): Promise<DeleteGameOddsResponse> {
    try {
      const odd = await this.repository.findOne({ where: { id } });
      if (!odd) {
        return {
          error: ['Odd does not exist in the database'],
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.repository.delete({ id });

      return { error: null, status: HttpStatus.OK };
    } catch (e) {
      return {
        error: ['Internal server error when saving entry'],
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
