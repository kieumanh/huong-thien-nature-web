# Nhánh Git — Hương Thiền Nature

Ngày rà soát: 2026-11-23. `main` là production. Lịch sử `main` tuyến tính (PR được squash/rebase), nên số commit "ahead" của một nhánh **không** chứng minh nhánh chưa được gộp. Chưa xác minh từng nhánh bằng so sánh nội dung; **không nhánh nào bị xóa** trong lần rà soát này.

## Nhóm

| Nhóm | Nhánh | Nhận định |
|---|---|---|
| Sao lưu | `backup/zen-botanical-before-2026` | Giữ làm điểm khôi phục trước Zen Botanical |
| Tính năng đã phát hành | `design/zen-botanical-2026`, `feature/four-seasons`, `feature/journey-pages`, `fix/open-content-orbits`, `fix/ecosystem-partner-journey`, `fix/home-footer-contrast`, `feat/tarot-guidance`, `feat/tarot-refinement`, `feat/course-daylight`, `fix/season-leaves-full-width`, `fix/suggestions-orbit-labels` | Nội dung tương ứng các bản 2.2–2.7 đã nằm trong `main`; có thể xóa sau khi chủ dự án đồng ý |
| Codex (Tarot, 22–23/11) | `codex/tarot-*`, `codex/center-tarot-benefits`, `codex/practice-courses-header-tarot`, `codex/homepage-mobile-orbit-illustrations` | PR #20–#23 và các bản 2.8.x đã vào `main`; có thể dọn |
| Codex (cũ) | `codex/cloudflare-worker-deploy`, `codex/qa-search-contrast-2026-10-09` | Worker deploy (0.4.1) và QA tìm kiếm đã vào `main` |
| Thử nghiệm | `experiment/hybrid-nature-2-5d`, `experiment/blog-studio-v1`, `experiment/blog-studio-cloudflare-v1`, `experiment/studio-nature-live-journal`, `design/compact-shop` | Lịch sử Zen Studio và các ý tưởng; **giữ**, vì có thể chứa mã chưa gộp |

## Quy ước từ nay

- Việc mới: nhánh `feat/<tên>` hoặc `fix/<tên>`, mở PR vào `main`, CI (`validate.yml`) phải xanh.
- Sau khi PR gộp và xác nhận deploy ổn: xóa nhánh.
- Thử nghiệm lớn: `experiment/<tên>`, không gộp vào `main` khi chưa được duyệt.
