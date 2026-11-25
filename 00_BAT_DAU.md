# Bàn giao mã nguồn PM Lên Nguyễn Store

- **Mốc nguồn:** bản đã xuất bản v359, commit `a3a9218be821a19c077538e98a1898e21b1ca33f`.
- **Đây là mã nguồn đã làm sạch để bàn giao, không phải bản sao cơ sở dữ liệu hay gói cài đặt một nút.** Không có Git history, thư viện cài sẵn, bản build production, bản ghi D1/R2, thông tin đăng nhập hoặc khóa API.
- Cấu trúc: `app/`, `components/`, `lib/` là mã ứng dụng; `db/`, `drizzle/` là cấu trúc dữ liệu; `worker/`, `.openai/`, `scripts/` là mã và cấu hình triển khai; `integrations/` là mã kết nối; `docs/`, `public/`, `vendor/` là tài liệu và tài nguyên.
- Đã bỏ mốc kiểm kê thật, danh sách chứng từ cũ nhúng sẵn, tài khoản cấp sẵn và thay ID liên kết Drive riêng tư bằng chỗ trống cấu hình. Bản này không có quyền vào PM thật. Một số kiểm thử đối chiếu với mốc hoặc dữ liệu shop thật cần bộ dữ liệu thử riêng. `README.md` là tài liệu lịch sử; ưu tiên hướng dẫn này khi dùng ZIP.

## Cài và kiểm tra trên một môi trường riêng

1. Dùng Node.js từ 22.13 trở lên. Giải nén, mở terminal tại thư mục có `package.json`, chạy `npm ci`. Giữ `package-lock.json`.
2. Chạy `npm run build` để kiểm tra mã. Dùng `npm run dev` để phát triển; các trang cần quyền đăng nhập hoặc dữ liệu sẽ không có đầy đủ chức năng nếu thiếu môi trường xác thực/binding.
3. Tạo **D1 và R2 riêng**, cấu hình binding `DB` và `BUCKET` cùng môi trường xác thực phù hợp thiết kế hiện hành. Cấu hình dự án thử riêng trước khi xuất bản. Không dùng ID, domain hoặc cơ sở dữ liệu của PM thật để thử. Chạy các migration thích hợp từ `drizzle/` trên bản riêng.
4. Chủ shop thiết lập tài khoản và cấp quyền trong hệ thống mới. Nhập mốc kiểm kê ban đầu đã đối chiếu trước khi xem số tồn A3. Chỉ bật các kết nối POS, Google Sheets/Drive và Gmail sau khi cấu hình nguồn được duyệt; lưu khóa bằng secret phía máy chủ, không đặt vào ZIP hay trình duyệt.
5. Nghiệm thu trên dữ liệu mẫu: đăng nhập/phân quyền, chấm công, tồn POS, đơn hàng, ngày/giờ Việt Nam, thử gửi lại không tạo trùng rồi mới tính đến chuyển dữ liệu thật.

Bản ZIP không sửa hoặc triển khai PM đang chạy.
