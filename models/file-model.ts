import {Column, Model, Table, ForeignKey, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript'
import { User } from './user-model';



export interface IFileInput {
  name: string;
  extension: string;
  MIME_type: string;
  size: string;
  user?: string;
}

@Table({tableName:"file", timestamps:true, paranoid: true})
export class FileModel extends Model<FileModel, IFileInput> {
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
  public id!: number;
  
  @Column({type: DataType.STRING, allowNull: false})
  public name!: string;

  @Column({type: DataType.STRING, allowNull: false,})
  public extension!: string;

  @Column({type: DataType.STRING, allowNull: false,})
  public MIME_type!: string;

  @Column({type: DataType.STRING, allowNull: false,})
  public size!: string;

  @ForeignKey(() => User)
  @Column({type: DataType.STRING})
  public user!: string;

  @BelongsTo(() => User)
  public Owner!: User;

  @CreatedAt
  public readonly createdAt!: Date;
  @UpdatedAt
  public readonly updatedAt!: Date;
  @DeletedAt
  public readonly deletedAt!: Date;
}
