let express = require('express')
let app = express()
let hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser');
let mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:phongdepzai123@cluster0-g0afi.mongodb.net/assignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function () {
    console.log("Connected")
})
//User Schema
let userSchema = require('./schema/userSchema')
let User = mongoose.model('User', userSchema, 'User')
//Product Schema
let productSchema = require('./schema/productSchema')
let Product = mongoose.model('Product', productSchema, 'Product')
//Customer Schema
let customerSchema = require('./schema/customerSchema')
let Customer = mongoose.model('Customer', customerSchema, 'Customer')
//Express init
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'hbs')
app.use('/assets', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.get('/', async (req, res) => {
    res.render('home_views', {layout: false})
})
//User APIs
app.get('/user', async (req, res) => {
    let user = await User.find({})
    res.render('user_views', {layout: false, results: user})
})
app.post('/register', async (req, res) => {
    const user = new User({
        password: req.body.password,
        username: req.body.username,
        role: "1"
    })
    let isRegistered = await User.find({username: req.body.username})
    if(isRegistered.length!=0){
        res.status(403).send('Username already existed')
    }
    else {
        try {
            let stt = await user.save()
            if (stt != null) {
                res.status(200).send(stt)
            }
        } catch (e) {
            res.status(403).send('Có lỗi xảy ra' + e)
        }
    }

})
app.post('/login', async (req, res) => {

    let user = await User.find({username: req.body.username,password: req.body.password})

        if (user.length!=0) {
            res.status(200).send(user)
        }
        else{
            res.status(404).send('Username not found')
        }
})
app.post('/addUser', async (req, res) => {
    const user = new User({
        password: req.body.password,
        username: req.body.username,
        role: req.body.role
    })
    try {
        let stt = await user.save()
        if (stt != null) {
            res.redirect('/user')
        }
    } catch (e) {
        res.send('Có lỗi xảy ra' + e)
    }
})
app.post('/updateUser', async (req, res) => {
        let stt = await User.findOneAndUpdate({"_id": req.body.id}, {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role

            }, {new: true}
        )
        if (stt != null) {
            res.redirect('/user')
        } else {
            console.log(stt)
        }

})
app.post('/deleteUser', async (req, res) => {
    try {
        let stt = await User.findOneAndDelete({"_id": req.body.id})
        if (stt != null) {
            res.redirect('/user')
        }
    } catch (e) {
        res.send(e)
    }
})
//Product APIs
app.get('/getAllProduct', async (req, res) => {
    let product = await Product.find({})
    res.status(200).json(product)
})
app.get('/product', async (req, res) => {
    let product = await Product.find({})
    res.render('product_views', {layout: false, results: product})
})
app.post('/addProduct', async (req, res) => {
    console.log(req.body.product_name)
    const product = new Product({
        productName: req.body.product_name,
        productType: req.body.product_type,
        price: req.body.price,
    })
    try {
        let stt = await product.save()
        if (stt != null) {
            res.redirect('/product')
        }
    } catch (e) {
        res.send('Có lỗi xảy ra' + e)
    }
})
app.post('/deleteProduct', async (req, res) => {
    try {
        let stt = await Product.findOneAndDelete({"_id": req.body.product_id})
        if (stt != null) {
            res.redirect('/product')
        }
    } catch (e) {
        res.send(e)
    }
})
app.post('/updateProduct', async (req, res) => {
    let stt = await Product.findOneAndUpdate({_id: req.body.product_id}, {
            productName: req.body.product_name,
            productType: req.body.product_type,
            price: req.body.product_price

        }, {new: true}
    )

    if (stt != null) {
        res.redirect('/product')
    } else {
        console.log(stt)
    }


})
//Customer APIs
app.get('/customer', async (req, res) => {
    let customer = await Customer.find({})
    res.render('customer_views', {layout: false, results: customer})
})
app.post('/addCustomer', async (req, res) => {
    let customer = new Customer({
        fullName: req.body.fullName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
    })
    try {
        let stt = await customer.save()
        if (stt != null) {
            res.redirect('/customer')
        }
    } catch (e) {
        res.send('Có lỗi xảy ra' + e)
    }
})
app.post('/deleteCustomer', async (req, res) => {
    try {
        let stt = await Customer.findOneAndDelete({"_id": req.body.id})
        if (stt != null) {
            res.redirect('/customer')
        }
        else{
            console.log(stt)
        }
    } catch (e) {
        res.send(e)
    }
})
app.post('/updateCustomer', async (req, res) => {
    let stt = await Customer.findOneAndUpdate({_id: req.body.id}, {
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address

        }, {new: true}
    )

    if (stt != null) {
        res.redirect('/customer')
    } else {
        console.log(stt)
    }


})
app.listen(process.env.PORT||9000)