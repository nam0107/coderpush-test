import { Response } from "express";
import HttpStatusCode from "../constants/httpStatus.enum";
import { IRequest, IResponseSuccess } from "./rest.interface";

const sendError = (req: IRequest, res: Response) => (err: Error, code: HttpStatusCode = HttpStatusCode.BAD_GATEWAY) => {
  return res.status(code).send({
    success: false,
    message: err.message,
    meta: {
      ...(req.start && { tooke: Date.now() - req.start })
    }
  });
};

const sendSuccess = (req: IRequest, res: Response) => ({ data, code }: IResponseSuccess) => {
  return res.status(code || HttpStatusCode.OK).send({
    success: true,
    data,
    meta: {
      ...(req.start && { tooke: Date.now() - req.start })
    }
  });
};

export {
  sendError,
  sendSuccess
};