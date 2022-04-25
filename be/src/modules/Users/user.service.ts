import { IUser } from './user.interface';
import { userRepository } from './user.repository';
import { MatchingAttributes, UserAttributes } from '../../models';
import { postgresDb } from '../../common/connection/postgres';

export class UserService implements IUser {
  async getAllUser(id: number, sort: string, limit?: number, offset?: number) {
    const users = await userRepository.getAllUser(id, sort, limit, offset);
    return users;
  }
  async getUserByUserId(id: number): Promise<any | null> {
    const user = await userRepository.findUserById(id);
    return user;
  }

  async findAll(condition: Record<string, unknown>) {
    const users = await userRepository.findAll(condition);
    return users;
  }

  async updateUserbyId(
    id: number,
    data: UserAttributes,
    matchingData: MatchingAttributes
  ) {
    const transaction = await postgresDb.sequelize.transaction({
      autocommit: false,
    });
    try {
      const [user] = await Promise.all([
        userRepository.updateUserbyId(id, data, transaction),
        matchingData?.to_user_id &&
          userRepository.createMatching(matchingData, transaction),
      ]);

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export const userService = new UserService();
