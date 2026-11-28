// Model: dữ liệu thực đơn và logic tính hóa đơn
const items = [
  { id: 1, loai: 'caphe', ten: 'Cà phê muối', gia: 29000, mota: 'Cà phê đậm, lớp kem muối béo mặn' },
  { id: 2, loai: 'caphe', ten: 'Bạc xỉu đá', gia: 27000, mota: 'Nhiều sữa, ít cà phê, dễ uống' },
  { id: 3, loai: 'caphe', ten: 'Cà phê đen đá', gia: 22000, mota: 'Robusta rang mộc, không đường' },
  { id: 4, loai: 'trai-cay', ten: 'Sinh tố xoài', gia: 35000, mota: 'Xoài cát Khánh Hòa xay lạnh' },
  { id: 5, loai: 'trai-cay', ten: 'Nước dừa tắc', gia: 30000, mota: 'Dừa tươi, tắc vắt, thạch dừa' },
  { id: 6, loai: 'trai-cay', ten: 'Chanh dây mật ong', gia: 28000, mota: 'Chua nhẹ, thơm mùi mật ong' },
  { id: 7, loai: 'banh', ten: 'Bánh flan', gia: 18000, mota: 'Mềm mịn, rưới cà phê đen' },
  { id: 8, loai: 'banh', ten: 'Bánh mì que pate', gia: 15000, mota: 'Giòn nóng, cay nhẹ' }
];

const loaiList = [
  { key: 'caphe', ten: 'Cà phê' },
  { key: 'trai-cay', ten: 'Trái cây' },
  { key: 'banh', ten: 'Ăn kèm' }
];

const menuModel = {
  getAll: () => items,
  getLoai: () => loaiList,
  getByLoai: (key) => items.filter((m) => m.loai === key),

  // quantities: { "1": "2", "4": "1", ... }
  // Trả về hóa đơn, hoặc ném lỗi nếu dữ liệu sai
  tinhHoaDon: (quantities = {}) => {
    const dong = [];
    for (const [id, raw] of Object.entries(quantities)) {
      const sl = Number(raw);
      if (!Number.isInteger(sl) || sl < 0 || sl > 50) {
        const err = new Error('Số lượng phải là số nguyên từ 0 đến 50.');
        err.status = 400;
        throw err;
      }
      const mon = items.find((m) => m.id === Number(id));
      if (mon && sl > 0) {
        dong.push({ ten: mon.ten, gia: mon.gia, sl, thanhTien: mon.gia * sl });
      }
    }
    if (dong.length === 0) {
      const err = new Error('Bạn chưa chọn món nào. Hãy nhập số lượng ít nhất một món.');
      err.status = 400;
      throw err;
    }
    const tamTinh = dong.reduce((t, d) => t + d.thanhTien, 0);
    const giam = tamTinh >= 150000 ? Math.round(tamTinh * 0.1) : 0; // giảm 10% từ 150.000 ₫
    return { dong, tamTinh, giam, tong: tamTinh - giam };
  }
};

module.exports = menuModel;