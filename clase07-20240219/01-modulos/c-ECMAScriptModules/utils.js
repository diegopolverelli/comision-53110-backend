import {fileURLToPath} from 'url';
import { dirname } from 'path';
import path from 'path';
// path.dirname()


const __filename = fileURLToPath(import.meta.url);


console.log("import.meta.url:", import.meta.url)
console.log("fileURLToPath(import.meta.url):", fileURLToPath(import.meta.url))

const __dirname = dirname(__filename);
console.log("__dirname:", __dirname)

export default __dirname;