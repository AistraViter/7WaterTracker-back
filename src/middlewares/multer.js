import multer from 'multer';
import createHttpError from 'http-errors';

import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const limits = { fileSize: 1024 * 1024 * 3 };

export const upload = multer({
  storage,
  limits,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(
        createHttpError(
          400,
          'Invalid avatar file type. Only images are allowed',
        ),
      );
    }
    cb(null, true);
  },
});
