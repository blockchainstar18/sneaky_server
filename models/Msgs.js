import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Msg = db.define('msgs', {
    globalMsg: {
        type: DataTypes.STRING
    },
    fulfillMsg: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Msg;

