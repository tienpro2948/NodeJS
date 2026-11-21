// bai09.js - Xoa du lieu co dieu kien trong MongoDB
const { MongoClient } = require('mongodb');

// Neu bai 4 dung chuoi ket noi khac thi copy dong do thay vao day
const URI = 'mongodb://localhost:27017';
const TEN_DB = 'qlsinhvien';
const TEN_COLLECTION = 'students_test';

const dsMau = [
    { masv: 'SV001', hoten: 'Nguyễn Trần Nhật Tiến', tuoi: 20, diem: 8.5 },
    { masv: 'SV002', hoten: 'Phạm Gia Huy',          tuoi: 21, diem: 6.5 },
    { masv: 'SV003', hoten: 'Võ Thị Ngọc Lan',       tuoi: 20, diem: 4.5 },
    { masv: 'SV004', hoten: 'Đặng Quốc Khánh',       tuoi: 22, diem: 3.5 },
    { masv: 'SV005', hoten: 'Lê Hoài Thương',        tuoi: 21, diem: 7.5 },
    { masv: 'SV006', hoten: 'Bùi Minh Châu',         tuoi: 20, diem: 4 }
];

async function inDanhSach(col, tieuDe) {
    const ds = await col.find({}, { projection: { _id: 0 } }).sort({ masv: 1 }).toArray();
    console.log(`\n--- ${tieuDe} (${ds.length} sinh viên) ---`);
    ds.forEach((sv, i) => {
        console.log(`${i + 1}. ${sv.masv} | ${sv.hoten} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
    });
}

async function main() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        console.log('Đã kết nối MongoDB thành công');
        const col = client.db(TEN_DB).collection(TEN_COLLECTION);

        // Don du lieu cu de chay lai nhieu lan van ra ket qua giong nhau
        const daDon = await col.deleteMany({});
        console.log(`Đã dọn dữ liệu cũ: ${daDon.deletedCount} bản ghi`);

        const kqThem = await col.insertMany(dsMau);
        console.log(`Đã thêm ${kqThem.insertedCount} sinh viên mẫu`);
        await inDanhSach(col, 'Danh sách ban đầu');

        const maCanXoa = 'SV002';
        const kqMot = await col.deleteOne({ masv: maCanXoa });
        console.log(`\n[deleteOne] Xóa sinh viên ${maCanXoa}: ${kqMot.deletedCount} bản ghi`);

        const kqNhieu = await col.deleteMany({ diem: { $lt: 5 } });
        console.log(`[deleteMany] Xóa sinh viên có điểm dưới 5: ${kqNhieu.deletedCount} bản ghi`);
        console.log(`Tổng số bản ghi đã xóa: ${kqMot.deletedCount + kqNhieu.deletedCount}`);

        await inDanhSach(col, 'Danh sách còn lại');

        // Chuc nang rieng: thong ke sinh vien con lai
        const tk = await col.aggregate([
            { $group: { _id: null, tb: { $avg: '$diem' }, cao: { $max: '$diem' } } }
        ]).toArray();
        if (tk.length > 0) {
            console.log(`\nĐiểm trung bình còn lại: ${tk[0].tb.toFixed(2)} | Điểm cao nhất: ${tk[0].cao}`);
        }
    } catch (loi) {
        console.error(`Lỗi: ${loi.message}`);
    } finally {
        await client.close();
        console.log('\nĐã đóng kết nối');
    }
}

main();