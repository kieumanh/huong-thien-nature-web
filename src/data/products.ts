import type { Language } from './site.ts';

export const shopPath = (lang: Language) => lang === 'vi' ? '/vi/cua-hang/' : '/en/shop/';
export const productPath = (lang: Language, slug: string) => `${shopPath(lang)}${slug}/`;
export const formatPrice = (price: number, lang: Language) => new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(price);
export const productCategories = [
  { id: 'seasoning', vi: 'Gia vị', en: 'Seasonings' },
  { id: 'pantry', vi: 'Ngũ cốc & thực phẩm khô', en: 'Grains & pantry' },
  { id: 'drinks', vi: 'Thức uống', en: 'Drinks' },
] as const;
export type ProductCopy = { name: string; subtitle: string; description: string; unit: string; ingredients: string; use: string[]; storage: string; note: string; alt: string };
export type Product = {
  slug: string; category: typeof productCategories[number]['id']; price: number;
  image: string; width: number; height: number; stock: 'in_stock' | 'out_of_stock' | 'unknown';
  keywords: Record<Language, string[]>;
  // Research and price rationale stay in source; these are proposed demo prices, not live offers.
  sources: string[]; priceBasis: string;
  translations: Record<Language, ProductCopy>;
};
export const stockLabel = (stock: Product['stock'], lang: Language): string => ({ in_stock: { vi: 'Còn hàng', en: 'In stock' }, out_of_stock: { vi: 'Hết hàng', en: 'Out of stock' }, unknown: { vi: 'Cần xác nhận tồn kho', en: 'Stock confirmation needed' } })[stock][lang];
const photo = (slug: string) => `/media/shop/${slug}.webp`;
export const products: Product[] = [
  {
    stock: 'unknown', keywords: { vi: ["kokkoh", "koh koh", "sữa ngũ cốc", "sữa hạt", "mè đen", "hạt sen"], en: ["kokkoh", "koh koh", "grain drink", "plant milk", "black sesame", "lotus seeds"] },
    slug: 'sua-kokkoh', category: 'drinks', price: 70000, image: photo('sua-kokkoh'), width: 750, height: 1000,
    sources: ['https://thucduongbaoan.com.vn/sp-category/do-kho/bot-thuc-duong/'], priceBasis: 'Supplier category lists KohKoh at 70,000 VND; photographed package reads 500 g. Confirm current pack and quote before sale.',
    translations: {
      vi: { name: 'Sữa thảo mộc Kokkoh', subtitle: 'Ngũ cốc rang cho một buổi sáng thong thả', description: 'Bột ngũ cốc dạng pha uống, kết hợp gạo lứt và các loại đậu, mè, hạt sen. Một lựa chọn để chuẩn bị thức uống ấm hoặc thêm vào bữa sáng tại nhà.', unit: 'Túi 500 g', ingredients: 'Theo nhãn ảnh: gạo lứt, đậu xanh, đậu đỏ, đậu đen, đậu trắng, mè đen và hạt sen.', use: ['Theo nhãn: cho khoảng 30 g bột vào cốc, thêm 300 ml nước nóng và khuấy đều.', 'Chờ khoảng 3 phút; điều chỉnh độ đặc theo khẩu vị.'], storage: 'Giữ kín ở nơi khô, mát. Nhãn ảnh hướng dẫn dùng trong 30 ngày sau khi mở.', note: 'Có mè và các loại đậu. Kiểm tra nhãn của lô thực tế nếu có dị ứng.', alt: 'Túi giấy sữa thảo mộc Kokkoh 500 g với nhãn Bảo An, chụp ngoài vườn.' },
      en: { name: 'Kokkoh grain drink powder', subtitle: 'Roasted grains for a slower morning', description: 'A drink mix of brown rice, beans, black sesame and lotus seeds. Prepare a warm cup or include it in a simple home breakfast.', unit: '500 g pouch', ingredients: 'Photo label: brown rice, mung beans, red beans, black beans, white beans, black sesame and lotus seeds.', use: ['The photo label suggests about 30 g powder with 300 ml hot water; stir well.', 'Wait about 3 minutes and adjust thickness to taste.'], storage: 'Keep sealed in a cool, dry place. The photo label recommends using within 30 days of opening.', note: 'Contains sesame and beans. Check the current batch label for allergens.', alt: 'A 500 g kraft pouch of Bảo An Kokkoh grain drink powder photographed in a garden.' },
    },
  },
  {
    stock: 'unknown', keywords: { vi: ["sachi", "bột nêm", "hạt nêm chay", "gia vị rau củ", "nấu chay"], en: ["sachi", "vegan seasoning", "vegetable seasoning", "plant based cooking"] },
    slug: 'bot-nem-sachi', category: 'seasoning', price: 95000, image: photo('bot-nem-sachi'), width: 1000, height: 450,
    sources: ['https://sachigroup.vn/product/bot-nem-sachi/'], priceBasis: 'Manufacturer lists vegan seasoning at 95,000–170,000 VND; 95,000 VND proposed for the photographed 200 g jar.',
    translations: {
      vi: { name: 'Bột nêm thuần chay Sachi', subtitle: 'Một chút đậm đà cho bếp chay mỗi ngày', description: 'Gia vị dạng bột dành cho các món chay, tiện dùng khi nấu canh, xào rau hoặc kho đậu hũ. Hũ nhỏ gọn phù hợp đặt sẵn trong gian bếp.', unit: 'Hũ 200 g', ingredients: 'Gia vị rau củ thuần chay. Công thức đầy đủ cần đối chiếu mặt sau nhãn của lô hàng thực tế.', use: ['Thêm một lượng nhỏ vào món canh, xào hoặc kho, rồi nếm và điều chỉnh.', 'Kết hợp rau củ tươi để tạo hương vị theo ý thích.'], storage: 'Đậy kín sau khi dùng, để nơi khô mát và sử dụng muỗng sạch, khô.', note: 'Thông tin thành phần chi tiết và dị ứng cần kiểm tra trên bao bì thực tế.', alt: 'Hũ bột nêm thuần chay Sachi 200 g, nắp trắng và nhãn rau củ.' },
      en: { name: 'Sachi vegan seasoning', subtitle: 'A little savoury flavour for everyday plant-based cooking', description: 'A powdered seasoning for vegetable soups, stir-fries and braised tofu. The compact jar is easy to keep close at hand in a home kitchen.', unit: '200 g jar', ingredients: 'Plant-based vegetable seasoning. Confirm the complete ingredient list on the current package.', use: ['Add a small amount to soups, stir-fries or braises, then taste and adjust.', 'Combine with fresh vegetables to build your preferred flavour.'], storage: 'Close tightly, keep cool and dry, and use a clean, dry spoon.', note: 'Check the actual package for the complete ingredients and allergens.', alt: 'A 200 g jar of Sachi vegan seasoning with a white lid and vegetable label.' },
    },
  },
  {
    stock: 'unknown', keywords: { vi: ["muối hồng", "himalaya", "himalayan", "muối ăn", "gia vị"], en: ["pink salt", "himalayan salt", "salt crystals", "seasoning"] },
    slug: 'muoi-hong-himalaya', category: 'seasoning', price: 77000, image: photo('muoi-hong-himalaya'), width: 800, height: 800,
    sources: ['https://www.foodland.vn/muoi-hong-himalaya-min-tui-500g'], priceBasis: '77,000 VND per 500 g from a comparable retail product, not a quote for the photographed brand.',
    translations: {
      vi: { name: 'Muối hồng Himalaya', subtitle: 'Gia vị quen thuộc, sắc hồng tự nhiên', description: 'Muối hồng dạng hạt dùng để nêm món ăn. Sản phẩm trong ảnh được trưng bày như một lựa chọn gia vị cho gian bếp thường ngày.', unit: 'Quy cách demo: 500 g', ingredients: 'Muối hồng; cần xác nhận thành phần và khối lượng trên bao bì thực tế.', use: ['Dùng lượng nhỏ để nêm món canh, kho hoặc rau củ.', 'Nếu hạt lớn, có thể xay trước khi dùng.'], storage: 'Đóng kín túi và giữ nơi khô ráo, tránh ẩm.', note: 'Khối lượng 500 g là quy cách đề xuất cho demo, chưa xác nhận từ ảnh.', alt: 'Túi muối hồng Himalaya màu xanh, có cửa sổ nhìn thấy hạt muối.' },
      en: { name: 'Himalayan pink salt', subtitle: 'An everyday seasoning in a naturally pink hue', description: 'Pink salt crystals for seasoning food. The photographed pouch is presented as a simple pantry seasoning.', unit: 'Demo pack: 500 g', ingredients: 'Pink salt; confirm the actual package ingredients and net weight.', use: ['Use a small amount in soups, braises or vegetable dishes.', 'Grind large crystals before use if needed.'], storage: 'Reseal the pouch and keep dry, away from moisture.', note: 'The 500 g pack is a demo suggestion and is not confirmed by the photograph.', alt: 'A green Himalayan pink salt pouch with visible salt crystals.' },
    },
  },
  {
    stock: 'unknown', keywords: { vi: ["cacao", "ca cao", "cocoa", "bột cacao", "đồ uống", "làm bánh"], en: ["cacao", "cocoa", "cacao powder", "baking", "hot drink"] },
    slug: 'bot-cacao', category: 'drinks', price: 180000, image: photo('bot-cacao'), width: 450, height: 1000,
    sources: ['https://www.hocthiendanang.com/phuong-tien'], priceBasis: 'Reference catalogue lists a different pure cacao brand at 180,000 VND/500 g; proposed comparative price only.',
    translations: {
      vi: { name: 'Bột cacao nguyên chất', subtitle: 'Vị cacao mộc cho một tách ấm', description: 'Hũ bột cacao có nhãn “nguyên chất 100%” trong ảnh. Có thể dùng làm thức uống hoặc thêm hương cacao vào món bánh và bữa sáng.', unit: 'Quy cách demo: 500 g', ingredients: 'Cacao theo nhãn ảnh; cần kiểm tra công bố thành phần của sản phẩm thực tế.', use: ['Hoà một lượng nhỏ bột với ít nước nóng, khuấy mịn rồi thêm nước hoặc sữa hạt.', 'Dùng trong công thức bánh hoặc yến mạch theo khẩu vị.'], storage: 'Đậy kín và để nơi khô mát; tránh hơi nước vào hũ.', note: 'Khối lượng 500 g là quy cách demo. Cần xác nhận thương hiệu và khối lượng trước khi bán.', alt: 'Hũ bột cacao nắp vàng với nhãn ghi cacao nguyên chất 100%.' },
      en: { name: 'Pure cacao powder', subtitle: 'A simple cacao flavour for a warm cup', description: 'The photographed jar is labelled “100% pure”. Use cacao in a drink or as a flavour in baking and breakfast recipes.', unit: 'Demo pack: 500 g', ingredients: 'Cacao as shown on the photo label; confirm the current ingredient declaration.', use: ['Mix a little powder with hot water until smooth, then add water or plant-based milk.', 'Use in baking or oatmeal recipes to taste.'], storage: 'Close tightly and keep cool and dry; keep steam out of the jar.', note: '500 g is a demo pack size. Confirm brand and net weight before sale.', alt: 'A gold-lidded jar of cacao powder with a label stating 100% pure cacao.' },
    },
  },
  {
    stock: 'unknown', keywords: { vi: ["rong biển", "rong biển khô", "nấu canh", "canh chay", "seaweed"], en: ["seaweed", "dried seaweed", "soup", "pantry"] },
    slug: 'rong-bien-nau-canh', category: 'pantry', price: 65000, image: photo('rong-bien-nau-canh'), width: 750, height: 1000,
    sources: ['https://thucduongbaoan.com.vn/sp/rong-bien-nau-canh/'], priceBasis: 'Supplier lists soup seaweed at 65,000 VND; photo label reads 100 g.',
    translations: {
      vi: { name: 'Rong biển nấu canh', subtitle: 'Một nguyên liệu nhỏ cho bát canh chay', description: 'Rong biển khô đóng túi, thích hợp chuẩn bị canh, súp hoặc món rau củ. Dạng khô tiện cất giữ và lấy lượng vừa đủ cho mỗi lần nấu.', unit: 'Túi 100 g', ingredients: 'Theo nhãn ảnh: rong biển tự nhiên.', use: ['Rửa và ngâm theo hướng dẫn trên bao bì của lô thực tế.', 'Nấu cùng đậu hũ, nấm hoặc rau củ; nêm vừa miệng.'], storage: 'Giữ túi kín ở nơi khô, mát và tránh ánh nắng trực tiếp.', note: 'Đối chiếu nhãn về cách sơ chế và hạn sử dụng trước khi dùng.', alt: 'Túi rong biển nấu canh Bảo An 100 g, rong biển khô sẫm màu bên trong.' },
      en: { name: 'Dried soup seaweed', subtitle: 'A small addition to a bowl of vegetable soup', description: 'Dried seaweed for soups and vegetable dishes. Take only what you need from the resealable pantry pouch.', unit: '100 g pouch', ingredients: 'Natural seaweed, according to the photo label.', use: ['Rinse and soak as directed on the current package.', 'Cook with tofu, mushrooms or vegetables and season to taste.'], storage: 'Keep sealed in a cool, dry place away from direct sunlight.', note: 'Check the package preparation instructions and use-by date.', alt: 'A 100 g Bảo An soup seaweed pouch containing dark dried seaweed.' },
    },
  },
  {
    stock: 'unknown', keywords: { vi: ["tamari", "nước tương", "xì dầu", "đậu nành", "nước chấm"], en: ["tamari", "soy sauce", "fermented soy", "dipping sauce"] },
    slug: 'tuong-tamari', category: 'seasoning', price: 85000, image: photo('tuong-tamari'), width: 750, height: 1000,
    sources: ['https://thucduongbaoan.com.vn/sp/tuong-tamari-lau-nam/'], priceBasis: 'Supplier range is 85,000–165,000 VND for bottle variants; 85,000 VND proposed for the photographed 250 ml option.',
    translations: {
      vi: { name: 'Tương Tamari', subtitle: 'Hương đậu nành lên men cho món chay', description: 'Gia vị dạng nước từ đậu nành lên men, có thể dùng làm nước chấm hoặc nêm món kho, xào. Bắt đầu với lượng nhỏ rồi điều chỉnh theo khẩu vị.', unit: 'Chai 250 ml', ingredients: 'Theo nhãn ảnh: đậu nành, nước muối và gạo.', use: ['Pha nước chấm cùng chanh, gừng hoặc các gia vị bạn thích.', 'Thêm vào món đậu hũ kho, rau xào hoặc nước dùng.'], storage: 'Đậy kín ở nơi khô, mát; làm theo hướng dẫn bảo quản của nhà sản xuất sau mở nắp.', note: 'Có đậu nành. Nhãn ảnh đánh dấu lựa chọn 250 ml; cần kiểm tra lô thực tế.', alt: 'Chai thuỷ tinh tương Tamari Bảo An, nhãn thành phần đậu nành, nước muối và gạo.' },
      en: { name: 'Tamari sauce', subtitle: 'Fermented soy flavour for plant-based dishes', description: 'A liquid seasoning made with fermented soybeans. Use it as a dipping sauce or in braises and stir-fries, starting with a small amount.', unit: '250 ml bottle', ingredients: 'Photo label: soybeans, salted water and rice.', use: ['Mix a dipping sauce with lemon, ginger or other preferred seasonings.', 'Add to braised tofu, stir-fried vegetables or broth.'], storage: 'Close tightly and keep cool and dry; follow the manufacturer’s instructions after opening.', note: 'Contains soy. The photo label marks the 250 ml option; check the actual batch.', alt: 'A Bảo An glass Tamari bottle with a label listing soybeans, salted water and rice.' },
    },
  },
  {
    stock: 'unknown', keywords: { vi: ["tương cổ truyền", "trí túc", "tương đậu", "đậu nành", "nước chấm"], en: ["traditional soy sauce", "tri tuc", "fermented soybean", "condiment"] },
    slug: 'tuong-co-truyen', category: 'seasoning', price: 65000, image: photo('tuong-co-truyen'), width: 1000, height: 749,
    sources: [], priceBasis: 'Editorial demo proposal for a 500 ml fermented-soy condiment; no current matching supplier quote verified.',
    translations: {
      vi: { name: 'Tương cổ truyền', subtitle: 'Vị tương mộc mạc cho bữa cơm nhà', description: 'Chai tương cổ truyền 500 ml mang nhãn Trí Túc trong ảnh. Kết cấu có hạt đậu, phù hợp làm món chấm và gia vị cho bữa cơm chay.', unit: 'Chai 500 ml', ingredients: 'Theo nhãn ảnh: đậu nành, nếp, muối biển và một số nguyên liệu ngũ cốc; cần xác nhận danh sách đầy đủ.', use: ['Dùng lượng vừa đủ làm nước chấm rau củ.', 'Nêm các món kho chay; khuấy đều trước khi lấy tương.'], storage: 'Giữ kín và làm theo hướng dẫn bảo quản trên nhãn của lô hiện tại.', note: 'Có đậu nành. Giá là đề xuất demo, chưa có báo giá xác nhận.', alt: 'Chai tương cổ truyền Trí Túc 500 ml màu nâu vàng, chụp trên bàn ngoài vườn.' },
      en: { name: 'Traditional fermented soy sauce', subtitle: 'A rustic condiment for home cooking', description: 'A 500 ml bottle labelled Trí Túc traditional sauce. Its visible soybean texture suits vegetable dips and plant-based home meals.', unit: '500 ml bottle', ingredients: 'Photo label: soybeans, glutinous rice, sea salt and other grains; confirm the complete list.', use: ['Serve a suitable amount as a vegetable dip.', 'Use in plant-based braises; stir before serving.'], storage: 'Keep closed and follow the current package storage instructions.', note: 'Contains soy. This price is an editorial demo proposal without a confirmed quotation.', alt: 'A 500 ml Trí Túc traditional soy sauce bottle, photographed on a garden table.' },
    },
  },
  {
    stock: 'unknown', keywords: { vi: ["đậu phộng", "lạc", "hạt lạc", "đậu phộng sống", "sữa hạt", "bơ đậu phộng"], en: ["peanut", "peanuts", "raw peanuts", "groundnuts", "peanut butter"] },
    slug: 'dau-phong-song', category: 'pantry', price: 60000, image: photo('dau-phong-song'), width: 750, height: 1000,
    sources: ['https://thucduongbaoan.com.vn/sp/dau-phong/'], priceBasis: 'Supplier lists raw peanuts at 60,000 VND; photo label reads 500 g.',
    translations: {
      vi: { name: 'Đậu phộng sống', subtitle: 'Nguyên liệu cho nhiều món chay thân thuộc', description: 'Đậu phộng nguyên hạt chưa chế biến, đóng túi 500 g. Có thể rang, luộc hoặc dùng trong các công thức sữa hạt và sốt đậu phộng.', unit: 'Túi 500 g', ingredients: 'Theo nhãn ảnh: đậu phộng nguyên hạt.', use: ['Nấu chín trước khi ăn: rang hoặc luộc theo công thức phù hợp.', 'Dùng để làm sữa đậu phộng, bơ đậu phộng hoặc sốt cho món chay.'], storage: 'Giữ kín, khô và mát. Không dùng hạt có dấu hiệu mốc hoặc mùi bất thường.', note: 'Có đậu phộng. Sản phẩm sống cần được chế biến trước khi dùng.', alt: 'Túi đậu phộng sống Bảo An 500 g, hạt còn lớp vỏ lụa màu nâu nhạt.' },
      en: { name: 'Raw peanuts', subtitle: 'A familiar ingredient for plant-based recipes', description: 'Whole raw peanuts in a 500 g pouch. Roast, boil or use in peanut milk and sauce recipes.', unit: '500 g pouch', ingredients: 'Whole peanuts, according to the photo label.', use: ['Cook before eating: roast or boil using a suitable recipe.', 'Use for peanut milk, peanut butter or plant-based sauces.'], storage: 'Keep sealed, cool and dry. Do not use nuts showing mould or unusual odours.', note: 'Contains peanuts. This raw product needs cooking before use.', alt: 'A 500 g Bảo An raw peanut pouch with light-brown peanut skins visible.' },
    },
  },
];
