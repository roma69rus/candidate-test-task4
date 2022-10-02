import {Column, Model, Table, ForeignKey, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript'
import { Token } from './token-model';



export interface IUserInput {
  id: string;
  password: string;
}

@Table({tableName:"user", timestamps:true, paranoid: true})
export class User extends Model<User, IUserInput> {
  @Column({type: DataType.STRING, primaryKey: true, unique: true, allowNull: false})
  public id!: string;

  @Column({type: DataType.STRING, allowNull: false})
  public password!: string;

  // @HasMany(() => Token, {
  //   onDelete: "CASCADE",
  //   hooks: true
  // })
  // public ProductOptions!: Token[];

  @CreatedAt
  public readonly createdAt!: Date;
  @UpdatedAt
  public readonly updatedAt!: Date;
  @DeletedAt
  public readonly deletedAt!: Date;
}
