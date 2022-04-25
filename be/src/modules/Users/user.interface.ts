import { User, UserAttributes } from '../../models/user.model';
import { IRequest } from '../../common/rest/rest.interface';
import { MatchingAttributes } from '../../models';

export interface IUser {
  updateUserbyId(
    id: number,
    data: UserAttributes,
    matchingData: MatchingAttributes
  ): Promise<any>;
  getUserByUserId(id: number): Promise<User | null>;
}

export interface IRequestFindUserById extends IRequest {
  params: {
    id: string;
  };
}
export interface IRequestUpdateUser extends IRequest {
  body: {
    liked?: number;
    passed?: number;
  };
}
export interface IRequestGetAllUser extends IRequest {
  query: {
    page: string;
    size: string;
    sort: string;
  };
}
