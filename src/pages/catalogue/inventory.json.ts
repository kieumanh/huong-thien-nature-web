import { products, productCategories } from '../../data/products.ts';

export const GET = () => Response.json({
  version: 1,
  products: products.map(product => ({
    slug: product.slug,
    name: product.translations.vi.name,
    category: productCategories.find(category => category.id === product.category)!.vi,
    pack: product.translations.vi.unit,
    price: product.price,
    image: product.image,
  })),
});
