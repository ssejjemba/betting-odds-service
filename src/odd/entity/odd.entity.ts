import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Odd extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public league!: string;

  @Column({ type: 'varchar' })
  public home_team!: string;

  @Column({ type: 'varchar' })
  public away_team!: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  public home_team_win_odds!: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  public away_team_win_odds!: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  public draw_odds!: number;

  @Column({ type: 'timestamptz' })
  public game_date!: Date;
}
