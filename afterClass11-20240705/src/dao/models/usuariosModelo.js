// const { Sequelize, DataTypes } = require('sequelize');
import { DataTypes } from "sequelize"
// const sequelize = new Sequelize('sqlite::memory:');
import { sequelize } from "../../connDB.js"

export const usuariosModelo = sequelize.define(
    'usuarios',
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
        timestamps: true, tableName: "usuarios"
    },
);