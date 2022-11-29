/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "./google/protobuf/timestamp.pb";

export const protobufPackage = "odds";

export interface CreateOddsRequest {
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamWinOdds: number;
  awayTeamWinOdds: number;
  drawOdds: number;
  gameDate: Timestamp | undefined;
}

export interface CreateOddsResponse {
  status: number;
  error: string[];
  id: number;
}

export interface OddData {
  id: number;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamWinOdds: number;
  awayTeamWinOdds: number;
  drawOdds: number;
  gameDate: Timestamp | undefined;
}

export interface FindLeagueOddsRequest {
  league: string;
  gameDate: Timestamp | undefined;
}

export interface FindLeagueOddsResponse {
  status: number;
  error: string[];
  data: OddData[];
}

export interface UpdateGameOddsRequest {
  id: number;
  homeTeamWinOdds: number;
  awayTeamWinOdds: number;
  drawOdds: number;
}

export interface UpdateGameOddsResponse {
  status: number;
  error: string[];
}

export interface DeleteGameOddsRequest {
  id: number;
}

export interface DeleteGameOddsResponse {
  status: number;
  error: string[];
}

export const ODDS_PACKAGE_NAME = "odds";

export interface OddsServiceClient {
  createGameOdds(request: CreateOddsRequest): Observable<CreateOddsResponse>;

  findLeagueOdds(request: FindLeagueOddsRequest): Observable<FindLeagueOddsResponse>;

  updateGameOdds(request: UpdateGameOddsRequest): Observable<UpdateGameOddsResponse>;

  deleteGameOdds(request: DeleteGameOddsRequest): Observable<DeleteGameOddsResponse>;
}

export interface OddsServiceController {
  createGameOdds(
    request: CreateOddsRequest,
  ): Promise<CreateOddsResponse> | Observable<CreateOddsResponse> | CreateOddsResponse;

  findLeagueOdds(
    request: FindLeagueOddsRequest,
  ): Promise<FindLeagueOddsResponse> | Observable<FindLeagueOddsResponse> | FindLeagueOddsResponse;

  updateGameOdds(
    request: UpdateGameOddsRequest,
  ): Promise<UpdateGameOddsResponse> | Observable<UpdateGameOddsResponse> | UpdateGameOddsResponse;

  deleteGameOdds(
    request: DeleteGameOddsRequest,
  ): Promise<DeleteGameOddsResponse> | Observable<DeleteGameOddsResponse> | DeleteGameOddsResponse;
}

export function OddsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createGameOdds", "findLeagueOdds", "updateGameOdds", "deleteGameOdds"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OddsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OddsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ODDS_SERVICE_NAME = "OddsService";
