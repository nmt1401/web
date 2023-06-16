const { use } = require('../../routes');
const userModel = require('./UserModel');
const bcrypt = require('bcryptjs');
//1.kiem tra email,password
//2.kiem tra email co ton tai trong database khong
//3.kiem tra password co dung khong 
//4.neu dung tra ve thong tin admin
//5.neu sai, tra ve null


//day la ham dang nhap
const login = async (email, password) => {
    // const user = users.find(u => u.email == email);
    // console.log(email, password, user);
    // if (user && user.password == password) {
    //     return user;
    // }
    // return null;
    try {
        const user = await userModel.findOne({ email: email });// tương tự : select * from users where email = email
        if(user){
            const result=bcrypt.compareSync(password,user.password);
            return result ? user : false;
        }
        
    } catch (error) {
       
        console.log('Login error: ',error);
    }
}
// Đây là hàm đăng ký
const register = async (email, password, name) => {
    try {
        //kiểm tra email đã tồn tại hay chưa
        const user = await userModel.findOne({ email: email });// tương tự : select * from users where email = email
        if (user) return false;
        // thêm mới user vào database
        // mã hóa password
        const salt = bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(password,salt);
        const newUser={email,password:hash,name,role:1};//role la phân quyền, role:1 là user
        const u=new userModel(newUser);
        await u.save();
        return true;
    } catch (error) {
        console.log("Register error:  ", error);
    }
    return false;
}
module.exports={login,register};

var users = [
    { _id: 1, email: 'huy@gmail.com', password: '1', name: 'huy' }
]
