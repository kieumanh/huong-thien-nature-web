# Triển khai và khôi phục

## Triển khai
Push lên `main` → Cloudflare Workers Builds tự chạy `npm run build` và `wrangler deploy`. Kiểm tra sau triển khai: mở `/vi/`, `/en/`, `/living-zen/`, `/sitemap.xml`, `/api/contact-config`; xem số phiên bản ở chân trang.

## Điểm neo (khôi phục)
- Điểm neo: nhánh `anchor/2026-11-26-v2.23.0` (commit `35fbe7b`, website 2.23.0, trước Living Zen 2.0).
- Khi chủ dự án nói **"quay lại phiên bản điểm neo"**: tạo một commit trên `main` đưa toàn bộ mã nguồn về đúng nội dung của nhánh neo (không xóa lịch sử), tăng số phiên bản và ghi CHANGELOG, rồi push để Cloudflare triển khai lại.

```bash
git fetch origin
git checkout main && git pull
git rm -r -q . && git checkout origin/anchor/2026-11-26-v2.23.0 -- .
git commit -m "Quay lại điểm neo 2.23.0"
git push origin main
```

- Khôi phục nhanh hơn (không cần build): Cloudflare dashboard → Workers → `huong-thien-nature` → Deployments → chọn bản trước → Rollback. Cách này không đổi mã nguồn trên GitHub; lần push sau sẽ triển khai lại mã mới.
