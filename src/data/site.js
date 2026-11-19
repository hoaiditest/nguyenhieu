// Thông tin chung của spa – sửa tại đây, toàn trang tự cập nhật
export const site = {
  name: 'An Nhiên Spa',
  city: 'Hải Phòng',
  email: 'lienhe@annhienspa.vn',
  phone: '0900 000 000',
  phone2: '0900 000 001',
  address: '123 Đường Mẫu, Lê Chân, Hải Phòng',
  hours: '9:00 – 21:00 (tất cả các ngày)',
  facebook: '#',
  zalo: '#',
  messenger: '#',
};

// Số điện thoại dạng gọi được (bỏ khoảng trắng)
export const tel = (p) => 'tel:' + p.replace(/\s/g, '');
