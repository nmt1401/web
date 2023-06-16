//bắt lỗi form đăng kí
const validationRegister = async (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: true, message: 'Vui lòng nhập đầy đủ thông tin' });
    } else {
        let regex = /^[a-zA-Z0-9]+@[a-zA-z0-9]+\.[A-Za-z]+$/;
        if (!regex.test(email)) {
            return res.status(400).json({ error: true, message: 'Email không hợp lệ' });
        }
        regex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regex.test(password)) {
            return res.status(400).json({ error: true, message: 'Mật khẩu phải có ít nhất 8 ký tự, chữ và số ' });
        }
        return next();
    }
}
module.exports = { validationRegister };