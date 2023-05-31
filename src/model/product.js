const { pool } = require("./connect");

class Product {
    async query(sql, params) {
        const promise = pool.promise()
        const [rows] = await promise.query(sql, [...(params || [])])
        return rows
    }
    async layGia() {
        return await this.query(`SELECT * FROM product`)
    }

    async layMotSanPham(id){
        const rows = await this.query(`SELECT * FROM product where pID=?`, [id])
return rows[0]
    }
    async layNhieuSanPham(ids){
        return await this.query('SELECT * FROM product where pID IN (?)', [ids])
    }
}

module.exports = Product