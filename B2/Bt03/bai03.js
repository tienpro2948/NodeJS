// bai03.js - Thao tác tập tin bằng module fs
const fs = require("fs");

const tenFile = "thongtin.txt";

// 1. Tạo tập tin thongtin.txt chứa họ tên và mã sinh viên
fs.writeFileSync(
  tenFile,
  "Họ tên: Nguyễn Trần Nhật Tiến\nMã sinh viên: CDCNTT18B23",
  "utf8"
);
console.log("Đã tạo tập tin", tenFile);

// 2. Đọc và hiển thị nội dung lên Terminal
console.log("\n--- Nội dung ban đầu ---");
console.log(fs.readFileSync(tenFile, "utf8"));

// 3. Ghi nối thêm tên lớp vào cuối tập tin bằng appendFile()
fs.appendFile(tenFile, "\nLớp: CDCNTT18B", "utf8", (err) => {
  if (err) {
    console.error("Lỗi ghi nối:", err);
    return;
  }
  console.log("\nĐã ghi nối thêm tên lớp");

  // 4. Đọc lại tập tin để chứng minh nội dung đã cập nhật
  console.log("\n--- Nội dung sau khi cập nhật ---");
  console.log(fs.readFileSync(tenFile, "utf8"));
});