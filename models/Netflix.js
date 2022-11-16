import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Netflix = db.define('netflix', {
    email: {
        type: DataTypes.STRING
    },
    NetflixId: {
        type: DataTypes.STRING
    },
    SecureNetflixId: {
        type: DataTypes.STRING
    },
    ip: {
        type: DataTypes.STRING
    },
    replacements: {
        type: DataTypes.INTEGER
    },
    startedAt: {
        type: DataTypes.DATEONLY
    },
    flag: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});

export default Netflix;