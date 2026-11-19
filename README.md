# An Nhiên Spa – Landing page đặt lịch

Website giới thiệu và nhận đặt lịch cho spa, dùng tông tối kết hợp vàng gold sang trọng. Bố cục lấy cảm hứng từ senspahaiphong.com.
Công nghệ: **Vite + HTML/CSS/JavaScript thuần**. Kiểm thử bằng **Playwright**.

## Cấu trúc trang

1. **Top bar:** email, hotline, đặt lịch, dropdown hỗ trợ (Facebook, Zalo, Hotline).
2. **Header sticky:** logo, ô tìm kiếm, hotline, menu. Trên mobile chuyển thành hamburger.
3. **Về spa:** ảnh, câu trích dẫn và nút "Xem thêm".
4. **Nguyên tắc làm nghề bằng tâm:** 4 thẻ.
5. **Dịch vụ nổi bật:** 6 thẻ, bấm "Đặt lịch" sẽ tự điền dịch vụ vào form.
6. **Combo ưu đãi:** 3 combo.
7. **Cảm nhận khách hàng:** slider tự chạy.
8. **Form đặt lịch:** validate họ tên, SĐT Việt Nam và giờ hẹn.
9. **Bài viết tin tức.**
10. **Footer 4 cột:** có form tư vấn và credit "Thiết kế bởi Mai Duy".
11. **Nút nổi:** Gọi điện, Zalo, Messenger và nút lên đầu trang.

## Yêu cầu

- Node.js ≥ 18

## Cài đặt và chạy

```bash
npm install
npm run dev
```

Mở trình duyệt tại http://localhost:5173

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` / `npm start` | Chạy trên máy (tự tải lại khi sửa code) |
| `npm run build` | Build bản production vào thư mục `dist/` |
| `npm run preview` | Xem thử bản build tại http://localhost:4173 |
| `npx playwright install chromium` | Cài trình duyệt cho test (chỉ cần chạy 1 lần) |
| `npm test` | Chạy test tự động, xuất screenshot và video |

## Kiểm thử tự động

`npm test` sẽ:
- Chụp toàn trang ở desktop 1440px → `screenshots/desktop-full.png`
- Chụp toàn trang ở mobile 375px → `screenshots/mobile-full.png`, đồng thời kiểm tra không có thanh cuộn ngang và menu hamburger hoạt động.
- Kiểm tra header sticky và nút lên đầu trang.
- Kiểm tra báo lỗi khi bỏ trống hoặc nhập sai SĐT.
- Quay video: cuộn trang → chọn dịch vụ → điền form → gửi → `videos/demo.webm`

## Tùy chỉnh nội dung

| Muốn sửa | File |
|---|---|
| Tên spa, SĐT, email, địa chỉ, giờ mở cửa, link Facebook/Zalo | `src/data/site.js` |
| Dịch vụ, giá, combo, đánh giá, bài viết | `src/data/content.js` |
| Màu sắc, font | Các biến trong `:root` ở đầu `src/style.css` |
| Tiêu đề SEO, mô tả, schema | Phần `<head>` trong `index.html` |

**Thay ảnh thật:** hiện trang đang dùng khối placeholder (nền gradient và biểu tượng hoa sen). Cách thay:
1. Chép ảnh (nên dùng `.webp`) vào `public/images/`.
2. Trong `src/main.js`, thay `<div class="ph tone-...">` bằng `<img src="/images/ten-anh.webp" alt="..." loading="lazy">`.

> ⚠️ Trước khi đưa trang lên chạy thật, cần thay các thông tin mẫu sau: SĐT `0900 000 000`, địa chỉ, link mạng xã hội (`#`), đánh giá khách hàng mẫu và tên spa "An Nhiên Spa".

## Deploy

- **Netlify / Vercel:** kết nối repo GitHub, chọn Build command `npm run build` và Output directory `dist`.
- **Hosting thường:** chạy `npm run build`, rồi upload toàn bộ nội dung thư mục `dist/` lên hosting.

## Lỗi thường gặp

| Lỗi | Cách khắc phục |
|---|---|
| `Port 5173 is in use` | Tắt tiến trình đang chiếm cổng, hoặc đổi `port` trong `vite.config.js` (nhớ đổi cả `playwright.config.js`). |
| `Executable doesn't exist` khi chạy test | Chạy `npx playwright install chromium`. |
| PowerShell báo `running scripts is disabled` | Chạy lệnh trong Command Prompt (cmd), hoặc chạy `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. |
| Form gửi nhưng không lưu dữ liệu | Hiện form chỉ `console.log` và hiện thông báo. Muốn nhận đơn thật, hãy kết nối Google Sheets, Formspree hoặc API riêng trong `src/main.js`. |
