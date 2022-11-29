import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../google/protobuf/timestamp.pb';

@Entity()
export class Odd extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public league!: string;

  @Column({ type: 'varchar', name: 'home_team' })
  public homeTeam!: string;

  @Column({ type: 'varchar', name: 'away_team' })
  public awayTeam!: string;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    name: 'home_team_win_odds',
  })
  public homeTeamWinOdds!: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    name: 'away_team_win_odds',
  })
  public awayTeamWinOdds!: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    name: 'draw_odds',
  })
  public drawOdds!: number;

  @Column({ type: 'timestamptz', name: 'game_date' })
  public gameDate!: Timestamp;
}
