const express = require('express');
const router = express.Router();
const userController = require('../src/User/UserController');
const jwt=require('jsonwebtoken');
const {checkTokenCpanel}=require('../middle/Authen');

//http://localhost:3000/
router.get('/', function(req,res,next){
    // hien thi trang chu
    res.render('main');
});
//http://localhost:3000/login
router.get('/login',[checkTokenCpanel],async (req,res,next)=>{
    // hien thi trang login
    res.render('admin/login');
});
//http://localhost:3000/login
router.post('/login',[checkTokenCpanel],async (req,res,next)=>{
    // xu ly login
    // neu login thanh cong thi chuyen qua trang chu
    // neu login khong thanh cong thi chuyen qua trang login
    const {email, password} = req.body;
    const result = await userController.login( email, password);
    if(result){
        //tao token jwt
        // luu token vao session
        const token = jwt.sign({_id:result._id, role:result.role},'secret',{expiresIn:1*60*60});
        req.session.token=token;
       return res.redirect('/');
    }else{
       
       return res.redirect('/login');
    }
});

//http://localhost:3000/logout
router.get('/logout',[checkTokenCpanel],(req,res,next)=>{
    // xu li logout
    // xao token trong session
    req.session.destroy();
    res.redirect('/login');
})
module.exports = router;