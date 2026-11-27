import type { Language } from './site';
import type { IconName } from '../components/AnimatedIcon.astro';

// "Vì sao là hệ sinh thái?" — the Linux comparison, written to help visitors see why the project grows as an
// ecosystem and not as one single place. Shown on the Ecosystem page only (the Home page links there).
// Keep it short: the Ecosystem page is a landing page with a word budget (tests/landing.test.mjs).
// Do not list Thân/Tâm/Trí here; the page already tells them once. Only claim what is generally known about Linux.
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
    title: 'Một vườn nhiều tầng, thay vì một cái cây đơn lẻ',
    lead: 'Linux là phần mềm mã nguồn mở: không một người hay một công ty nào giữ trọn nó. Nhiều cộng đồng cùng xây trên một nền chung, mỗi nơi mang nó đi theo cách riêng. Tụi mình muốn Hương Thiền Nature lớn lên như vậy.',
    single: { title: 'Một cây đơn lẻ', text: 'Gọn gàng, dễ nắm giữ, nhưng chỉ đi xa bằng sức của một nơi.' },
    eco: { title: 'Một hệ sinh thái', text: 'Nhiều tầng, nhiều giống loài, chung một mảnh đất. Rễ nối nhau, hạt giống bay xa.' },
    points: [
      { icon: 'home', title: 'Chung một nền', text: 'Mỗi nơi tự do làm theo cách riêng, cùng đứng trên một nền giá trị.' },
      { icon: 'hands', title: 'Mỗi nơi một vai', text: 'Không ai phải làm tất cả. Mỗi bạn đồng hành giữ phần mình giỏi nhất.' },
      { icon: 'sprout', title: 'Lan tỏa như hạt giống', text: 'Giá trị đi xa nhờ nhiều nơi cùng nảy mầm, không nhờ một nơi lớn lên.' },
    ],
    care: 'Đa dạng không có nghĩa là buông lỏng. Như Linux vẫn cần người giữ gìn phần cốt lõi, hệ sinh thái này cũng cần người chăm sóc để mỗi nơi giữ đúng tinh thần chung.',
    figureLabel: 'Hình minh họa chuyển động: bên trái, một cây đứng một mình, hạt giống chỉ rơi gần gốc. Bên phải, nhiều cây cao thấp khác nhau có rễ nối nhau, dinh dưỡng chảy giữa các rễ và hạt giống bay xa nảy mầm ở những nơi mới.',
  },
  en: {
    eyebrow: 'Why an ecosystem',
    title: 'A layered garden, not a single lone tree',
    lead: 'Linux is open-source software: no single person or company holds all of it. Many communities build on one shared foundation, each taking it forward in its own way. We want Hương Thiền Nature to grow like that.',
    single: { title: 'A single tree', text: 'Tidy and easy to hold on to, but it only travels as far as one place can carry it.' },
    eco: { title: 'An ecosystem', text: 'Many layers, many species, one shared soil. Roots connect, and seeds travel far.' },
    points: [
      { icon: 'home', title: 'One shared ground', text: 'Each place is free to work in its own way, yet all stand on the same values.' },
      { icon: 'hands', title: 'A role for every place', text: 'No one has to do everything. Each companion keeps the part they do best.' },
      { icon: 'sprout', title: 'Spreading like seeds', text: 'Value travels not because one place grows tall, but because many places sprout.' },
    ],
    care: 'Variety does not mean letting go. As Linux still needs people who look after its core, this ecosystem needs caretakers so every place keeps to the shared spirit.',
    figureLabel: 'Animated illustration: on the left, one tree stands alone and its seed only falls near its trunk. On the right, several trees of different heights have connected roots, nourishment flows between them, and seeds fly far and sprout in new places.',
  },
};
