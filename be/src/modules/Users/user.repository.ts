/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, UserAttributes } from '../../models';
import { Transaction } from 'sequelize/types';
import { Matching, MatchingAttributes } from '../../models/matching.model';
import { Op } from 'sequelize';

class UserRepository {
  async getAllUser(
    id: number,
    sort: string,
    limit?: number,
    offset?: number
  ): Promise<User[]> {
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: id,
        },
      },
      limit,
      offset,
      order: [['created_at', sort]],
    });
    return users;
  }
  async updateUserbyId(
    id: number,
    data: UserAttributes,
    transaction?: Transaction
  ): Promise<[number, User[]]> {
    const user = await User.update(data, {
      where: { id: id },
      transaction,
    });
    return user;
  }

  public async findAll(
    condition: Record<string, unknown>
  ): Promise<User[] | null> {
    const data = await User.findAll({
      where: condition,
    });
    return data;
  }

  public async findUserById(id: number): Promise<User | any> {
    const user = await User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Matching,
          as: 'userMatching',
          attributes: ['to_user_id'],
        },
      ],
    });
    return user;
  }

  public async createMatching(
    matchingData: MatchingAttributes,
    transaction: Transaction
  ) {
    const matchings = await Matching.create(
      {
        from_user_id: matchingData.from_user_id,
        to_user_id: matchingData.to_user_id,
      },
      { transaction }
    );
    return matchings;
  }
}

export const userRepository = new UserRepository();
