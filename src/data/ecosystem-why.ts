import type { Language } from './site';
import type { IconName } from '../components/AnimatedIcon.astro';

// "Vì sao là hệ sinh thái?" — helps visitors see why Hương Thiền Nature is built as an ecosystem and not as one
// uniform place. The comparison is the owner's own: a uniform model (one system, easy to manage, little diversity)
// against an ecosystem model (many layers and parts that interact and grow on a shared foundation), the way a
// layered forest garden works. The two panel texts reuse the owner's wording. Linux was only the owner's way of
// pointing at this likeness, so it is NOT named on the page.
// Shown on the Ecosystem page only (the Home page links there). Keep it short: the page has a word budget
// (tests/landing.test.mjs). Do not list Thân/Tâm/Trí here; the page already tells them once. No promises of results.
export interface EcosystemWhy {
  eyebrow: string;
  title: string;
  lead: string;
  single: { title: string; text: string };
  eco: { title: string; text: string };
  points: readonly { icon: IconName; title: string; text: string }[];
  care: string;
  figureLabel: string;
}

export const ecosystemWhy: Record<Language, EcosystemWhy> = {
  vi: {
    eyebrow: 'Vì sao là hệ sinh thái',
    title: 'Một vườn rừng nhiều tầng, thay vì một hàng cây đồng nhất',
    lead: 'Có hai cách làm một khu vườn: trồng thật đều cho gọn và dễ quản, hoặc để nhiều tầng cùng sống trên một mảnh đất, rễ nối rễ, mỗi loài một vai. Hương Thiền Nature chọn cách thứ hai, theo tinh thần vườn rừng đa tầng mà tụi mình đang học hỏi tại Farm Lê Lam Sơn.',
    single: { title: 'Mô hình đồng nhất', text: 'Một hệ thống thống nhất, dễ quản lý tập trung nhưng ít đa dạng.' },
    eco: { title: 'Mô hình hệ sinh thái', text: 'Nhiều tầng, nhiều thành phần, tương tác và phát triển dựa trên nền tảng chung.' },
    points: [
      { icon: 'home', title: 'Chung một nền', text: 'Nhiều tầng, nhưng cùng một nền: sống tỉnh thức, lành mạnh và phụng sự.' },
      { icon: 'path', title: 'Nhiều lối để thích nghi', text: 'Mỗi người đến từ một hoàn cảnh riêng, nên cần nhiều hướng để tìm đúng lối.' },
      { icon: 'sprout', title: 'Lan tỏa như hạt giống', text: 'Giá trị lan ra từ nhiều nơi cùng nảy mầm và bổ trợ nhau.' },
    ],
    care: 'Đa dạng không có nghĩa là không cần chăm sóc hay quản trị. Vườn rừng vẫn cần người giữ đất, tỉa tán; hệ sinh thái này cũng cần người chăm sóc để các tầng không lấn nhau và luôn giữ đúng tinh thần chung.',
    figureLabel: 'Hình minh họa chuyển động, hai nửa. Bên trái, mô hình đồng nhất: những cây giống hệt nhau, cùng một tầm cao, rễ không nối với nhau, hạt rơi xuống chỉ nằm lại dưới gốc. Bên phải, mô hình hệ sinh thái: nhiều tầng cây cao thấp khác nhau, rễ nối nhau bằng mạng sợi vàng chuyển dưỡng chất, ánh nắng len qua từng tầng, hạt giống bay xa và nảy mầm ở những nơi mới, có bướm bay quanh.',
  },
  en: {
    eyebrow: 'Why an ecosystem',
    title: 'A layered forest garden, not a row of identical trees',
    lead: 'There are two ways to make a garden: plant everything evenly, tidy and easy to manage, or let many layers share one patch of soil, roots reaching roots, each species holding its own role. Hương Thiền Nature takes the second way, in the spirit of the layered forest garden we are learning from at Lê Lam Sơn Farm.',
    single: { title: 'Uniform model', text: 'One unified system, easy to manage centrally, but with little diversity.' },
    eco: { title: 'Ecosystem model', text: 'Many layers and many parts that interact and grow on a shared foundation.' },
    points: [
      { icon: 'home', title: 'One shared ground', text: 'Many layers, one foundation: a mindful, healthy life of service.' },
      { icon: 'path', title: 'Many ways to adapt', text: 'Everyone arrives from a different place, so they need many ways to find their own.' },
      { icon: 'sprout', title: 'Spreading like seeds', text: 'Value spreads from many places sprouting and supporting each other.' },
    ],
    care: 'Variety does not mean no care or stewardship. A forest garden still needs people to tend the soil and prune the canopy; this ecosystem needs caretakers too, so the layers do not crowd each other and always keep to the shared spirit.',
    figureLabel: 'Animated illustration in two halves. On the left, the uniform model: identical trees at one height, roots that never meet, and a fallen seed that only stays beneath its trunk. On the right, the ecosystem model: trees of many heights in layers, roots joined by a network of golden threads carrying nourishment, sunlight reaching every layer, seeds flying far to sprout in new places, and a butterfly drifting by.',
  },
};
