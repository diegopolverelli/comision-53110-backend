import mongoose from "mongoose"
import { config } from "../config/config.js"
export const connDB=mongoose.connect(config.MONGO_URL)
console.log("DB Conectada")