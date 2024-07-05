// const { Sequelize } = require('sequelize');
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize('pruebaComis53110', 'root', '123', {
    host: 'localhost',
    port: "3306",
    dialect: "mysql",
    // logging: false 
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error.message);
}