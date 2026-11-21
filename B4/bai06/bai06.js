// bai06.js - In ket qua hoc tap cua 3 sinh vien
const { tinhDTB3Mon, phanLoaiHocLuc, taoLoiDan, timMonYeuNhat } = require('./ketQuaHocTap');

// Hay thay ten va diem bang du lieu cua ban
const dsSinhVien = [
    { ten: 'Nguyễn Trần Nhật Tiến', bangDiem: { LapTrinh: 9, MangMayTinh: 8, CSDL: 7.5 } },
    { ten: 'Phạm Gia Huy',          bangDiem: { LapTrinh: 6, MangMayTinh: 7, CSDL: 6.5 } },
    { ten: 'Võ Thị Ngọc Lan',       bangDiem: { LapTrinh: 4, MangMayTinh: 5, CSDL: 4.5 } }
];

const mauChu = { 'Giỏi': '\x1b[92m', 'Khá': '\x1b[96m', 'Trung bình': '\x1b[93m', 'Yếu': '\x1b[91m' };
const tatMau = '\x1b[0m';

console.log('========== KẾT QUẢ HỌC TẬP ==========\n');

const bangKetQua = dsSinhVien.map((sv) => {
    const { LapTrinh, MangMayTinh, CSDL } = sv.bangDiem;
    const dtb = tinhDTB3Mon(LapTrinh, MangMayTinh, CSDL);
    const hocLuc = phanLoaiHocLuc(dtb);
    return { ten: sv.ten, dtb, hocLuc, monYeu: timMonYeuNhat(sv.bangDiem) };
});

// Sap xep diem trung binh giam dan
bangKetQua.sort((a, b) => b.dtb - a.dtb);

bangKetQua.forEach((kq, vt) => {
    console.log(`#${vt + 1} ${kq.ten}`);
    console.log(`   Điểm trung bình : ${kq.dtb}`);
    console.log(`   Xếp loại        : ${mauChu[kq.hocLuc]}${kq.hocLuc}${tatMau}`);
    console.log(`   Môn cần cải thiện: ${kq.monYeu}`);
    console.log(`   Lời dặn         : ${taoLoiDan(kq.hocLuc)}\n`);
});

const tbChung = bangKetQua.reduce((s, kq) => s + kq.dtb, 0) / bangKetQua.length;
console.log(`Điểm trung bình chung của nhóm: ${tbChung.toFixed(2)}`);