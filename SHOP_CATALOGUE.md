# Cửa hàng — catalogue demo V0.4.7

## Routes and behavior

- Vietnamese catalogue: `/vi/cua-hang/`; English catalogue: `/en/shop/`.
- Eight product detail pages per language; language switching keeps the selected product.
- Shared main navigation and footer link to the catalogue. The expanded navigation switches to a tablet menu below 1241 px.
- Category filters and accent-insensitive name/ingredient search; full catalogue and links remain usable without JavaScript.
- Product enquiries open the existing contact form with the selected product name. Only known catalogue slugs can prefill the message; no email is sent until the visitor submits the form.
- Products are included in the existing site search and bilingual sitemap.
- Prices are demo suggestions. No checkout, stock claims, order records or live structured-data offers are included.

## Photo mapping and proposed prices

Research checked on 2026-10-08. Package information comes from the supplied photographs. These older photos are presentation assets, not evidence of current stock or expiry dates.

| Product | Uploaded image | Proposed demo price | Pack and evidence |
| --- | --- | ---: | --- |
| Muối hồng Himalaya | Muoi Hong Hymalaya.jpg | 77,000 VND | 500 g is a demo pack; comparable retail product, not a quote for the photographed brand |
| Bột nêm thuần chay Sachi | z6422247614415_a825bb5e1bef109455fe04edce35f7d8.jpg | 95,000 VND | 200 g shown on label; manufacturer price range |
| Bột cacao nguyên chất | z6422247627242_414999fbbf228c31d9c42b5b50d76aa7.jpg | 180,000 VND | 500 g is a demo pack; comparison with a different cacao brand in the reference catalogue |
| Rong biển nấu canh | z6587872633027_5671993a9033f4fac690530c7e04ebe6.jpg | 65,000 VND | 100 g shown on label; Bảo An catalogue |
| Tương Tamari | z6587872778281_1325316e10974d191bcdbfb9d0699a4d.jpg | 85,000 VND | 250 ml marked on label; lower end of Bảo An bottle range, actual variant quote needs confirmation |
| Sữa thảo mộc Kokkoh | z6587872778506_2de0a4780a1b6fff66898f4a12f44f95.jpg | 70,000 VND | 500 g shown on label; KohKoh supplier listing, current pack/price pairing needs confirmation |
| Tương cổ truyền Trí Túc | z6587872933748_c595ee56c4121e3dd6610a07f1fb7ecc.jpg | 65,000 VND | 500 ml shown on label; editorial demo estimate without matching supplier quotation |
| Đậu phộng sống | z6587872965598_348de5414407bdaca71c3a890de4cb52.jpg | 60,000 VND | 500 g shown on label; Bảo An catalogue |

## Research references

- Layout inspiration and comparable cacao price: https://www.hocthiendanang.com/phuong-tien
- Sachi manufacturer: https://sachigroup.vn/product/bot-nem-sachi/
- Kokkoh supplier listing: https://thucduongbaoan.com.vn/sp-category/do-kho/bot-thuc-duong/
- Tamari supplier: https://thucduongbaoan.com.vn/sp/tuong-tamari-lau-nam/
- Seaweed supplier: https://thucduongbaoan.com.vn/sp/rong-bien-nau-canh/
- Peanuts supplier: https://thucduongbaoan.com.vn/sp/dau-phong/
- Comparable salt retailer: https://www.foodland.vn/muoi-hong-himalaya-min-tui-500g

`src/data/products.ts` keeps the source URLs and price rationale for each entry. Public text describes culinary uses and label information; medical and energy claims from reference websites are not carried into the catalogue.

## Verification

Run `npm run check`, `npm run audit`, `npm run test:shop`, `npm run test:search`, `npm run test:contact`, `npm run test:worker`, `npm run build` and `npm run audit:build`. The build audit expects 56 HTML pages and 54 sitemap entries and checks product links, language alternates, enquiry destinations and demo-price metadata.

Browser QA was unavailable in this session because the managed preview's required control-browser skill was not exposed. Responsive styles are implemented; visual rendering on actual devices remains unverified.

## Keywords and stock status

Each product has Vietnamese and English keyword aliases in `src/data/products.ts`. These are indexed in both the catalogue filter and global search. Examples: `lạc` → raw peanuts, `ca cao` → cacao, `xì dầu` → Tamari. Product search results show the actual photo, description, demo price, pack and stock status.

Set each product's `stock` to `in_stock`, `out_of_stock` or `unknown` when confirmed. No real inventory counts were supplied, so every product currently uses `unknown`, displayed as “Cần xác nhận tồn kho” / “Stock confirmation needed”. This is static catalogue data and changes need a new build/deployment; it does not claim live warehouse synchronization.

The two unlabelled products and their optimized image assets were removed from the catalogue, routes, sitemap and search index. Original user uploads are retained.
