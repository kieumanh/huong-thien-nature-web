import type { Language } from './site';

// "Có thể bạn đang…" blocks (2.14.0): written from the point of view of someone on a healing journey.
// Each card names a real difficulty, says it is understandable, and offers one gentle next step.
// No promises of outcomes; crisis guidance is always shown.

export type EmpathyCard = { feeling: string; understanding: string; step: string; href: string };
export type EmpathyBlock = { eyebrow: string; title: string; intro: string; cards: EmpathyCard[]; closing: string; action?: { label: string; href: string }; care: string };

type Paths = { practice: string; contact: string; frequency: string; tarot: string; ecosystem: string; article: (slug: string) => string };

const careVi = 'Nếu bạn đang trải qua một giai đoạn quá sức hoặc có ý nghĩ làm hại bản thân, hãy tìm đến người thân, bác sĩ hoặc chuyên gia tâm lý ngay. Thiền và những gì tụi mình chia sẻ là người bạn đồng hành, không thay thế chăm sóc y tế.';
const careEn = 'If you are going through a period that feels like too much, or have thoughts of harming yourself, please reach out to someone close, a doctor or a mental health professional now. Meditation and what we share are companions on the way, not a replacement for medical care.';

export function homeEmpathy(lang: Language, p: Paths): EmpathyBlock & { promisesTitle: string; promises: { title: string; text: string }[] } {
  const vi = lang === 'vi';
  return {
    eyebrow: vi ? 'Nếu đây là lần đầu bạn ghé' : 'If this is your first visit',
    title: vi ? 'Bạn không cần phải ổn rồi mới bắt đầu' : 'You don’t need to be okay before you begin',
    intro: vi
      ? 'Nhiều người tìm đến thiền khi trong lòng có một điều chưa gọi được tên: một nỗi mệt kéo dài, một câu hỏi về ý nghĩa, hay chỉ là mong được thở chậm lại. Đây là vài điều tụi mình hay được nghe kể. Nếu bạn thấy mình trong đó, có một lối nhỏ để bắt đầu.'
      : 'Many people come to meditation carrying something they cannot yet name: a tiredness that lingers, a question about meaning, or simply a wish to breathe more slowly. These are things we often hear. If you see yourself here, there is a small way to begin.',
    cards: vi ? [
      { feeling: 'Mệt, mà không rõ mình mệt vì đâu.', understanding: 'Ngủ đủ vẫn thấy nặng, nghỉ rồi vẫn chưa nhẹ. Có khi cái mỏi nằm ở chỗ mình đã gồng quá lâu mà chưa ai hỏi han.', step: 'Thử một phút dừng lại', href: p.practice },
      { feeling: 'Đầu óc không chịu tắt, kể cả lúc nằm xuống.', understanding: 'Tâm hay chạy không có nghĩa là bạn thiền sai hay sống sai. Nó chỉ đang cố lo cho bạn, theo cách nó biết.', step: 'Khi tâm cứ nghĩ mãi', href: p.article('wandering-mind') },
      { feeling: 'Đã đọc nhiều, thử nhiều, mà vẫn thấy xa chính mình.', understanding: 'Không phải bạn làm sai. Có khi điều còn thiếu không phải thêm một phương pháp, mà là một nhịp đều đặn, vừa sức, có người đi cùng.', step: 'Xem khóa Tần Số Vàng', href: p.frequency },
      { feeling: 'Muốn thương mình, mà chưa biết bắt đầu từ đâu.', understanding: 'Nhiều người tử tế với cả thế giới nhưng lại khắt khe nhất với chính mình. Học cách làm bạn với mình là một kỹ năng, tập được.', step: 'Chữa lành là trở về', href: p.article('healing-as-coming-home') },
      { feeling: 'Đứng trước một ngã rẽ, chưa biết nên đi hướng nào.', understanding: 'Đôi khi mình không cần ai quyết định thay, chỉ cần một người lắng nghe để nghe rõ điều lòng mình đã biết.', step: 'Một buổi Tarot lắng nghe', href: p.tarot },
      { feeling: 'Chỉ muốn sống chậm hơn, gần đất và cây hơn.', understanding: 'Mong muốn ấy không phải trốn chạy. Nó là tiếng gọi rất tự nhiên của cơ thể muốn được trở về với nhịp của đất trời.', step: 'Thiền khi làm vườn', href: p.article('mindful-gardening') },
    ] : [
      { feeling: 'Tired, without knowing why.', understanding: 'Enough sleep still feels heavy, and rest does not lighten it. Sometimes the tiredness comes from holding on for a long time with no one asking how you are.', step: 'Try a one-minute pause', href: p.practice },
      { feeling: 'A mind that will not switch off, even in bed.', understanding: 'A busy mind does not mean you meditate or live wrongly. It is trying to look after you in the only way it knows.', step: 'When the mind keeps wandering', href: p.article('wandering-mind') },
      { feeling: 'You have read and tried so much, yet still feel far from yourself.', understanding: 'You have not done it wrong. What is missing may not be another method, but a steady, manageable rhythm with someone walking beside you.', step: 'See The Golden Frequency', href: p.frequency },
      { feeling: 'Wanting to be kind to yourself, not knowing how.', understanding: 'Many people are kind to the whole world and harshest with themselves. Befriending yourself is a skill that can be practised.', step: 'Healing as coming home', href: p.article('healing-as-coming-home') },
      { feeling: 'Standing at a crossroads, unsure which way to go.', understanding: 'Sometimes you do not need anyone to decide for you, only someone to listen so you can hear what your heart already knows.', step: 'A listening tarot session', href: p.tarot },
      { feeling: 'Simply wanting to live more slowly, closer to soil and trees.', understanding: 'This is not running away. It is a natural call of the body to return to the rhythm of the earth.', step: 'Meditation while gardening', href: p.article('mindful-gardening') },
    ],
    promisesTitle: vi ? 'Điều bạn có thể mong ở đây' : 'What you can expect here',
    promises: vi ? [
      { title: 'Đi theo nhịp của bạn', text: 'Không có lịch trình bắt buộc, không ai so sánh bạn với người khác. Ba phút một ngày cũng là thực hành.' },
      { title: 'Những bước nhỏ, thật và làm được', text: 'Tụi mình không hứa phép màu hay chữa khỏi bệnh. Chỉ có những thực tập giản dị bạn có thể thử trong đời thường.' },
      { title: 'Có người lắng nghe khi bạn cần', text: 'Bạn có thể nhắn hỏi bất cứ điều gì, không cần đăng ký khóa nào. Câu chuyện của bạn được giữ kín.' },
    ] : [
      { title: 'Your own pace', text: 'No compulsory schedule and no comparing you with anyone. Three minutes a day is practice too.' },
      { title: 'Small, real, doable steps', text: 'We do not promise miracles or cures. Only simple practices you can try in everyday life.' },
      { title: 'Someone to listen when you need it', text: 'You can ask us anything without signing up for a course. Your story stays private.' },
    ],
    closing: vi ? 'Dù hôm nay bạn đến với một nỗi mệt, một câu hỏi hay chỉ chút tò mò, ở đây luôn có chỗ để bạn ngồi xuống, thở chậm lại và nghe lòng mình.' : 'Whether you arrive today with tiredness, a question or simple curiosity, there is always a place here to sit down, breathe more slowly and listen to yourself.',
    action: { label: vi ? 'Gửi cho tụi mình vài dòng' : 'Send us a few lines', href: p.contact },
    care: vi ? careVi : careEn,
  };
}

