import { AbstractController } from './common/rest/rest.controller';

import UserController from './modules/Users/user.controller';
import { userService } from './modules/Users/user.service';

const Router: AbstractController[] = [new UserController(userService)];

export default Router;
