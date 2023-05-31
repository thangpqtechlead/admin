const { pool } = require("./connect");

class Admin {
    async query(sql, params) {
        const promise = pool.promise()
        const [rows] = await promise.query(sql, [...(params || [])])
        return rows
    }
  async  findAdminByUsername(username) {
        const admin = await this.query(`SELECT * FROM admin WHERE username=?`, [username])
        return admin[0]
    }
}

module.exports = Admin