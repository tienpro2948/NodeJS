// bai07.js - Web Server xu ly tham so URL (cong 3001)
const http = require('http');

const CONG = 3001;

// Gui phan hoi dang text, ho tro tieng Viet
function guiPhanHoi(res, maTrangThai, noiDung) {
    res.statusCode = maTrangThai;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(noiDung);
}

// Doc 1 tham so so tu URL, tra ve { ok, giaTri, loi }
function docSo(thamSo, ten) {
    const raw = thamSo.get(ten);
    if (raw === null || raw.trim() === '') {
        return { ok: false, loi: `Thiếu tham số ${ten}` };
    }
    const so = Number(raw);
    if (!Number.isFinite(so)) {
        return { ok: false, loi: `Giá trị ${ten} = "${raw}" không phải là số hợp lệ` };
    }
    return { ok: true, giaTri: so };
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const duongDan = url.pathname;
    const thamSo = url.searchParams;

    // /hello?name=Minh
    if (duongDan === '/hello') {
        const ten = (thamSo.get('name') || '').trim();
        if (!ten) {
            return guiPhanHoi(res, 400, 'Lỗi: Thiếu tham số name!');
        }
        return guiPhanHoi(res, 200, `Xin chào ${ten}`);
    }

    // /sum?a=10&b=20
    if (duongDan === '/sum') {
        const a = docSo(thamSo, 'a');
        const b = docSo(thamSo, 'b');
        if (!a.ok) return guiPhanHoi(res, 400, `Lỗi: ${a.loi}`);
        if (!b.ok) return guiPhanHoi(res, 400, `Lỗi: ${b.loi}`);
        return guiPhanHoi(res, 200, `Tổng = ${a.giaTri + b.giaTri}`);
    }

    // Chuc nang rieng: /calc?a=6&b=3&op=nhan  (cong, tru, nhan, chia)
    if (duongDan === '/calc') {
        const a = docSo(thamSo, 'a');
        const b = docSo(thamSo, 'b');
        const op = (thamSo.get('op') || '').trim();
        if (!a.ok) return guiPhanHoi(res, 400, `Lỗi: ${a.loi}`);
        if (!b.ok) return guiPhanHoi(res, 400, `Lỗi: ${b.loi}`);

        const pheptinh = {
            cong: (x, y) => x + y,
            tru: (x, y) => x - y,
            nhan: (x, y) => x * y,
            chia: (x, y) => x / y
        };
        if (!pheptinh[op]) {
            return guiPhanHoi(res, 400, 'Lỗi: op phải là cong, tru, nhan hoặc chia');
        }
        if (op === 'chia' && b.giaTri === 0) {
            return guiPhanHoi(res, 400, 'Lỗi: Không thể chia cho 0');
        }
        return guiPhanHoi(res, 200, `Kết quả ${op} = ${pheptinh[op](a.giaTri, b.giaTri)}`);
    }

    // Duong dan khong ton tai
    guiPhanHoi(res, 404, 'Lỗi: Không tìm thấy đường dẫn! Hãy thử /hello, /sum hoặc /calc');
});

server.listen(CONG, () => {
    console.log(`Server đang chạy tại http://localhost:${CONG}`);
});