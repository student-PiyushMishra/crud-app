const express = require('express')
const router = express.Router()
const userModel = require('./usermodel')

router.get('/', (req, res) => {
    res.redirect('/home')
})

router.get('/home', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/login', async (req, res) => {
    let db = await userModel.find({ email: req.body.email })
    if (db.length > 0) {
        if (db[0].password === req.body.password) {
            return res.render('loggedin', { data: db, statusCode: 200 })
        }
        else {
            return res.render('loggedin', { data: "Oops! Incorrect Password", statusCode: 405 })
        }
    }
    res.render('loggedin', { data: "Oops 404! No users found with that email.", statusCode: 404 })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/update', async (req, res) => {
    res.render('update')
})

router.post('/update', async (req, res) => {
    let db = await userModel.findOne({ email: req.body.email })
    if (db) {
        if (db.password == req.body.password) {
            if(req.body.name){
                await userModel.findOneAndUpdate({email:req.body.email},{name:req.body.name},{new:true})
                console.log("Name changed for",db.name)
            }
            if(req.body.new_password){
                await userModel.findOneAndUpdate({email:req.body.email},{password:req.body.new_password},{new:true})
                console.log("Password changed for",db.name)
            }
            if(req.body.age){
                await userModel.findOneAndUpdate({email:req.body.email},{age:req.body.age},{new:true})
                console.log("Age changed for",db.name)
            }
            return res.render("info",{header:"Data Updated...",href:"/",href_data:"Return to home"})
        }else{
            return res.render("info",{header:"404: Illegal Request. The password for the requested email was incorrect and hence the change in database was aborted.",href:"/",href_data:"Return to home"})
        }
    } else {
        return res.render("info",{header:"404: Illegal request. The requested email was not in the database.",href:"/",href_data:"Return to home"})
    }
})

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        let email = req.body.email
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            console.log("User wasn't registered")
            return res.render("info",{header:"This email is already registered! Try a different email.",href:"/",href_data:"Return to home"})
        }

        let user = {
            name: req.body.name,
            age: Number(req.body.age),
            email: req.body.email,
            password: req.body.password
        }
        await userModel.create(user)
        console.log('User registered successfully')
        return res.render("info",{header:"User registered successfully!",href:"/",href_data:"Return to home"})
    }
    catch (e) {
        if (e) console.error(e)
    }
})

module.exports = router;