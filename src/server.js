const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const Admin = require('./model/admin');
const Product = require('./model/product');
const renderView = require('./renderView');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'assets')));

console.log(path.join(__dirname, 'assets'))

app.get('/', async (req, res) => {
    const view = renderView('create-product')
    res.write(view);
    res.end()
});

app.get('/login', (req, res) => {
    const view = renderView('login')
    res.write(view);
    res.end()
})

app.post('/login',async (req, res) => {
    const data = req.body;
    const AdminModel = new Admin()
    const admin = await AdminModel.findAdminByUsername(data.username);
    if(admin.password !== data.password){
        res.status(401).json({message: "sai mat khau"}).end()
    }
    res.redirect('/')
})


app.post('/hoadon', async (req, res) => {

    const ProductModel = new Product()
    console.log(req.body)

    const sanpham = await ProductModel.layNhieuSanPham(req.body.id)

    const tongGia = sanpham.reduce((pre, cur, index) => {
        pre = pre + (Number(cur.price) * Number(req.body.soluong[index]) )
        return pre;
    }, 0)

    const view = renderView('hoadon', {
        pID: sanpham[0].pID,
        pName: sanpham[0].pName,
        all: tongGia
    })
    res.write(view);
    res.end()
})

app.listen(8000);