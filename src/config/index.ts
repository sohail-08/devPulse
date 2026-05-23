import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL as string,
  jwt_secret: process.env.JWT_SECRET as string,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS as string,
};