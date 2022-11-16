import { Sequelize } from "sequelize";

const db = new Sequelize('alex', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;