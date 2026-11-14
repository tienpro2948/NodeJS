// bai02.js - Web Server với module http
const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Xin chào!</h1><p>Mã sinh viên: CDCNTT18B23</p>");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      "<h1>Giới thiệu bản thân</h1>" +
        "<p>Họ tên: Nguyễn Trần Nhật Tiến</p>" +
        "<p>Mã SV: CDCNTT18B23</p>" +
        "<p>Lớp: CDCNTT18B</p>" +
        "<p>Sở thích: lập trình Node.js</p>"
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>404 - Không tìm thấy trang</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});