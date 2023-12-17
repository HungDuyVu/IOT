const connection = require('../config/database');

// Hàm kiểm tra tài khoản người dùng có tồn tại hay không
async function getUserByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    try {
      const [rows, fields] = await connection.promise().query(sql, [email]);
  
      // Trả về kết quả của truy vấn
      return rows[0];
    } catch (error) {
      throw error;
    }
}

// Hàm tạo tài khoản người dùng mới
async function createUser(user) {
  const { name, email, password } = user;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  try {
    const [results] = await connection.promise().query(sql, [name, email, password]);
    return results.insertId;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserByEmail,
  createUser
};
