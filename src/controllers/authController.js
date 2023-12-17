const userModel = require('../models/userModel');

// Hiển thị form đăng ký
const showRegisterForm = (req, res) => {
  res.render('register'); // Tên file ejs template cho form đăng ký
};

// Xử lý đăng ký
const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validate thông tin đăng ký ở đây (vd: kiểm tra email đã tồn tại chưa)
  
      // Thêm user mới vào database
      await userModel.create({ name, email, password });
  
      // Chuyển hướng sau khi đăng ký thành công
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
};
  

// Hiển thị form đăng nhập
const showLoginForm = (req, res) => {
  res.render('login'); // Tên file ejs template cho form đăng nhập
};

// Xử lý đăng nhập
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate thông tin đăng nhập ở đây
  
      // Kiểm tra thông tin đăng nhập từ database
      const user = await userModel.getUserByEmail(email);
  
      if (user && user.password === password) {
        // Đăng nhập thành công, chuyển hướng đến trang dashboard
        res.redirect('/');
      } else {
        // Đăng nhập thất bại, hiển thị lại form đăng nhập với thông báo lỗi
        res.render('login', { error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

module.exports = {
  showRegisterForm,
  register,
  showLoginForm,
  login
};
