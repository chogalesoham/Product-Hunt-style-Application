import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (_req, _file) => 'png',
    public_id: (_req, file) => file.originalname.split('.')[0] + '',
  },
});

const CloudinaryFileUploder = multer({ storage: storage });

export {
  CloudinaryFileUploder,
};
