import {Column, Model, Table, ForeignKey, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript'
import { User } from './user-model';



export interface ITokenInput {
  user: string;
  refreshToken: string;
}

@Table({tableName:"token", timestamps:true, paranoid: true})
export class Token extends Model<Token, ITokenInput> {
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
  public id!: number;
  
  @ForeignKey(() => User)
  @Column({type: DataType.STRING, allowNull: false})
  public user!: string;

  @Column({type: DataType.STRING, allowNull: false,})
  public refreshToken!: string;

  @BelongsTo(() => User)
  public Owner!: User;

  @CreatedAt
  public readonly createdAt!: Date;
  @UpdatedAt
  public readonly updatedAt!: Date;
  @DeletedAt
  public readonly deletedAt!: Date;
}
