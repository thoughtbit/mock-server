import fs from "fs";
import { join } from "path";
import { config } from "dotenv";

const serverCert = fs.readFileSync(join(__dirname, "./", "keys", "cert.pem"), "utf8");

const serverKey = fs.readFileSync(join(__dirname, "./", "keys", "key.pem"), "utf8");

const publicKey = fs.readFileSync(join(__dirname, "./", "cert", "public_key.pem"));

const privateKey = fs.readFileSync(join(__dirname, "./", "cert", "private_key.pem"));

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { NODE_ENV, API_URL, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, DB_FILE }: any = process.env;
export { publicKey, privateKey, serverCert, serverKey };
