// bai08.js - Quan ly tap tin voi module fs
const fs = require('fs').promises;
const path = require('path');

const thuMuc = path.join(__dirname, 'data');
const fileGoc = path.join(thuMuc, 'ghichu.txt');
const fileMoi = path.join(thuMuc, 'ghichu_moi.txt');
const fileTam = path.join(thuMuc, 'tam.txt');

// In thong bao co danh so buoc
let buoc = 0;
function baoKetQua(noiDung) {
    buoc++;
    console.log(`[Bước ${buoc}] ${noiDung}`);
}

async function chayChuongTrinh() {
    try {
        console.log('===== QUẢN LÝ TẬP TIN VỚI FILE SYSTEM =====\n');

        // 1. Tao thu muc data (recursive: neu da co thi khong bao loi)
        await fs.mkdir(thuMuc, { recursive: true });
        baoKetQua('Đã tạo thư mục data');

        // 2. Tao ghichu.txt va ghi it nhat 3 dong
        const noiDung = [
            'Hôm nay mình học module fs trong NodeJS.',
            'fs.promises giúp viết code gọn hơn với async/await.',
            'Mình đã tạo, đổi tên, đọc và xóa tập tin thành công.',
            `Thời gian ghi: ${new Date().toLocaleString('vi-VN')}`
        ].join('\n');
        await fs.writeFile(fileGoc, noiDung, 'utf8');
        baoKetQua('Đã tạo ghichu.txt và ghi 4 dòng nội dung');

        // 3. Doi ten ghichu.txt -> ghichu_moi.txt
        await fs.rename(fileGoc, fileMoi);
        baoKetQua('Đã đổi tên ghichu.txt thành ghichu_moi.txt');

        // 4. Doc va hien thi noi dung sau khi doi ten
        const docDuoc = await fs.readFile(fileMoi, 'utf8');
        baoKetQua('Nội dung ghichu_moi.txt:');
        docDuoc.split('\n').forEach((dong, i) => console.log(`      ${i + 1}. ${dong}`));

        // Chuc nang rieng: thong ke noi dung
        const soDong = docDuoc.split('\n').length;
        const soTu = docDuoc.split(/\s+/).filter(Boolean).length;
        const thongTin = await fs.stat(fileMoi);
        baoKetQua(`Thống kê: ${soDong} dòng, ${soTu} từ, ${thongTin.size} byte`);

        // 5. Tao tam.txt roi xoa bang fs.unlink()
        await fs.writeFile(fileTam, 'Tập tin tạm, sẽ bị xóa ngay.', 'utf8');
        baoKetQua('Đã tạo tam.txt');
        await fs.unlink(fileTam);
        baoKetQua('Đã xóa tam.txt bằng fs.unlink()');

        // Chuc nang rieng: kiem tra tam.txt da that su bi xoa
        try {
            await fs.access(fileTam);
            baoKetQua('Cảnh báo: tam.txt vẫn còn tồn tại');
        } catch {
            baoKetQua('Xác nhận: tam.txt không còn tồn tại');
        }

        // Chuc nang rieng: liet ke thu muc data
        const dsFile = await fs.readdir(thuMuc);
        baoKetQua(`Các tập tin còn lại trong data: ${dsFile.join(', ')}`);

        console.log('\nHoàn thành tất cả thao tác!');
    } catch (loi) {
        console.error(`Lỗi: ${loi.message}`);
    }
}

chayChuongTrinh();