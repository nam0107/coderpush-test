import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { MODEL_NAME, SCHEMA } from '../common/constants/models.constant';

export interface MatchingAttributes {
  id?: number;
  from_user_id?: number;
  to_user_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type MatchingCreationAttributes = Optional<MatchingAttributes, 'id'>;

export class Matching
  extends Model<MatchingAttributes, MatchingCreationAttributes>
  implements MatchingAttributes
{
  id!: number;
  from_user_id?: number;
  to_user_id?: number;

  readonly created_at!: Date;
  readonly updated_at!: Date;

  static initModel(sequelize: Sequelize): typeof Matching {
    Matching.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        from_user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        to_user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: MODEL_NAME.MATCHING,
        schema: SCHEMA,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );

    return Matching;
  }
}
