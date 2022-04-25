import { NextFunction, Response } from 'express';
import { ERRORS } from '../common/constants';
import HttpStatusCode from '../common/constants/httpStatus.enum';
import { sendError } from '../common/rest/res.util';
import { IRequest } from '../common/rest/rest.interface';
import config from '../config';

const error: Error = {
  name: ERRORS.UNAUTHORIZED.message,
  message: ERRORS.UNAUTHORIZED.message
};

const zalo = (request: IRequest, res: Response, next: NextFunction) => {
  const token = request.headers['x-api-key'] as string;
  if (config.secret.zalo !== token) {
    return sendError(request, res)(error, HttpStatusCode.FORBIDDEN);
  }
  return next();
};

const phoenix = (request: IRequest, res: Response, next: NextFunction) => {
  const token = request.headers['x-api-key'] as string;
  if (config.secret.phoenix !== token) {
    return sendError(request, res)(error, HttpStatusCode.FORBIDDEN);
  }
  return next();
};

const phoenixOrZalo = (request: IRequest, res: Response, next: NextFunction) => {
  const token = request.headers['x-api-key'] as string;
  if (![config.secret.phoenix, config.secret.zalo].includes(token)) {
    return sendError(request, res)(error, HttpStatusCode.FORBIDDEN);
  }
  return next();
};

export {
  phoenixOrZalo,
  zalo,
  phoenix
};