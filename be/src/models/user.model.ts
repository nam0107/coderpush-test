import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { MODEL_NAME, SCHEMA } from '../common/constants/models.constant';
import { Matching } from './matching.model';

export interface UserAttributes {
  id?: number;
  full_name?: string;
  image?: string;
  age?: number;
  meta_data?: any;
  created_at?: Date;
  updated_at?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;
  full_name?: string;
  image?: string;
  age?: number;
  meta_data: any;

  readonly created_at!: Date;
  readonly updated_at!: Date;

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        full_name: {
          type: DataTypes.STRING,
        },
        age: {
          type: DataTypes.INTEGER,
        },
        image: {
          type: DataTypes.STRING,
        },
        meta_data: {
          type: DataTypes.JSON,
        },
      },
      {
        sequelize,
        modelName: MODEL_NAME.USERS,
        schema: SCHEMA,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );

    User.hasMany(Matching, {
      sourceKey: 'id',
      foreignKey: {
        name: 'from_user_id',
      },
      as: 'userMatching',
    });
    Matching.belongsTo(User, {
      targetKey: 'id',
      foreignKey: { name: 'from_user_id' },
    });
    return User;
  }
}
