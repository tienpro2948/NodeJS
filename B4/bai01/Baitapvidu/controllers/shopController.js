// Controller: nhận yêu cầu, gọi Model, chọn View
const express = require('express');
const router = express.Router();
const menuModel = require('../models/menuModel');

router.get('/', (req, res) => {
  res.render('index', { title: 'Gió Biển Coffee', noiBat: menuModel.getAll().slice(0, 3) });
});

// /menu hoặc /menu?loai=caphe
router.get('/menu', (req, res) => {
  const loaiList = menuModel.getLoai();
  const chon = req.query.loai;
  const nhom = chon ? loaiList.filter((l) => l.key === chon) : loaiList;
  const danhSach = nhom.map((l) => ({ ...l, mon: menuModel.getByLoai(l.key) }));
  res.render('menu', { title: 'Thực đơn', loaiList, chon, danhSach });
});

router.get('/order', (req, res) => {
  res.render('order', { title: 'Gọi món', loaiList: menuModel.getLoai(), getByLoai: menuModel.getByLoai });
});

router.post('/order', (req, res, next) => {
  try {
    const hoaDon = menuModel.tinhHoaDon(req.body.qty);
    res.render('bill', { title: 'Hóa đơn', hoaDon });
  } catch (err) {
    next(err); // chuyển cho middleware xử lý lỗi
  }
});

module.exports = router;