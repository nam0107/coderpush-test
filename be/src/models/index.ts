import { Sequelize } from 'sequelize';

import { User, UserAttributes } from './user.model';
import { Matching, MatchingAttributes } from './matching.model';

export { User, UserAttributes, Matching, MatchingAttributes };

export const initModels = (sequelize: Sequelize) => {
  Matching.initModel(sequelize);
  User.initModel(sequelize);

  return {
    Matching,
    User,
  };
};
