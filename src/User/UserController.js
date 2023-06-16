const mailer=require('nodemailer');

const { use } = require('../../routes');
const userService =require('./UserServices');

const transporter= mailer.createTransport({
    pool:true,
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:'huyhvhps24167@fpt.edu.vn',
        pass:'fwcppryqkichzrrz'
    }
})


const login = async (email,password)=>{
    return await userService.login(email,password);
}
const register=async (email,password,name)=>{
    try {
        return await userService.register(email,password,name);
    } catch (error) {
        console.log("erroe",error);
    }   
    
}

const sendEmail=async(email,subject,content)=>{
    try {
        const mailOptions={
            from:'Hoang Huy <huyhvhps24167@fpt.edu.vn>',
            to:email,
            subject:subject,
            html:content
        };
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Send Email error',error);
    }
    return false;
    
}
module.exports={login,register,sendEmail};