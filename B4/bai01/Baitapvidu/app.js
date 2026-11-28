// app.js - cấu hình ứng dụng Express "Gió Biển Coffee"
const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const shopController = require('./controllers/shopController');

const app = express();
const PORT = 3000;

// Template engine: Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Hàm dùng chung trong mọi view: định dạng tiền VND
app.locals.vnd = (n) => n.toLocaleString('vi-VN') + ' ₫';

// Middleware
app.use(logger);                                   // ghi log mỗi yêu cầu
app.use(express.urlencoded({ extended: true }));   // đọc dữ liệu form POST
app.use(express.static(path.join(__dirname, 'public'))); // CSS, ảnh

// Route (Controller)
app.use('/', shopController);

// Không khớp route nào -> tạo lỗi 404 chuyển cho middleware lỗi
app.use((req, res, next) => {
  const err = new Error('Trang này không tồn tại. Hãy quay lại trang chủ hoặc xem thực đơn.');
  err.status = 404;
  next(err);
});

// Middleware xử lý lỗi (đặt SAU cùng, có 4 tham số)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(`[LỖI ${status}] ${err.message}`);
  res.status(status).render('error', {
    title: 'Có lỗi xảy ra',
    status,
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});