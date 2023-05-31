const mysql = require('mysql2')
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'TeddyBearShopManager',
    // waitForConnections: true,
    // connectionLimit: 10,
    // maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    // idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    // queueLimit: 0,
    // enableKeepAlive: true,
    // keepAliveInitialDelay: 0,
    password: '123456'
});

module.exports = {
    pool
}