export function frequencyEmpathy(lang: Language): EmpathyBlock {
  const vi = lang === 'vi';
  return {
    eyebrow: vi ? 'Tụi mình hiểu' : 'We understand',
    title: vi ? 'Có thể bạn đang ở đây vì…' : 'Perhaps you are here because…',
    intro: vi
      ? 'Người tìm đến Tần Số Vàng thường không thiếu hiểu biết. Điều họ thiếu là một nhịp đều đặn và một người đi cùng đủ lâu để những điều đã biết trở thành cách sống. Nếu bạn thấy mình trong vài dòng dưới đây, khóa học có một phần dành riêng cho điều đó.'
      : 'People who come to The Golden Frequency rarely lack knowledge. What they miss is a steady rhythm and someone walking beside them long enough for what they know to become a way of living. If you see yourself below, the course has a part for exactly that.',
    cards: vi ? [
      { feeling: 'Cảm xúc lên xuống thất thường; một câu nói cũng đủ làm cả ngày chùng xuống.', understanding: 'Không phải bạn yếu đuối. Khi mệt và căng thẳng lâu ngày, mình dễ bị chạm hơn. Bước đầu là nhận ra mình đang ở trạng thái nào.', step: 'Chặng 1: nhận ra trạng thái của mình', href: '#frequencies' },
      { feeling: 'Biết nhiều về thiền, nhưng không giữ được thói quen quá vài ngày.', understanding: 'Ý chí hiếm khi là vấn đề. Thường là nhịp mình đặt ra quá lớn so với một ngày bình thường.', step: 'Bài tập 7 ngày, 10–20 phút mỗi ngày', href: '#weekly' },
      { feeling: 'Sống giữa nhiều kỳ vọng, quên mất mình thật sự muốn gì.', understanding: 'Khi lo cho mọi người quá lâu, mình dễ mất liên lạc với chính mình. Nhìn lại từng phần đời sống là cách nối lại.', step: 'Bài tự định vị bốn lĩnh vực', href: '#self-check' },
      { feeling: 'Hay mang nỗi buồn, sự căng thẳng của người khác về nhà.', understanding: 'Người nhạy cảm thường thương người rất sâu. Điều cần học không phải là bớt thương, mà là biết giữ cho mình vững.', step: 'Nâng – Giữ – Cải thiện', href: '#methods' },
      { feeling: 'Thực hành một mình thấy cô đơn, dễ bỏ cuộc.', understanding: 'Ai cũng có ngày muốn buông. Có người hỏi han và những người cùng đi khiến con đường bớt dài.', step: 'Người hỗ trợ và lớp học hằng tháng', href: '#support' },
      { feeling: 'Đã thử nhiều phương pháp tâm linh, giờ dè dặt với những lời hứa lớn.', understanding: 'Sự dè dặt ấy là lành mạnh. Khóa học nói rõ “tần số” là ẩn dụ chiêm nghiệm, không hứa tiền bạc hay chữa bệnh.', step: 'Đọc phần nói thật về khoa học', href: '#scientists' },
    ] : [
      { feeling: 'Your moods swing; a single remark can bring the whole day down.', understanding: 'This is not weakness. When we are tired and stressed for a long time, we are touched more easily. The first step is noticing which state you are in.', step: 'Stage 1: recognising your state', href: '#frequencies' },
      { feeling: 'You know a lot about meditation but cannot keep a habit beyond a few days.', understanding: 'Willpower is rarely the problem. Usually the rhythm we set is too big for an ordinary day.', step: 'The 7-day plan, 10–20 minutes a day', href: '#weekly' },
      { feeling: 'Living among expectations, you have forgotten what you truly want.', understanding: 'Caring for everyone for a long time can cut us off from ourselves. Looking at each area of life is a way to reconnect.', step: 'The four-area self-check', href: '#self-check' },
      { feeling: 'You often bring other people’s sadness and tension home.', understanding: 'Sensitive people care deeply. The lesson is not to care less but to stay steady.', step: 'Lift – Hold – Improve', href: '#methods' },
      { feeling: 'Practising alone feels lonely and it is easy to give up.', understanding: 'Everyone has days of wanting to stop. Someone who checks in and others on the same path make the road shorter.', step: 'Support and the monthly class', href: '#support' },
      { feeling: 'You have tried many spiritual methods and are wary of big promises.', understanding: 'That wariness is healthy. The course states that “frequency” is a contemplative metaphor and promises neither money nor cures.', step: 'Read the honest note on science', href: '#scientists' },
    ],
    closing: vi ? 'Nếu bạn thấy mình trong vài dòng trên, có lẽ điều bạn cần không phải cố gắng thêm, mà là một lộ trình vừa sức và một người hỏi han. Bạn có thể nhắn hỏi trước, chưa cần đăng ký.' : 'If you recognised yourself above, perhaps what you need is not more effort, but a manageable path and someone who checks in. You can ask first, without signing up.',
    action: { label: vi ? 'Nhắn hỏi trước, chưa cần đăng ký' : 'Ask first, no sign-up needed', href: '#howto' },
    care: vi ? careVi : careEn,
  };
}

