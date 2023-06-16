const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken');
const userController = require('../../src/User/UserController');
const e = require('express');
const {validationRegister}=require('../../middle/Validation');
//http://localhost:3000/api/user

//http://localhost:3000/api/user/login
//api login user
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userController.login(email, password);
        if (user) {
            //tẠO token
            const token=jwt.sign({user},'secret',{expiresIn: 1*60*60});
            console.log('Đăng nhập thành công');
            return res.status(200).json({ error: false, user: user,token: token });
        } else {
            return res.status(400).json({ error: true, user: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false, user: null });
    }
});
//http://localhost:3000/api/user/register
//api register user
router.post('/register',[validationRegister], async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const user = await userController.register(email, password, name);
        if (user) {
            console.log('Register Successsful!')
            return res.status(200).json({ error: false, user: user });
        } else {
            console.log('Register fail:',user);
            return res.status(400).json({ error: true, user: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false, user: null });
    }
});
//http://localhost:3000/api/user/sendEmail
//api gửi email
router.post('/sendEmail',async(req,res,next)=>{
    try {
        const {email,subject}= req.body;
        let content = `<h1>Nai xừ</h1>`;
        const result = await userController.sendEmail(email,subject,content);
        return res.status(200).json({error:false, result:result});
    } catch (error) {
        console.log('Send email API error',error);
        return res.status(500).json({error:true});
    }
});
module.exports = router;