import HttpStatusCode from './httpStatus.enum';

const ERRORS = {
  USER_NOT_FOUND: {
    message: 'User not exited ',
    status: HttpStatusCode.NOT_ACCEPTABLE,
  },
  USER_LIKED_ALREADY_EXIST: {
    message: 'User liked already exist',
    status: HttpStatusCode.NOT_ACCEPTABLE,
  },
};

export { ERRORS };
