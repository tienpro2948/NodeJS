const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const menu = [
  ['/', 'Trang chủ'],
  ['/about', 'Giới thiệu'],
  ['/skills', 'Kỹ năng'],
  ['/hobbies', 'Sở thích'],
  ['/contact', 'Liên hệ'],
];

// Khung HTML dùng chung cho mọi trang
function page(current, title, content) {
  const links = menu
    .map(([url, name]) => `<a href="${url}" class="${url === current ? 'active' : ''}">${name}</a>`)
    .join('');
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Nhật Tiến</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header><strong>Nhật Tiến</strong><nav>${links}</nav></header>
  <main><h1>${title}</h1>${content}</main>
  <footer>© 2026 Nguyễn Trần Nhật Tiến</footer>
</body>
</html>`;
}

app.get('/', (req, res) => {
  res.send(page('/', 'Xin chào', `
    <p>Mình là Nguyễn Trần Nhật Tiến, sinh viên lớp CĐ-CNTT18B.</p>
    <a class="button" href="/about">Tìm hiểu về mình</a>`));
});

app.get('/about', (req, res) => {
  res.send(page('/about', 'Giới thiệu', `
    <ul>
      <li>Họ tên: Nguyễn Trần Nhật Tiến</li>
      <li>Trường: Cao đẳng Kỹ thuật Công nghệ Nha Trang</li>
      <li>Thực tập: Công ty TNHH Nhà An Toàn Nha Trang</li>
    </ul>`));
});

app.get('/skills', (req, res) => {
  res.send(page('/skills', 'Kỹ năng', `
    <ul>
      <li>HTML, CSS</li>
      <li>Node.js, Express</li>
      <li>Triển khai camera, mạng, định vị, khóa vân tay</li>
    </ul>`));
});

app.get('/hobbies', (req, res) => {
  res.send(page('/hobbies', 'Sở thích', `
    <ul>
      <li>Tìm hiểu công nghệ mới</li>
      <li>Nghe nhạc</li>
      <li>Du lịch</li>
    </ul>`));
});

app.get('/contact', (req, res) => {
  res.send(page('/contact', 'Liên hệ', `
    <ul>
      <li>Email: email-cua-ban@example.com</li>
      <li>GitHub: github.com/ten-tai-khoan</li>
    </ul>`));
});

// 404: đặt sau tất cả route
app.use((req, res) => {
  res.status(404).send(page('', '404', `
    <p>Đường dẫn không tồn tại.</p>
    <a class="button" href="/">Về trang chủ</a>`));
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));