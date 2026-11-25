# Lên Nguyễn Store — Công & Lương

Ứng dụng riêng, không sửa Sổ Techviet hoặc các Google Sheets nguồn. Dữ liệu D1 bền vững; không dùng localStorage để lưu công/lương.

## Chức năng
- Chấm công một người/một ngày, nhập CSV có xem trước số dòng cập nhật.
- Ca thường 08:00–16:30; trừ giao với nghỉ 12:00–12:30; tăng ca sau 16:30.
- Ca linh hoạt (Trang): tối đa 8 giờ thường, phần dư là tăng ca, không trừ nghỉ trưa.
- Lương cơ bản, ngày chuẩn, tiền cơm, chuyên cần và hệ số tăng ca theo nhân viên.
- Phụ cấp, trách nhiệm, thưởng, thưởng đơn hàng, khấu trừ, tạm ứng theo tháng.
- Chốt tháng khóa công và khoản lương; xuất CSV; nhật ký.

## Phân quyền
Dùng danh tính đăng nhập ChatGPT do Sites xác thực. Owner-private tạo hồ sơ chủ ở lần truy cập xác thực đầu tiên. Không có tài khoản/mật khẩu mặc định. Chủ cấp vai trò cho email thật. Website hiện owner-private: cần cấu hình quyền chia sẻ Sites phù hợp trước khi người khác vào; khai báo thành viên trong app chưa đủ để vượt lớp chia sẻ.
- Chủ: toàn quyền.
- Kế toán: công và lương, không quản lý quyền.
- Quản lý kho: công mọi người, không nhận dữ liệu mức lương, khoản điều chỉnh, thành viên hoặc nhật ký lương từ API.
- Nhân viên: công và hồ sơ công của mình; không thấy dữ liệu tiền lương.

API kiểm tra mọi thao tác phía máy chủ, origin và phiên bản dữ liệu để tránh ghi đè khi thao tác đồng thời.

## Dữ liệu ban đầu và giới hạn
5 hồ sơ: Lên, Hạnh, Trang, Phương, Vy; ánh xạ Nhật Vy → Vy. Mức lương để 0, chưa nhập công thực, chưa đồng bộ Google Sheets/Sổ. Dữ liệu QA chỉ tồn tại trong D1 local, không đóng gói lên production.
Chưa hỗ trợ ca qua đêm hoặc nhiều ca trong một ngày. Mức lương được quản lý theo tháng hiệu lực; cấu hình ảnh hưởng tháng đã chốt bị từ chối, các kỳ đã chốt giữ kết quả riêng. CSV dùng UTF-8, chấp nhận cột Ngày, Nhân viên, Giờ vào, Giờ ra; ngày ISO hoặc dd/mm/yyyy.

## Kiểm tra
`node --experimental-strip-types lib/payroll.test.ts`
`npx tsc --noEmit`
Build: `node /home/agent/.codex/plugins/cache/openai-curated-remote/sites/1.1.6/scripts/build-site.mjs`
Migrations: `drizzle/0000_nosy_tag.sql`, chỉ tạo schema; dữ liệu QA không nằm trong migration.

## Màn hình nhân viên Alt + A
`/cham-cong` hiển thị màn hình công, không có menu hoặc dữ liệu tiền lương trên giao diện. `/cham-cong?xem-thu=1` là bản tương tác minh họa độc lập, không ghi công thật.
Chọn ô Giờ vào hoặc Giờ ra rồi bấm Alt + A. API punch lấy ngày và giờ Việt Nam ở máy chủ, không nhận giờ do trình duyệt tự gửi; ô đã có giờ từ chối ghi đè, giờ ra cần giờ vào trước. Tháng chốt không được chấm thêm. Nhập/sửa/xóa/import giờ thủ công chỉ dành cho Chủ hoặc Quản trị viên; điều chỉnh dòng cũ yêu cầu lý do và ghi cũ/mới trong audit.
Màn hình riêng chưa thay thế đăng ký thiết bị dùng chung: lớp truy cập website vẫn owner-private, chưa cấp thiết bị không đăng nhập; không dùng phiên quản trị làm máy kiosk không giám sát vì người có phiên quản trị vẫn có quyền quản trị. Bản xem thử không thay đổi chính sách truy cập này.

## Cập nhật thao tác chuột
Đã bỏ hoàn toàn lắng nghe phím Alt + A trên màn hình nhân viên. Nhấn ô Giờ vào/Giờ ra mở hộp xác nhận gồm tên nhân viên, loại chấm và đồng hồ. Hủy/đóng không ghi dữ liệu. Chỉ nút Xác nhận gọi ghi giờ; khóa nút trong khi lưu. Ô đã chấm không mở xác nhận và không ghi đè. Thời gian thật vẫn lấy từ máy chủ khi xử lý yêu cầu xác nhận, không lấy lúc mở hộp thoại.

## Lịch sử nhân viên
Mỗi dòng có nút Lịch sử chấm công. Cửa sổ chỉ xem theo nhân viên và tháng, chỉ có Ngày / Giờ vào / Giờ ra; không tổng giờ, không tăng ca, không tổng ngày công hoặc dữ liệu lương, không nút sửa/xóa. Màn hình chấm công nhân viên cũng bỏ cột giờ thường và tăng ca; chỉ khu vực quản trị tính các khoản này. Lịch sử xem thử có dữ liệu minh họa 3 ngày trước, không ghi vào D1.

## Mức lương liên tục theo tháng hiệu lực
Mỗi nhân viên có danh sách `rates` với tháng hiệu lực, lương cơ bản, ngày chuẩn, tiền cơm, hệ số TC, chuyên cần và ca làm. Khi tính một tháng, chọn mức có tháng hiệu lực gần nhất không vượt quá tháng tính lương. Mức lương duy trì tới khi có mức mới; có thể lên lịch tăng hoặc giảm. Trường lương cũ được giữ làm mức ban đầu để bảo toàn dữ liệu trước lần cập nhật đầu tiên.
API chặn cập nhật mức ảnh hưởng kỳ đã chốt. Kỳ chốt lưu bảng kết quả riêng; thay đổi mức tương lai hoặc trạng thái nhân viên không sửa bản đã chốt. Dữ liệu phiên bản trước được tương thích bằng hydrateState, không xóa cấu hình cũ.
Màn hình quản trị: Nhân viên & mức lương → Cập nhật lương / hồ sơ → Tháng bắt đầu áp dụng → mức mới → Lưu. Lịch sử lương lưu các lần và lý do. Ngừng sử dụng là tắt chấm công mới, giữ lịch sử và tiền lương đã phát sinh; có thể kích hoạt lại. Không xử lý thanh toán ngân hàng hoặc quyết định lương thay chủ shop.
