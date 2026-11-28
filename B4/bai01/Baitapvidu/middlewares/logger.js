// Middleware ghi log: giờ, phương thức, đường dẫn, thời gian xử lý
module.exports = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const gio = new Date().toLocaleTimeString('vi-VN');
    console.log(`[${gio}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
};