// bai10.js - Lien ket hai collection bang $lookup
const { MongoClient } = require('mongodb');

// Dung dung chuoi ket noi da chay duoc o bai 9
const URI = 'mongodb://localhost:27017';
const TEN_DB = 'qlsinhvien';

const dsKhoa = [
    { makhoa: 'CNTT', tenkhoa: 'Công nghệ thông tin' },
    { makhoa: 'KT',   tenkhoa: 'Kế toán' },
    { makhoa: 'NN',   tenkhoa: 'Ngoại ngữ' }
];

const dsSinhVien = [
    { masv: 'SV001', hoten: 'Nguyễn Trần Nhật Tiến', makhoa: 'CNTT' },
    { masv: 'SV002', hoten: 'Phạm Gia Huy',          makhoa: 'CNTT' },
    { masv: 'SV003', hoten: 'Võ Thị Ngọc Lan',       makhoa: 'KT' },
    { masv: 'SV004', hoten: 'Đặng Quốc Khánh',       makhoa: 'NN' },
    { masv: 'SV005', hoten: 'Lê Hoài Thương',        makhoa: 'KT' }
];

async function main() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        console.log('Đã kết nối MongoDB thành công');

        const db = client.db(TEN_DB);
        const colKhoa = db.collection('departments');
        const colSV = db.collection('students_join');

        // Lam sach du lieu cu de chay lai nhieu lan van giong nhau
        await colKhoa.deleteMany({});
        await colSV.deleteMany({});

        const kqKhoa = await colKhoa.insertMany(dsKhoa);
        const kqSV = await colSV.insertMany(dsSinhVien);
        console.log(`Đã thêm ${kqKhoa.insertedCount} khoa vào departments`);
        console.log(`Đã thêm ${kqSV.insertedCount} sinh viên vào students_join`);

        // aggregate + $lookup: noi students_join voi departments qua makhoa
        const ketQua = await colSV.aggregate([
            {
                $lookup: {
                    from: 'departments',
                    localField: 'makhoa',
                    foreignField: 'makhoa',
                    as: 'thongtinkhoa'
                }
            },
            { $unwind: '$thongtinkhoa' },
            {
                $project: {
                    _id: 0,
                    masv: 1,
                    hoten: 1,
                    makhoa: 1,
                    tenkhoa: '$thongtinkhoa.tenkhoa'
                }
            },
            { $sort: { masv: 1 } }
        ]).toArray();

        console.log('\n===== DANH SÁCH SINH VIÊN KÈM TÊN KHOA =====');
        ketQua.forEach((sv, i) => {
            console.log(`${i + 1}. ${sv.masv} | ${sv.hoten} | ${sv.makhoa} - ${sv.tenkhoa}`);
        });

        // Chuc nang rieng: thong ke so sinh vien theo tung khoa
        const thongKe = await colSV.aggregate([
            {
                $lookup: {
                    from: 'departments',
                    localField: 'makhoa',
                    foreignField: 'makhoa',
                    as: 'k'
                }
            },
            { $unwind: '$k' },
            { $group: { _id: '$k.tenkhoa', soluong: { $sum: 1 } } },
            { $sort: { soluong: -1, _id: 1 } }
        ]).toArray();

        console.log('\n===== THỐNG KÊ SỐ SINH VIÊN THEO KHOA =====');
        thongKe.forEach((k) => console.log(`- ${k._id}: ${k.soluong} sinh viên`));
    } catch (loi) {
        console.error(`Lỗi: ${loi.message}`);
    } finally {
        await client.close();
        console.log('\nĐã đóng kết nối');
    }
}

main();