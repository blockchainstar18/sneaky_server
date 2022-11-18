import express from "express";
import db from "./config/database.js";
import cors from "cors";
import mysql from "mysql2";

import DisneyplusRoutes from "./routes/Disneyplus.js";
import NetflixRoutes from './routes/Netflix.js'
import HbomaxRoutes from "./routes/Hbomax.js"
import CrunchyrollRoutes from './routes/Crunchyroll.js'
import DaznRoutes from './routes/Dazn.js'
import MsgsRoute from './routes/Msgs.js'
import ExaccsRoute from './routes/Exaccs.js'
import membershipRoute from './routes/membership.js'

const app = express();

const finalizeConnection = async () => {
    await db.authenticate();
    console.log('Database connected...');
    app.use(cors());
    app.use(express.json());
    app.use('/stream/disneyplus', DisneyplusRoutes);
    app.use('/stream/netflix', NetflixRoutes);
    app.use('/stream/hbomax', HbomaxRoutes);
    app.use('/stream/crunchyroll', CrunchyrollRoutes)
    app.use('/stream/dazn', DaznRoutes)
    app.use('/msgs', MsgsRoute)
    app.use('/exaccs', ExaccsRoute)

    // app.use('/users', userRoute)
    app.use('/membership', membershipRoute)
    const port = 3000
    app.listen(port, () => console.log(`Server running at port ${port}`));
}
const prepareTables = () => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "alex"
    });

    var sql = "CREATE TABLE IF NOT EXISTS disneyplus (id int(11) NOT NULL, email varchar(200) DEFAULT NULL, password varchar(200) DEFAULT NULL,ip varchar(200) DEFAULT NULL,startedAt date DEFAULT NULL,replacements int(11) DEFAULT NULL, flag TINYINT(1) DEFAULT 1, createdAt date DEFAULT NULL, updatedAt date DEFAULT NULL, PRIMARY KEY (email)) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
    con.query(sql)
    var sql = "CREATE TABLE IF NOT EXISTS netflix (id int(11) NOT NULL, email varchar(200) DEFAULT NULL, NetflixId varchar(1500) DEFAULT NULL,SecureNetflixId varchar(200) DEFAULT NULL,ip varchar(200) DEFAULT NULL,startedAt date DEFAULT NULL,replacements int(11) DEFAULT NULL, flag TINYINT(1) DEFAULT 1, createdAt date DEFAULT NULL, updatedAt date DEFAULT NULL, PRIMARY KEY (email)) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
    con.query(sql)
    var sql = "CREATE TABLE IF NOT EXISTS hbomax (id int(11) NOT NULL, email varchar(200) DEFAULT NULL, password varchar(200) DEFAULT NULL,ip varchar(200) DEFAULT NULL,startedAt date DEFAULT NULL,replacements int(11) DEFAULT NULL, flag TINYINT(1) DEFAULT 1, createdAt date DEFAULT NULL, updatedAt date DEFAULT NULL, PRIMARY KEY (email)) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
    con.query(sql)
    var sql = "CREATE TABLE IF NOT EXISTS crunchyroll (id int(11) NOT NULL, email varchar(200) DEFAULT NULL, password varchar(200) DEFAULT NULL,ip varchar(200) DEFAULT NULL,startedAt date DEFAULT NULL,replacements int(11) DEFAULT NULL, flag TINYINT(1) DEFAULT 1, createdAt date DEFAULT NULL, updatedAt date DEFAULT NULL, PRIMARY KEY (email)) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
    con.query(sql)
    var sql = "CREATE TABLE IF NOT EXISTS dazn (id int(11) NOT NULL, email varchar(200) DEFAULT NULL, password varchar(200) DEFAULT NULL,ip varchar(200) DEFAULT NULL,startedAt date DEFAULT NULL,replacements int(11) DEFAULT NULL, flag TINYINT(1) DEFAULT 1, createdAt date DEFAULT NULL, updatedAt date DEFAULT NULL, PRIMARY KEY (email)) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
    con.query(sql)


    sql = "CREATE TABLE IF NOT EXISTS exaccs (id int(11) NOT NULL, user varchar(200) DEFAULT NULL, password varchar(200) DEFAULT NULL, ip varchar(200) DEFAULT NULL,startedAt date DEFAULT NULL,createdAt date DEFAULT NULL, updatedAt date DEFAULT NULL, PRIMARY KEY (user, password)) ENGINE=InnoDB DEFAULT CHARSET=latin1;"
    con.query(sql)

    // sql = "CREATE TABLE IF NOT EXISTS users (id int(11) NOT NULL, ip varchar(200) DEFAULT NULL, startedAt date DEFAULT NULL, createdAt date DEFAULT NULL, updatedAt date DEFAULT NULL, PRIMARY KEY (ip)) ENGINE=InnoDB DEFAULT CHARSET=latin1;"
    // con.query(sql)

    sql = "create table if not exists msgs (id int(11) not null, Msgs varchar(2000) default null, createdAt date default null, updatedAt date default null, primary key (Msgs)) ENGINE=InnoDB DEFAULT CHARSET=latin1;"
    con.query(sql, function (err, result) {
        sql = "SELECT COUNT(*) FROM `msgs`;"
        con.query(sql, function (err, result) {
            if (result[0]['COUNT(*)'] == 0) {
                sql = "INSERT INTO `msgs` (`id`, `Msgs`) VALUES (1, 'Welcome to Sneaky!')"
                con.query(sql)
            }
            con.end()
            finalizeConnection()
        })
    })
}

const prepareDB = () => {
    // Open the connection to MySQL server
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    // Run create database statement
    connection.query(
        `CREATE DATABASE IF NOT EXISTS alex`,
        function (err, results) {
            prepareTables()
            connection.end();

        }
    );

    // Close the connection
}



try {
    prepareDB()
} catch (error) {
    console.error('Connection error:', error);
}

