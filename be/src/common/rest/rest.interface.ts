import { Request, Router } from 'express';
import { LANGUAGE } from '../constants';
import HttpStatusCode from '../constants/httpStatus.enum';

export interface IController {
  path: string;
  router: Router;
}

export interface IResponseSuccess {
  data?: any;
  code?: HttpStatusCode;
}

export interface IRequest extends Request {
  start?: number;
  'x-language'?: LANGUAGE;
  'x-api-key'?: string;
}
