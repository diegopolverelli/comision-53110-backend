import {fileURLToPath} from 'url';
import { dirname } from 'path';
import crypto from "crypto"
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


const SECRET="CoderCoder123"
// export const creaHash=password=>crypto.createHmac("sha256",SECRET).update(password).digest("hex")
export const creaHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validaPassword=(usuario, password)=>bcrypt.compareSync(password, usuario.password)
