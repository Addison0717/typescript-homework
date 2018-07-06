// src/pages/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength } from 'class-validator'

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  // @Length(5, 25)
  @Column('text')
  name: string

  @IsString()
  @Column('text')
  color: string

  @Column('json')
  board: object
}
