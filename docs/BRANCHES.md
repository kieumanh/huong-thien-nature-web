# Nhánh Git — Hương Thiền Nature

Rà soát ngày 2026-11-23 bằng so sánh nội dung với `main` (v2.8.4): (1) `git merge-tree` để tìm nhánh không còn thêm gì; (2) tỉ lệ dòng mã nhánh đã thêm mà `main` vẫn có. Lịch sử `main` tuyến tính (PR squash), nên số commit "ahead" không cho biết nhánh đã gộp hay chưa.

**Trạng thái:** 22 nhánh xác minh là đã phát hành/được thay thế nên xóa được; 5 nhánh giữ. **Chưa xóa nhánh nào**: phiên làm việc của trợ lý bị chặn quyền xóa nhánh và tạo thẻ (HTTP 403). Chủ dự án xóa bằng GitHub → Code → Branches (nút thùng rác); GitHub cho phép "Restore" ngay sau khi xóa. Bản sao lưu toàn bộ 22 nhánh (git bundle) đã được gửi kèm cho chủ dự án.

## 22 nhánh có thể xóa

Cột "Vì sao" là bản phát hành tương ứng trong `CHANGELOG.md`. SHA đỉnh nhánh dùng để khôi phục (`git branch <tên> <sha>` từ bản bundle).

| Nhánh | SHA đỉnh | Vì sao |
|---|---|---|
| `codex/center-tarot-benefits` | 0ca176a | #21, nằm trọn trong main |
| `codex/tarot-guidance-atmosphere` | — | 100% có trong main |
| `codex/tarot-soft-quotes` | — | #23, 100% có trong main |
| `experiment/blog-studio-v1` | — | 100% có trong main |
| `fix/season-leaves-full-width` | — | 2.7.4, tổ tiên của main |
| `fix/suggestions-orbit-labels` | — | 2.7.5, tổ tiên của main |
| `codex/tarot-benefit-illustrations` | — | #20 (90% dòng còn trong main) |
| `codex/practice-courses-header-tarot` | — | 2.8.1 (92%) |
| `codex/tarot-landing-editorial-ai` | — | 2.8.3 (87%) |
| `codex/tarot-research-and-founder` | — | 2.8.2, sau đó viết lại |
| `codex/homepage-mobile-orbit-illustrations` | — | 2.8.0, sau đó viết lại |
| `codex/cloudflare-worker-deploy` | 16f8f37 | 0.4.1 Worker, tài liệu đã viết lại |
| `codex/qa-search-contrast-2026-10-09` | — | QA tìm kiếm 0.4.x (86%) |
| `design/zen-botanical-2026` | — | 2.2.0 (87%) |
| `feature/journey-pages` | — | 2.3.0 |
| `feature/four-seasons` | — | 2.4.0/2.7.0 |
| `fix/open-content-orbits` | — | 2.2.1 |
| `fix/ecosystem-partner-journey` | — | 2.4.2 (94%) |
| `fix/home-footer-contrast` | — | 2.6.3 |
| `feat/tarot-guidance` | — | 2.5.0 |
| `feat/tarot-refinement` | — | 2.6.1 |
| `feat/course-daylight` | — | 2.6.0 |

(Danh sách SHA đầy đủ nằm trong tệp `archived-branches-sha.txt` gửi cùng bundle.)

## 5 nhánh nên giữ

| Nhánh | Lý do |
|---|---|
| `backup/zen-botanical-before-2026` | Điểm khôi phục trước Zen Botanical (đã nằm trong lịch sử main) |
| `experiment/studio-nature-live-journal` | 0% có trong main: chứa `src/lib/studio-journal.mjs`, chưa gộp |
| `experiment/blog-studio-cloudflare-v1` | 99% có trong main nhưng còn khác biệt ở mã xác thực (`email-auth-v3`, `family-auth-v3`); xem xét rồi mới xóa |
| `experiment/hybrid-nature-2-5d` | 40% còn trong main; chưa rõ ý tưởng nào bị bỏ |
| `design/compact-shop` | 24% còn trong main; giao diện cửa hàng thay thế chưa xác nhận bị bỏ |

## Quy ước từ nay

- Việc mới: nhánh `feat/<tên>` hoặc `fix/<tên>`, mở PR vào `main`, CI (`validate.yml`) phải xanh. Bật Branch protection cho `main` (bắt buộc PR + CI xanh).
- Sau khi PR gộp và xác nhận deploy ổn: xóa nhánh (GitHub có tùy chọn tự xóa nhánh sau khi gộp — nên bật).
- Thử nghiệm lớn: `experiment/<tên>`, không gộp vào `main` khi chưa được duyệt.
