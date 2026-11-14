const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

function hienThi(tieuDe, danhSach) {
  console.log(`\n${tieuDe}`);
  danhSach.forEach((sv, i) => {
    console.log(`${i + 1}. ${sv.masv} | ${sv.hoten} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
  });
}

async function main() {
  try {
    await client.connect();
    console.log('Đã kết nối MongoDB thành công');

    const students = client.db('qlsinhvien').collection('students');

    // 1. Tìm sinh viên có diem >= 7 và sắp xếp điểm giảm dần
    const locTruoc = await students
      .find({ diem: { $gte: 7 } })
      .sort({ diem: -1 })
      .toArray();
    hienThi('Sinh viên có điểm >= 7 (sắp xếp điểm giảm dần):', locTruoc);

    // 2. Cập nhật điểm của sinh viên SV002 thành 9.5
    const ketQua = await students.updateOne(
      { masv: 'SV002' },
      { $set: { diem: 9.5 } }
    );
    console.log(`\nĐã cập nhật: ${ketQua.modifiedCount} sinh viên (masv = SV002, điểm mới = 9.5)`);

    // 3. Hiển thị lại để kiểm tra sau cập nhật
    const sv = await students.findOne({ masv: 'SV002' });
    console.log(`\nThông tin SV002 sau cập nhật: ${sv.hoten} | Điểm: ${sv.diem}`);

    const locSau = await students
      .find({ diem: { $gte: 7 } })
      .sort({ diem: -1 })
      .toArray();
    hienThi('Danh sách sau cập nhật (điểm >= 7, giảm dần):', locSau);
  } catch (err) {
    console.error('Có lỗi xảy ra:', err.message);
  } finally {
    await client.close();
    console.log('\nĐã đóng kết nối');
  }
}

main();