// ketQuaHocTap.js - Module xu ly ket qua hoc tap

// Kiem tra diem nam trong khoang 0 -> 10
function kiemTraHopLe(giaTri, tenMon) {
    if (typeof giaTri !== 'number' || Number.isNaN(giaTri) || giaTri < 0 || giaTri > 10) {
        throw new Error(`Điểm môn ${tenMon} không hợp lệ: ${giaTri}`);
    }
}

// Tinh diem trung binh cua 3 mon, lam tron 2 chu so thap phan
function tinhDTB3Mon(mon1, mon2, mon3) {
    kiemTraHopLe(mon1, 1);
    kiemTraHopLe(mon2, 2);
    kiemTraHopLe(mon3, 3);
    const tb = (mon1 + mon2 + mon3) / 3;
    return Number(tb.toFixed(2));
}

// Phan loai hoc luc theo diem trung binh
function phanLoaiHocLuc(dtb) {
    if (dtb >= 8) return 'Giỏi';
    if (dtb >= 6.5) return 'Khá';
    if (dtb >= 5) return 'Trung bình';
    return 'Yếu';
}

// Chuc nang rieng: loi dan theo hoc luc
function taoLoiDan(hocLuc) {
    const loiDan = {
        'Giỏi': 'Rất tốt, giữ vững phong độ nhé!',
        'Khá': 'Khá ổn, cố thêm một chút là lên Giỏi.',
        'Trung bình': 'Cần dành thêm thời gian cho môn còn yếu.',
        'Yếu': 'Cần ôn lại kiến thức nền và hỏi thầy cô nhiều hơn.'
    };
    return loiDan[hocLuc];
}

// Chuc nang rieng: tim mon co diem thap nhat can cai thien
function timMonYeuNhat(bangDiem) {
    return Object.keys(bangDiem).reduce((a, b) => (bangDiem[a] <= bangDiem[b] ? a : b));
}

module.exports = { tinhDTB3Mon, phanLoaiHocLuc, taoLoiDan, timMonYeuNhat };