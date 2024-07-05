// const { Sequelize } = require('sequelize');
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize('', 'root', '123', {
    host: 'localhost',
    port: "3306",
    dialect: "mysql",
    // logging: false 
});


let dbname="pruebaComis53110"
try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${dbname}`)
    console.log(`DB ${dbname} creada...!!!`)
    
} catch (error) {
    console.log("ERROR:", error.message)
}