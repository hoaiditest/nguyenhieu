// Nội dung động: dịch vụ, combo, đánh giá, bài viết
// "tone" chọn màu ảnh placeholder (0–3) – thay bằng "img: '/images/ten-anh.webp'" khi có ảnh thật

export const principles = [
  { icon: 'shield', title: 'An toàn là trên hết', text: 'Sản phẩm rõ nguồn gốc, dụng cụ tiệt trùng sau mỗi lượt khách.' },
  { icon: 'heart', title: 'Hiểu cơ thể trước trị liệu', text: 'Kỹ thuật viên hỏi kỹ tình trạng sức khỏe trước khi bắt đầu.' },
  { icon: 'hand', title: 'Cẩn trọng và tử tế', text: 'Từng động tác nhẹ nhàng, đúng lực, tôn trọng sự riêng tư.' },
  { icon: 'check', title: 'Cam kết chân thực', text: 'Tư vấn đúng nhu cầu, không ép mua liệu trình, giá niêm yết rõ ràng.' },
];

export const services = [
  { id: 'massage', name: 'Massage trị liệu', time: '60 phút', price: 350, tone: 0, text: 'Giải tỏa căng cơ vai gáy, lưng do ngồi lâu.' },
  { id: 'facial', name: 'Chăm sóc da mặt', time: '75 phút', price: 450, tone: 1, text: 'Làm sạch sâu, cấp ẩm, phục hồi làn da mệt mỏi.' },
  { id: 'goidau', name: 'Gội đầu dưỡng sinh', time: '45 phút', price: 180, tone: 2, text: 'Thảo dược bồ kết, bấm huyệt đầu cổ vai.' },
  { id: 'dano', name: 'Massage đá nóng', time: '90 phút', price: 550, tone: 3, text: 'Đá bazan ấm giúp lưu thông khí huyết, ngủ ngon.' },
  { id: 'xonghoi', name: 'Xông hơi thảo dược', time: '30 phút', price: 150, tone: 1, text: 'Lá sả, gừng, bưởi giúp thải độc, thư giãn.' },
  { id: 'detox', name: 'Body detox', time: '90 phút', price: 650, tone: 0, text: 'Tẩy tế bào chết, ủ dưỡng toàn thân mịn màng.' },
];

export const combos = [
  { name: 'Combo Thư Thái', items: 'Massage trị liệu + Gội đầu dưỡng sinh', old: 530, price: 449, hot: false },
  { name: 'Combo Sen Vàng', items: 'Massage đá nóng + Xông hơi + Chăm sóc da mặt', old: 1150, price: 899, hot: true },
  { name: 'Combo Đôi Bạn', items: '2 suất Massage trị liệu 60 phút', old: 700, price: 590, hot: false },
];

// Đánh giá mẫu – thay bằng phản hồi thật của khách trước khi chạy chính thức
export const testimonials = [
  { name: 'Chị Lan', text: 'Không gian yên tĩnh, kỹ thuật viên rất có tâm. Vai gáy nhẹ hẳn sau một buổi.', stars: 5 },
  { name: 'Anh Minh', text: 'Massage đá nóng tuyệt vời, tối đó ngủ một mạch tới sáng.', stars: 5 },
  { name: 'Chị Hà', text: 'Tư vấn kỹ, không chèo kéo mua thêm. Sẽ quay lại cùng mẹ.', stars: 5 },
  { name: 'Chị Thu', text: 'Gội đầu dưỡng sinh thơm mùi bồ kết, giá hợp lý.', stars: 4 },
];

export const posts = [
  { date: '12/11/2026', title: '5 dấu hiệu cơ thể bạn cần được massage', text: 'Đau mỏi vai gáy, khó ngủ, đau đầu kéo dài… là những tín hiệu không nên bỏ qua.', tone: 2 },
  { date: '05/11/2026', title: 'Chăm sóc da mùa hanh khô đúng cách', text: 'Cấp ẩm từ bên trong và bên ngoài để da luôn mềm mịn khi trời trở lạnh.', tone: 1 },
  { date: '28/10/2026', title: 'Gội đầu dưỡng sinh có tác dụng gì?', text: 'Không chỉ sạch tóc, bấm huyệt vùng đầu còn giúp giảm căng thẳng hiệu quả.', tone: 3 },
];
