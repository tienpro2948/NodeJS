const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Đã kết nối MongoDB thành công');

    const db = client.db('qlsinhvien');
    const students = db.collection('students');

    const danhSach = [
      { masv: 'SV001', hoten: 'Nguyễn Văn An', tuoi: 20, diem: 8.5 },
      { masv: 'SV002', hoten: 'Trần Thị Bình', tuoi: 21, diem: 7.0 },
      { masv: 'SV003', hoten: 'Lê Minh Cường', tuoi: 20, diem: 9.0 },
    ];
    const ketQua = await students.insertMany(danhSach);
    console.log(`Đã thêm ${ketQua.insertedCount} sinh viên`);

    const tatCa = await students.find().toArray();
    console.log('\nDanh sách sinh viên:');
    tatCa.forEach((sv, i) => {
      console.log(`${i + 1}. ${sv.masv} | ${sv.hoten} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
    });
  } catch (err) {
    console.error('Có lỗi xảy ra:', err.message);
  } finally {
    await client.close();
    console.log('\nĐã đóng kết nối');
  }
}

main();