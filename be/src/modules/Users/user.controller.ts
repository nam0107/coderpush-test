import { ERRORS, SERVICE_NAME } from '../../common/constants';
import { AbstractController } from '../../common/rest/rest.controller';
import {
  IRequestFindUserById,
  IRequestGetAllUser,
  IRequestUpdateUser,
} from './user.interface';
import { Logger } from '../../logger';
import { UserService } from './user.service';
import validations from './user.validation';
import { DEFAULT_QUERY } from './user.constant';
class UserController extends AbstractController {
  private userService: UserService;

  private logger: Logger;

  constructor(userService: UserService) {
    super(`/${SERVICE_NAME}/v1`);
    this.userService = userService;
    this.initializeRoutes();
    this.logger = Logger.getInstance(module);
  }

  protected initializeRoutes = () => {
    this.router.get(
      `${this.path}/get-all-user/:id`,
      this.asyncRouteFormatResponse(this.getAllUser)
    );

    this.router.get(
      `${this.path}/user/:id`,
      this.asyncRouteFormatResponse(this.findUserById)
    );

    this.router.put(
      `${this.path}/user/:id`,
      this.asyncRouteFormatResponse(this.updateUser)
    );
  };

  private getAllUser = async (request: IRequestGetAllUser) => {
    try {
      const args = { ...request.query, ...request.params };
      const vArgs = await this.validation(
        args,
        validations.getAllUserValidation
      );
      const {
        id,
        page = DEFAULT_QUERY.PAGE,
        size = DEFAULT_QUERY.PAGE_SIZE,
        sort = DEFAULT_QUERY.SORT_ASC,
      } = vArgs;
      const limit = Number(size);
      const offset = (Number(page) - 1) * limit;
      this.logger.info(
        `[getAllUser] - sort: ${sort}, limit: ${limit}, offset: ${offset}`
      );
      const users = await this.userService.getAllUser(id, sort, limit, offset);
      return users;
    } catch (error) {
      this.logger.error(`[getAllUser] - error: ${JSON.stringify(error)}`);
      throw error;
    }
  };

  private findUserById = async (request: IRequestFindUserById) => {
    try {
      const args = { ...request.params };
      const vArgs = await this.validation(
        args,
        validations.findUserByIdValidation
      );
      const { id } = vArgs;
      this.logger.info(`[findUserById] - UserId: ${id}`);
      const user = await this.userService.getUserByUserId(id);
      let liked = null;
      let passed = null;
      if (user?.userMatching?.length > 0) {
        const liked_user_id = user?.userMatching.map(
          (e: any) => e?.to_user_id as number
        );
        liked = await this.userService.findAll({
          id: [...liked_user_id],
        });
      }
      if (user?.meta_data?.passed) {
        passed = await this.userService.findAll({
          id: [...(user?.meta_data?.passed || [])],
        });
      }

      if (!user) {
        throw ERRORS.USER_NOT_FOUND;
      }
      return { user, liked, passed };
    } catch (error) {
      this.logger.error(`[findUserById] - error: ${JSON.stringify(error)}`);
      throw error;
    }
  };

  private updateUser = async (request: IRequestUpdateUser) => {
    try {
      const args = { ...request.body, ...request.params };
      const vArgs = await this.validation(
        args,
        validations.updateUserValidation
      );
      const { id, liked, passed } = vArgs;
      this.logger.info(
        `[updateUser] - UserId: ${id}, userData: ${JSON.stringify({
          liked,
          passed,
        })}`
      );
      const user = await this.userService.getUserByUserId(id);
      if (!user) {
        throw ERRORS.USER_NOT_FOUND;
      }
      const liked_user_id = user?.userMatching.map((e: any) =>
        Number(e?.to_user_id)
      );
      if (liked_user_id.includes(liked)) {
        throw ERRORS.USER_LIKED_ALREADY_EXIST;
      }
      const passed_id = [...(user.meta_data?.passed as Array<number>)];
      if (passed) {
        passed_id.push(passed);
      }
      const meta_data = {
        passed: passed_id,
      };
      const affectedRows = await this.userService.updateUserbyId(
        id,
        {
          meta_data,
        },
        {
          from_user_id: user.id,
          to_user_id: liked,
        }
      );
      return affectedRows;
    } catch (error) {
      this.logger.error(`[updateUser] - error: ${JSON.stringify(error)}`);
      throw error;
    }
  };
}

export default UserController;
