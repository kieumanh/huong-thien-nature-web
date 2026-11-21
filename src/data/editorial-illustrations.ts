export const practicePhoto = {
  src: '/media/pixabay-1851165.webp',
  width: 880,
  height: 586,
  source: 'https://pixabay.com/photos/meditate-woman-yoga-zen-meditating-1851165/',
  alt: {
    vi: 'Một người ngồi thiền bên mép nước trong ánh nắng.',
    en: 'A person sits in meditation by the water in sunlight.',
  },
};

type Illustration = {
  afterSection: number;
  src: string;
  width: number;
  height: number;
  source: string;
  alt: string;
  caption: string;
};

// An extra reading pause for the five longest Vietnamese articles.
export const articleIllustrations: Record<string, Illustration> = {
  'when-meditation-is-difficult': {
    afterSection: 4,
    src: '/media/pixabay-2608830.webp', width: 880, height: 586,
    source: 'https://pixabay.com/photos/nature-water-river-stream-rocks-2608830/',
    alt: 'Nước chảy quanh những tảng đá trong một con suối giữa rừng.',
    caption: 'Tiếng động cũng có thể trở thành điểm tựa để nhận ra mình đang ở đâu.',
  },
  'meditation-habit': {
    afterSection: 4,
    src: '/media/pixabay-4048796.webp', width: 880, height: 586,
    source: 'https://pixabay.com/photos/notebook-pen-paper-write-page-4048796/',
    alt: 'Cuốn sổ mở bên cạnh bút chì và tách trà.',
    caption: 'Một dòng ghi lại điều mình thực sự nhận thấy đã đủ cho hôm nay.',
  },
  'everyday-mindfulness': {
    afterSection: 4,
    src: '/media/pixabay-1283215.webp', width: 880, height: 589,
    source: 'https://pixabay.com/photos/man-hands-tea-cups-pouring-1283215/',
    alt: 'Một người rót trà vào những chén nhỏ trên khay gỗ.',
    caption: 'Rót trà là dịp để biết tay mình đang làm gì và người trước mặt đang nói gì.',
  },
  'breath-meditation': {
    afterSection: 4,
    src: '/media/pixabay-58125.webp', width: 880, height: 586,
    source: 'https://pixabay.com/photos/water-rocks-stone-river-nature-58125/',
    alt: 'Gợn nước xanh lướt qua những hòn đá.',
    caption: 'Hơi thở có nhịp riêng. Ta có thể nhận ra nhịp ấy mà không cố điều khiển.',
  },
  'body-mindfulness': {
    afterSection: 3,
    src: '/media/pixabay-2268333.webp', width: 880, height: 585,
    source: 'https://pixabay.com/photos/foot-grass-fingers-barefoot-2268333/',
    alt: 'Bàn chân trần đặt trên cỏ.',
    caption: 'Khi đứng, có thể bắt đầu bằng cảm giác chân đang được mặt đất nâng đỡ.',
  },
};
