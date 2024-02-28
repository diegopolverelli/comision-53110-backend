import {fileURLToPath} from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const rutaDemon=join(__dirname, "data", "demonSlayer.json")