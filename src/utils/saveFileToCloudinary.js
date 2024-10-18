import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import { env } from '../utils/env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file, folder) => {
  const filename = file.filename.includes('.')
    ? file.filename.substring(0, file.filename.lastIndexOf('.'))
    : file.filename;

  const response = await cloudinary.v2.uploader.upload(file.path, {
    public_id: filename,
    folder,
  });
  await fs.unlink(file.path);
  return response.secure_url;
};
