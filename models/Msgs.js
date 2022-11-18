import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Msg = db.define('msgs', {
    Msgs: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Msg;

