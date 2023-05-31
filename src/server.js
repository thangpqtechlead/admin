const express = require('express');
const path = require('path')
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const Admin = require('./model/admin');
const Product = require('./model/product');

const app = express();
// app.use(express.json())
app.set('views', path.join(__dirname, "views"));
app.engine('hbs', engine({
    defaultLayout: 'main.hbs'
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'assets')));

console.log(path.join(__dirname, 'assets'))

app.get('/', async (req, res) => {

    res.render('create-product');
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login',async (req, res) => {
    const data = req.body;
    const AdminModel = new Admin()
    const admin = await AdminModel.findAdminByUsername(data.username);
    if(admin.password !== data.password){
        res.status(401).json({message: "sai mat khau"}).end()
    }
    res.redirect('/')
    // res.stop()
    // res.json('dang nhap thanh cong').end()
})
app.listen(8000);

app.post('/hoadon', async (req, res) => {

    const ProductModel = new Product()
    console.log(req.body)

    // const promise = await Promise.all
    const sanpham = await ProductModel.layNhieuSanPham(req.body.id)
    console.log("🚀 ~ file: server.js:51 ~ app.post ~ sanpham:", sanpham)

    const tongGia = sanpham.reduce((pre, cur, index) => {
        pre = pre + (Number(cur.price) * Number(req.body.soluong[index]) )
        return pre;
    }, 0)
    // req.body.id.forEach(async(pId, index) => {

    //     tongGia +=  Number(req.body.soluong[index]) * Number(sanpham.price)
    // });
    
    res.render('hoadon', {
        // pID: sanpham.pID,
        // pName: sanpham.pName,
        // number: req.body.soluong,
        sanpham,
        all: tongGia
    })
})
