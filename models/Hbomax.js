import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Hbomax = db.define('hbomax', {
    email: {
        type: DataTypes.STRING
    },
    password: {
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

export default Hbomax;