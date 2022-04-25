import multer from 'multer';
import path from 'path';
import AWS from 'aws-sdk';
import config from '../../config';
import { Logger } from '../../logger';
import stream from 'stream';
import fs from 'fs';

const logger = Logger.getInstance(module);

const createUploader = () => {
  const destinationPath = path.join(__dirname, './temp-uploads', '/');

  return multer({
    dest: destinationPath
  });
};

const uploadStreamS3 = (filename: string, s3: AWS.S3, storage: string) => {
  const newFileName = `${Date.now()}-${filename}`;
  const fullPath = `${storage}/${newFileName}`;
  const pass = new stream.PassThrough();
  const params = { Bucket: config.s3.bucket, Key: fullPath, Body: pass };
  s3.upload(params, (err: any, _data: any) => {
    if (err) {
      logger.error(`[UPLOAD ${filename} TO S3] ERROR: ${JSON.stringify(err)}`);
    }
  });
  return pass;
};

const uploadToS3 = (file: Express.Multer.File, storage: string) => {
  const s3 = new AWS.S3({
    region: config.s3.region
  });
  fs.createReadStream(`${file.path}`).pipe(uploadStreamS3(file.originalname, s3, storage));
  fs.unlinkSync(file.path);
};

export {
  createUploader,
  uploadToS3
};