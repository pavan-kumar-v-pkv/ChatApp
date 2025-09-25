import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || 'my_super_secret_key',
    RESEND_API_KEY: process.env.RESEND_API_KEY || 're_5NxpS5Hp_AEB56eQibKKVfinkWZTPC9iy',
    EMAIL_FROM: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || 'Pavan Kumar V',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ARCJET_ENV: process.env.ARCJET_ENV || 'development'
}