export function tarotEmpathy(lang: Language): EmpathyBlock {
  const vi = lang === 'vi';
  return {
    eyebrow: vi ? 'Tụi mình hiểu' : 'We understand',
    title: vi ? 'Những lúc bạn có thể cần một buổi lắng nghe' : 'Times when a listening session may help',
    intro: vi
      ? 'Người tìm đến buổi Tarot 1:1 hiếm khi chỉ muốn biết “chuyện gì sẽ xảy ra”. Thường là họ đang mang một điều khó nói, và mong có một không gian an toàn để nghe chính mình rõ hơn.'
      : 'People who book a 1:1 tarot session rarely just want to know “what will happen”. More often they carry something hard to say and hope for a safe space to hear themselves more clearly.',
    cards: vi ? [
      { feeling: 'Rối giữa nhiều lựa chọn, nghĩ mãi vẫn quay về chỗ cũ.', understanding: 'Khi suy nghĩ chỉ chạy trong đầu, nó dễ thành vòng lặp. Nói ra thành lời giúp mình thấy rõ từng phía.', step: 'Một buổi gặp diễn ra thế nào', href: '#session' },
      { feeling: 'Một mối quan hệ làm bạn mệt, mà không biết kể với ai.', understanding: 'Câu chuyện của bạn được giữ kín, và bạn chọn kể đến đâu. Không ai phán xét bạn ở đây.', step: 'Lắng nghe bởi một con người', href: '#human-guidance' },
      { feeling: 'Mất phương hướng sau một biến cố: chia tay, mất việc, mất người thân.', understanding: 'Buổi trò chuyện không vội đưa lời khuyên. Trước hết là thừa nhận điều bạn đang trải qua là thật và khó.', step: 'Những câu hỏi thường gặp', href: '#faq' },
      { feeling: 'Muốn hiểu mình hơn nhưng ngại tâm sự với người quen.', understanding: 'Đôi khi một người ngoài, lắng nghe không vội, lại giúp mình nói được những điều chưa từng nói.', step: 'Gặp người đồng hành', href: '#reflection' },
      { feeling: 'Từng xem bói và thấy bất an hơn sau đó.', understanding: 'Ở đây tarot không dùng để phán số phận. Không có lời đoán gây sợ; lá bài chỉ là điểm tựa để chiêm nghiệm, quyết định luôn là của bạn.', step: 'So sánh hai khóa', href: '#compare' },
    ] : [
      { feeling: 'Torn between choices, thinking in circles.', understanding: 'Thoughts that stay in the head easily loop. Putting them into words helps you see each side.', step: 'How a session works', href: '#session' },
      { feeling: 'A relationship is wearing you out and you have no one to tell.', understanding: 'Your story stays private and you choose how much to share. No one judges you here.', step: 'Listened to by a person', href: '#human-guidance' },
      { feeling: 'Lost after a change: a break-up, a lost job, a death.', understanding: 'The conversation does not rush to advise. First it acknowledges that what you are going through is real and hard.', step: 'Common questions', href: '#faq' },
      { feeling: 'Wanting to understand yourself but hesitant to confide in people you know.', understanding: 'Sometimes an outsider who listens without hurry helps you say what you have never said.', step: 'Meet your companion', href: '#reflection' },
      { feeling: 'You once had a fortune reading and felt more anxious afterwards.', understanding: 'Here tarot is not used to pronounce fate. There are no frightening predictions; cards are a support for reflection and decisions stay yours.', step: 'Compare the two courses', href: '#compare' },
    ],
    closing: vi ? 'Bạn không cần chuẩn bị gì đặc biệt. Chỉ cần mang theo điều đang ở trong lòng, và sự cởi mở để lắng nghe chính mình.' : 'You do not need to prepare anything special. Bring what is on your heart and an openness to listen to yourself.',
    action: { label: vi ? 'Đặt một buổi trò chuyện' : 'Book a conversation', href: '#booking' },
    care: vi ? careVi.replace('Thiền và những gì tụi mình chia sẻ là người bạn đồng hành', 'Buổi Tarot là không gian chiêm nghiệm') : careEn.replace('Meditation and what we share are companions on the way', 'A tarot session is a space for reflection'),
  };
}
