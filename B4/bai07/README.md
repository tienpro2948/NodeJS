# Bài 7: Xử lý tham số URL trên Web Server

## 1. Mô tả bài

Web Server viết bằng module `http` và đối tượng `URL`, chạy tại cổng **3001**:

| Đường dẫn | Chức năng |
|---|---|
| `/hello?name=Minh` | Hiển thị `Xin chào Minh` |
| `/sum?a=10&b=20` | Hiển thị `Tổng = 30` |
| `/calc?a=6&b=3&op=nhan` | Chức năng riêng: cộng, trừ, nhân, chia hai số |

Trả về thông báo lỗi khi thiếu tham số, giá trị không phải số, chia cho 0 hoặc đường dẫn không tồn tại.

### Chức năng riêng thêm vào

- Hàm `docSo()` kiểm tra và đọc tham số số, báo lỗi rõ từng tham số.
- Hàm `guiPhanHoi()` dùng chung để trả kết quả, hỗ trợ tiếng Việt.
- Đường dẫn `/calc` thực hiện 4 phép tính.
- Báo lỗi chia cho 0 và thông báo 404 có gợi ý đường dẫn.

## 2. Các bước thực hiện

### Bước 1: Tạo file `bai07.js`

Dùng `require('http')` và `new URL(...)` để đọc đường dẫn và tham số.

![Bước 1](images/07-buoc1-code.png)

### Bước 2: Chạy server

Mở PowerShell, vào thư mục bài 7 rồi chạy lệnh:

```
cd C:\Users\Admin\Downloads\CDCNTT18B\CDCNTT18B\NodeJS\B3\bai07
node bai07.js
```

### Bước 3: Kiểm tra `/hello`

Truy cập `http://localhost:3001/hello?name=Minh`

![Hello](images/07-hello.png)

### Bước 4: Kiểm tra `/sum`

Truy cập `http://localhost:3001/sum?a=10&b=20`

![Sum](images/07-sum.png)

### Bước 5: Kiểm tra báo lỗi

Truy cập `http://localhost:3001/sum?a=10` (thiếu tham số b)

![Lỗi](images/07-loi.png)

### Bước 6: Chức năng riêng `/calc`

Truy cập `http://localhost:3001/calc?a=6&b=3&op=nhan`

![Calc](images/07-calc.png)

## 3. Kết quả

Server chạy tại cổng 3001, trả đúng kết quả cho `/hello`, `/sum`, `/calc` và báo lỗi đúng khi thiếu hoặc sai tham số.