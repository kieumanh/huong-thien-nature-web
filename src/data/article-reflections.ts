import type { Language } from './site';

// Editorial extras for a few articles (2.16.0): a pull quote and "Một khoảng dừng" (a pause).
// Quotes are sentences taken verbatim from the article's own introduction; nothing is attributed to anyone else.
// A pause is a short invitation, never an assignment, and appears only where it fits.
// Add an entry by slug; leave an article out when it has no natural pause. Keep vi and en in step.
type Text = Record<Language, string>;
export type Reflection = { quote?: Text; pause?: Text[] };

export const articleReflections: Record<string, Reflection> = {
  'healing-as-coming-home': {
    quote: {
      vi: 'Có lẽ chữa lành không phải là trở thành một người khác, mà là thôi bỏ rơi người mình đang là.',
      en: 'It may mean no longer abandoning who I already am.',
    },
    pause: [{
      vi: 'Nếu không cần thay đổi bản thân ngay lúc này, bạn sẽ cảm thấy thế nào?',
      en: 'If you did not need to change yourself right now, how would that feel?',
    }],
  },
  'staying-with-strong-emotions': {
    quote: {
      vi: 'Điều làm mình khổ thường không phải bản thân cảm xúc, mà là những gì mình làm khi bị nó cuốn đi.',
      en: 'What hurts us is often not the feeling itself but what we do while it carries us away.',
    },
    pause: [{
      vi: 'Bạn có thể dành một hơi thở để lắng nghe chính mình không?',
      en: 'Could you spend one breath listening to yourself?',
    }],
  },
  'gentle-boundaries': {
    quote: {
      vi: 'Không phải để bạn bớt thương người, mà để tình thương của bạn có thể đi được đường dài.',
      en: 'This reflection is not about caring less, but about letting your care last.',
    },
    pause: [{
      vi: 'Hôm nay, có lời nhận lời nào bạn đã nói trước khi kịp hỏi lòng mình?',
      en: 'Today, was there a yes you said before you had asked your own heart?',
    }],
  },
  'walking-through-loss': {
    quote: {
      vi: 'Bài viết này không có lời giải. Nó chỉ mong ngồi cạnh bạn một lát, nếu bạn đang mang một nỗi nhớ.',
      en: 'This piece has no solution. It only hopes to sit beside you for a while.',
    },
    pause: [{
      vi: 'Có một nỗi nhớ nào đang ở cạnh bạn lúc này mà bạn chưa cho phép mình dừng lại với nó?',
      en: 'Is there a longing beside you right now that you have not yet let yourself pause with?',
    }],
  },
  'small-joys-gratitude': {
    quote: {
      vi: 'Không phủ nhận nỗi buồn, nhưng cũng không để nó che hết những điều tốt đẹp nhỏ bé vẫn đang có mặt.',
      en: 'One that does not deny sadness but does not let it hide the small good things still present.',
    },
    pause: [{
      vi: 'Điều nhỏ nào, ngay lúc này, đang âm thầm ở bên bạn?',
      en: 'What small thing is quietly beside you right now?',
    }],
  },
  'returning-attention': {
    quote: {
      vi: 'Giữa một buổi tập như thế, chính cái chợt nghe ấy là lúc mình quay về.',
      en: 'The moment of noticing is a place to begin again.',
    },
  },
  'meditation-for-beginners': {
    quote: {
      vi: 'Nếu đến hơi kế tiếp bạn đã nghĩ sang chuyện khác, mình vẫn còn chỗ để bắt đầu lại.',
      en: 'You do not have to wait for life to become quiet before meditating.',
    },
  },
  'wandering-mind': {
    quote: {
      vi: 'Khi nhận ra tiếng huyên náo ấy, mình có thể nghe lại một hơi thở. Việc mua rau vẫn đợi được.',
      en: 'Yet recognising that attention has wandered is an important part of the exercise.',
    },
    pause: [{
      vi: 'Bây giờ, suy nghĩ nào đang đứng đầu hàng chờ? Bạn có thể để nó đợi thêm một hơi thở.',
      en: 'Which thought is first in line right now? You may let it wait one more breath.',
    }],
  },
};
