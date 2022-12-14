import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const ExAccount = db.define('exaccs', {
    user: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    ip: {
        type: DataTypes.STRING
    },
    startedAt: {
        type: DataTypes.DATEONLY
    }
}, {
    freezeTableName: true
});

export default ExAccount;