import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const CLOUDINARY_NAME = "aserpogi";
const CLOUDINARY_KEY = "929295971968623";
const CLOUDINARY_SECRET = "Z7kBuhB0nj1kNLN7K_qrVM_frSo";

const cloudinaryConfig: ConfigOptions = {
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
};

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "trendeasev2",
    allowed_formats: ["jpeg", "jpg", "png"],
  } as any,
});

export { storage, cloudinary };
