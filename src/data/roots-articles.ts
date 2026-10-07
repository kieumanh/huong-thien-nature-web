import type { Article, ArticleTranslation } from './articles';

export const manuscriptSource = {
  title: 'Thiền Tinh Hoa: Bản Đồ Khởi Hành',
};

const beginnerGuide = { title: 'NHS — How to meditate for beginners', url: 'https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/how-to-meditate-for-beginners/' };
const postureGuide = { title: 'NHS — MBSR exercises', url: 'https://www.guysandstthomas.nhs.uk/health-information/mindfulness-based-stress-reduction-mbsr/mbsr-exercises' };
const safetyGuide = { title: 'NCCIH — Meditation and mindfulness: effectiveness and safety', url: 'https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety' };

function entry(
  id: string, slug: string, viSlug: string, pillar: string, image: string,
  keywords: [string, string], relatedSlugs: string[],
  vi: ArticleTranslation, en: ArticleTranslation,
  sources = [manuscriptSource],
): Article {
  const words = [vi.introduction, ...vi.sections.flatMap(s => s.paragraphs), ...vi.practice.steps].join(' ').split(/\s+/).length;
  return { id, slug, viSlug, pillar, image: `/media/roots-${image}.webp`,
    minutes: Math.max(3, Math.ceil(words / 180)), phase: 'roots', level: 'beginner',
    publishedAt: '2026-10-07', updatedAt: '2026-10-07',
    keywords: { vi: keywords[0], en: keywords[1] }, relatedSlugs, sources,
    translations: { vi, en } };
}

export const rootsArticles: Article[] = [
  entry('A01', 'meditation-for-beginners', 'thien-cho-nguoi-moi-bat-dau', 'beginning', 'beginning',
    ['thiền cho người mới bắt đầu', 'meditation for beginners'], ['start-meditating-at-home', 'breath-meditation', 'wandering-mind'], {
      category: 'Bắt đầu với thiền', title: 'Thiền cho người mới bắt đầu: Hiểu đúng và bắt đầu thực hành',
      description: 'Bắt đầu tập thiền bằng một điểm tựa đơn giản, thời lượng vừa sức và cách nhẹ nhàng quay về khi tâm phân tán.',
      imageAlt: 'Minh họa màu nước: đệm thiền trên hiên vườn với nắng sớm và tre xanh.',
      introduction: 'Bạn không cần chờ đến khi đời sống hết bận mới tập thiền. Cũng không cần trở thành một người ít suy nghĩ trước khi ngồi xuống. Khởi đầu có thể giản dị: dành vài phút để biết mình đang ở đây, nhận ra sự chú ý đi đâu và tập quay về một cách tử tế.',
      sections: [
        { title: 'Thiền bắt đầu từ việc nhận biết', paragraphs: [
          'Trong cách tiếp cận của Hương Thiền Nature, thiền là thực tập chú ý và quan sát trải nghiệm đang diễn ra. Hơi thở, sự tiếp xúc của bàn chân hoặc âm thanh gần bạn đều có thể làm điểm tựa. Ta tập biết điều đang xảy ra, thay vì cố tạo một khoảng trống hoàn hảo trong đầu.',
          'Bản thảo Thiền Tinh Hoa dùng hình ảnh mặt hồ: càng sốt ruột khua nước cho trong, bùn càng nổi. Hình ảnh này nhắc ta bớt cưỡng ép. Nó là một ẩn dụ để học cách thực hành, không phải lời hứa rằng chỉ cần ngồi im thì mọi khó khăn sẽ biến mất.',
        ] },
        { title: 'Một buổi tập đầu tiên cần những gì?', paragraphs: [
          'Chọn một chỗ ngồi ổn định, một khoảng thời gian ít bị gián đoạn và một điểm tựa dễ nhận biết. Bạn có thể bắt đầu với ba phút như một thử nghiệm vừa sức, rồi điều chỉnh theo trải nghiệm. Ghế thường cũng được; bồ đoàn đẹp không phải vé vào cửa của sự tỉnh thức.',
          'Trong buổi tập, nhận biết hơi thở tự nhiên. Khi thấy mình đang nghĩ về việc khác, thầm ghi nhận “đang nghĩ” rồi trở lại. Không cần đếm số lần đi lạc. Một lần nhận ra và quay về đã là một lần thực hành.',
        ] },
        { title: 'Đọc theo nhu cầu, rồi dành chỗ cho thực hành', paragraphs: [
          'Nếu chưa biết chuẩn bị, đọc bài bắt đầu tập thiền tại nhà. Nếu muốn thực hành ngay, chọn hướng dẫn thiền hơi thở. Nếu suy nghĩ liên tục xuất hiện, bài về tâm phân tán sẽ giúp bạn hiểu thao tác quay về rõ hơn. Khối đọc tiếp bên dưới sắp theo thứ tự ấy.',
          'Sau một buổi tập, hãy hỏi: mình đã nhận biết được điều gì? Một vai đang gồng, tiếng chim hay một ý nghĩ lặp lại đều là trải nghiệm có thể học từ đó. Không cần đánh giá buổi tập bằng độ yên lặng hoặc so sánh với người khác.',
        ] },
      ],
      practice: { title: 'Buổi khởi đầu ba phút', steps: ['Ngồi thoải mái, nhận biết nơi cơ thể đang được nâng đỡ.', 'Chọn hơi thở hoặc âm thanh gần bạn làm điểm tựa.', 'Khi phân tâm, nhận ra rồi nhẹ nhàng quay lại.', 'Kết thúc bằng việc nhìn quanh và ghi một câu về trải nghiệm.'] },
      note: 'Đây là hướng dẫn nhập môn được biên tập từ bản thảo, không phải cam kết về kết quả. Bạn có thể mở mắt, đổi điểm tựa hoặc kết thúc sớm.',
      cta: { label: 'Chuẩn bị buổi thiền đầu tiên', slug: 'start-meditating-at-home' },
    }, {
      category: 'Getting started', title: 'Meditation for Beginners: Understand the Basics and Start Practicing',
      description: 'Start meditating with a simple anchor, a manageable session and a kind way to return when attention wanders.',
      imageAlt: 'Watercolor illustration of a meditation cushion on a sunny garden veranda beside bamboo.',
      introduction: 'You do not have to wait for life to become quiet before meditating. Nor do you need to stop having thoughts before sitting down. Begin by taking a few minutes to notice where you are, discover where attention goes and practise returning with kindness.',
      sections: [
        { title: 'Begin with noticing', paragraphs: ['At Hương Thiền Nature, we approach meditation as a practice of attention and observation. Breathing, the contact of your feet or nearby sounds can offer an anchor. The task is to notice experience, rather than produce a perfectly empty mind.', 'Thiền Tinh Hoa uses the image of a pond: stirring the water to make it clear brings up more mud. This is a reminder to soften unnecessary effort, not a promise that sitting still will resolve every difficulty.'] },
        { title: 'What do you need for your first session?', paragraphs: ['Choose a stable seat, a time with fewer interruptions and an anchor you can easily notice. Three minutes can be a manageable experiment; adjust from there. An ordinary chair is enough. A beautiful cushion is not an entrance ticket to awareness.', 'Notice natural breathing. When you discover that you are thinking about something else, gently acknowledge “thinking” and return. There is no need to count your distractions. One moment of noticing and returning is already practice.'] },
        { title: 'Read what you need, then make room to practise', paragraphs: ['For preparation, read the guide to starting at home. To practise now, choose the breath meditation guide. If thoughts keep appearing, explore the article on a wandering mind. The reading links below follow this sequence.', 'Afterwards, ask what you noticed: a tense shoulder, a bird call or a familiar thought. These are experiences to learn from. You do not need to score the session by how quiet you became or compare yourself with someone else.'] },
      ],
      practice: { title: 'A three-minute beginning', steps: ['Sit comfortably and feel the support beneath you.', 'Choose the breath or nearby sounds as an anchor.', 'Notice distraction and gently return.', 'Look around to finish, then write one sentence about the experience.'] },
      note: 'This beginner guide adapts the manuscript without promising a particular outcome. Open your eyes, change your anchor or finish early if needed.',
      cta: { label: 'Prepare your first session', slug: 'start-meditating-at-home' },
    }),

  entry('B01', 'breath-meditation', 'thien-hoi-tho-cho-nguoi-moi', 'breathing', 'breath',
    ['thiền hơi thở', 'breath meditation'], ['natural-breathing', 'wandering-mind', 'body-mindfulness'], {
      category: 'Thiền hơi thở', title: 'Thiền hơi thở cho người mới: Hướng dẫn thực hành từng bước',
      description: 'Một buổi thiền hơi thở ngắn: ổn định tư thế, nhận biết nhịp thở tự nhiên và quay về khi sự chú ý đi xa.',
      imageAlt: 'Minh họa màu nước: người ngồi trên ghế bên hồ vườn, nhìn từ phía sau.',
      introduction: 'Hơi thở không đòi ta phải tìm ở đâu xa. Nó đang diễn ra giữa những việc thường ngày. Bài thực hành này dùng cảm giác thở làm điểm tựa để rèn sự chú ý, theo tinh thần gần gũi của Thiền Tinh Hoa, không yêu cầu hoàn thành cả một hệ thống kỹ thuật trong buổi đầu.',
      sections: [
        { title: 'Ổn định trước khi chú ý', paragraphs: ['Ngồi trên ghế hoặc đệm ở tư thế bạn có thể duy trì thoải mái. Để hai tay nghỉ, nới lỏng vai và nhận biết chỗ cơ thể chạm vào ghế hoặc mặt đất. Mắt có thể mở nhẹ. Bạn không phải bất động để thực hành đúng.', 'Trước khi bắt đầu, chọn thời lượng ngắn, chẳng hạn ba đến năm phút như một thử nghiệm. Dùng báo giờ nhẹ nếu tiện. Hãy để khoảng thời gian ấy là một lời hẹn với mình, không phải cuộc thi chịu đựng.'] },
        { title: 'Chọn một nơi để cảm nhận hơi thở', paragraphs: ['Bạn có thể nhận biết không khí ở mũi hoặc chuyển động của bụng. Chọn nơi dễ cảm nhận, không cần di chuyển sự chú ý liên tục qua nhiều vị trí. Biết một hơi vào, rồi một hơi ra, bằng cảm giác đang có thay vì tưởng tượng đường đi của khí.', 'Để hơi thở diễn ra tự nhiên. Không cần kéo dài, nín thở hoặc cố làm nó thật sâu. Nếu không nhận ra hơi thở rõ, thử cảm giác hai bàn chân đang tiếp xúc với mặt đất hoặc âm thanh trong phòng.'] },
        { title: 'Khi tâm đi xa, thực hành bắt đầu lại', paragraphs: ['Một kế hoạch, ký ức hay cuộc đối thoại có thể kéo bạn đi. Khi nhận ra, ghi nhận ngắn: “đang nghĩ”. Sau đó quay lại điểm tựa. Bạn không cần giải quyết nội dung suy nghĩ ngay trong buổi tập, cũng không cần đánh nhau với nó.', 'Có thể sự chú ý quay lại rồi lập tức đi xa. Ta tập chính thao tác nhận ra và trở về, nhiều lần như vậy. Con trâu trong câu chuyện có thể khá năng động; người dắt trâu vẫn có thể kiên nhẫn.'] },
        { title: 'Kết thúc có chủ ý', paragraphs: ['Khi hết thời gian, mở rộng sự chú ý tới cơ thể, âm thanh và căn phòng. Nhìn quanh, cử động nhẹ rồi tiếp tục sinh hoạt. Dành một nhịp chuyển tiếp thay vì bật dậy ngay vì chuông báo.', 'Bạn có thể ghi một câu: điểm tựa nào dễ nhận biết, lúc nào mình gồng hoặc điều gì khiến mình phân tâm. Ghi chép giúp điều chỉnh buổi sau, không dùng để xếp hạng mức độ thiền.'] },
      ],
      practice: { title: 'Thực hành cùng một hơi vào, một hơi ra', steps: ['Cảm nhận chỗ ngồi và thả tay nghỉ.', 'Nhận biết một hơi vào và một hơi ra tự nhiên.', 'Nếu phân tâm, ghi nhận rồi trở về cảm giác thở.', 'Tiếp tục trong thời lượng đã chọn, rồi nhìn quanh để kết thúc.'] },
      note: 'Bài này là hướng dẫn hơi thở nhập môn, không thay thế toàn bộ 16 bước Anapanasati. Thay điểm tựa hoặc dừng nếu chú ý vào hơi thở khiến bạn khó chịu.',
      cta: { label: 'Hiểu cách quan sát hơi thở tự nhiên', slug: 'natural-breathing' },
    }, {
      category: 'Breath meditation', title: 'Breath Meditation for Beginners: A Step-by-Step Guide',
      description: 'Try a short breath meditation: settle into a comfortable posture, notice natural breathing and return when attention wanders.',
      imageAlt: 'Watercolor illustration of a person sitting on a chair beside a garden pond, seen from behind.',
      introduction: 'The breath is available in the middle of everyday life. This practice uses breathing sensations as an anchor for attention, in the accessible spirit of Thiền Tinh Hoa. You do not have to master a complete system of techniques during your first session.',
      sections: [
        { title: 'Settle before focusing', paragraphs: ['Sit on a chair or cushion in a position you can maintain comfortably. Rest your hands, soften your shoulders and notice the contact beneath you. Your eyes may stay gently open. Practising does not require complete immobility.', 'Choose a short session, perhaps three to five minutes as an experiment. Set a gentle timer if useful. Treat this as an appointment with yourself rather than an endurance contest.'] },
        { title: 'Find one place to feel breathing', paragraphs: ['Notice air at the nose or movement around the belly. Choose an accessible place instead of moving attention constantly between locations. Feel one breath in and one breath out, without imagining an invisible pathway.', 'Let breathing happen naturally. There is no need to lengthen it, hold it or make it especially deep. If breathing sensations are unclear, use the contact of your feet or sounds in the room.'] },
        { title: 'When the mind wanders, begin again', paragraphs: ['A plan, memory or conversation may draw you away. When you notice, briefly acknowledge “thinking”, then return to your anchor. You need not solve the thought or fight it during the session.', 'Attention may return and immediately wander again. Practise this movement of noticing and returning. The buffalo in the manuscript may be energetic; its keeper can still be patient.'] },
        { title: 'Finish deliberately', paragraphs: ['At the end, widen attention to your body, sounds and surroundings. Look around and move gently before returning to your day. Allow a transition instead of leaping up at the timer.', 'Write one sentence about your anchor, any tension or what distracted you. Use the note to adjust your next session, not to grade your meditation.'] },
      ],
      practice: { title: 'One breath in, one breath out', steps: ['Feel your seat and let your hands rest.', 'Notice one natural inhalation and exhalation.', 'Acknowledge distraction, then return to breathing sensations.', 'Continue for your chosen time, then look around to finish.'] },
      note: 'This introductory exercise does not represent the full sixteen steps of Anapanasati. Change your anchor or stop if focusing on the breath feels uncomfortable.',
      cta: { label: 'Explore natural breathing', slug: 'natural-breathing' },
    }),

  entry('A03', 'start-meditating-at-home', 'bat-dau-tap-thien-tai-nha', 'beginning', 'posture',
    ['tập thiền tại nhà', 'how to meditate at home'], ['breath-meditation', 'meditation-posture', 'meditation-habit'], {
      category: 'Bắt đầu với thiền', title: 'Bắt đầu tập thiền tại nhà: Chuẩn bị cho buổi đầu tiên',
      description: 'Chuẩn bị chỗ ngồi, thời gian và điểm tựa cho buổi thiền đầu tại nhà, bằng những vật dụng bạn đã có.',
      imageAlt: 'Minh họa màu nước: ghế gỗ và đệm thiền trên hiên vườn râm mát.',
      introduction: 'Một góc nhà bình thường có thể là nơi bắt đầu. Không cần sửa phòng, mua đủ dụng cụ hay chờ mọi người cùng đồng ý với sở thích mới của mình. Điều hữu ích hơn là tạo một khoảng thực hành vừa sức và biết mình sẽ làm gì trong khoảng ấy.',
      sections: [
        { title: 'Chọn chỗ ngồi đủ thuận tiện', paragraphs: ['Tìm nơi bạn không phải liên tục nhường lối hoặc đề phòng vật rơi. Có thể là ghế cạnh cửa sổ, một góc phòng hoặc hiên nhà. Bạn không cần loại bỏ mọi tiếng động; chỉ cần một điều kiện tương đối ổn định để bắt đầu.', 'Một chiếc ghế vững và tư thế thoải mái, tương đối thẳng, là lựa chọn phù hợp. Ngồi sàn cũng được nếu thuận tiện với cơ thể. Không bắt buộc ngồi kiết già; hình thức của tư thế không quyết định giá trị của buổi tập.'] },
        { title: 'Đặt một cuộc hẹn nhỏ', paragraphs: ['Chọn thời điểm dễ nhớ: sau khi rửa mặt hoặc trước một công việc quen thuộc. Bắt đầu bằng ba phút như một lựa chọn thử nghiệm. Nếu ở cùng gia đình, bạn có thể nói rõ mình cần vài phút ít gián đoạn, thay vì mong mọi người tự đoán.', 'Để điện thoại ngoài tầm tay hoặc bật chế độ phù hợp, nhưng giữ những liên lạc cần thiết theo hoàn cảnh của bạn. Không cần biến ngôi nhà thành thiền viện. Mục tiêu là giảm sự kéo đi không cần thiết.'] },
        { title: 'Biết trước mình sẽ làm gì', paragraphs: ['Ngồi xuống, nhận biết cơ thể được nâng đỡ, rồi chú ý tới hơi thở tự nhiên. Khi phân tâm, nhận ra và quay lại. Nếu thở không phải điểm tựa dễ chịu, chọn âm thanh gần bạn hoặc cảm giác bàn chân.', 'Sau buổi tập, nhìn quanh, cử động nhẹ và tiếp tục ngày sống. Có thể ghi một điều đã nhận biết. Một buổi có nhiều suy nghĩ vẫn cho bạn cơ hội học cách trở về; không cần xóa nó khỏi “sổ thành tích”.'] },
      ],
      practice: { title: 'Checklist trước khi ngồi xuống', steps: ['Chọn ghế hoặc chỗ ngồi ổn định.', 'Hẹn một khoảng ngắn và giảm thông báo không cần thiết.', 'Chọn hơi thở, bàn chân hoặc âm thanh làm điểm tựa.', 'Thực hành, kết thúc có chủ ý và ghi một câu.'] },
      note: 'Gợi ý tư thế được đối chiếu với hướng dẫn nhập môn của NHS. Thời lượng ngắn ở đây là lựa chọn thực hành, không phải công thức đảm bảo tiến bộ.',
      cta: { label: 'Bắt đầu bài thiền hơi thở', slug: 'breath-meditation' },
    }, {
      category: 'Getting started', title: 'How to Start Meditating at Home: Your First Session',
      description: 'Prepare a place, a time and an anchor for your first meditation at home using what you already have.',
      imageAlt: 'Watercolor illustration of a wooden chair and meditation cushion on a shaded garden veranda.',
      introduction: 'An ordinary corner of your home can be a place to begin. You do not need to redesign a room, buy equipment or wait for everyone to share your interest. Make a manageable space in your day and know what you will do in it.',
      sections: [
        { title: 'Choose a practical place', paragraphs: ['Find somewhere you will not constantly have to move aside or watch for falling objects. A chair by a window, a corner or a veranda can work. You need not remove every sound; aim for reasonably stable conditions.', 'A supportive chair and a comfortable, relatively upright posture are suitable. Sitting on the floor is another option if it suits your body. Lotus posture is not required, and the shape of your seat does not determine the value of the session.'] },
        { title: 'Make a small appointment', paragraphs: ['Choose a memorable moment, perhaps after washing your face or before a regular task. Try three minutes as an experiment. If you share a home, explain that you would like a brief period with fewer interruptions rather than expecting others to guess.', 'Move your phone out of reach or adjust notifications while keeping essential contact available. Your house does not need to become a monastery. Simply reduce avoidable distractions.'] },
        { title: 'Know what you will practise', paragraphs: ['Sit down, feel the support beneath your body and notice natural breathing. When attention wanders, notice and return. If the breath is uncomfortable as an anchor, try nearby sounds or the contact of your feet.', 'Finish by looking around and moving gently. Write one thing you noticed if useful. A session with many thoughts still offers practice in returning; you do not need to erase it from your record.'] },
      ],
      practice: { title: 'Before you sit down', steps: ['Choose a stable chair or seat.', 'Set aside a short time and reduce unnecessary notifications.', 'Choose the breath, feet or sounds as an anchor.', 'Practise, finish deliberately and write one sentence.'] },
      note: 'Posture suggestions were checked against the NHS beginner guide. A short session is a practical choice, not a guaranteed formula for progress.',
      cta: { label: 'Start the breath meditation guide', slug: 'breath-meditation' },
    }, [manuscriptSource, beginnerGuide]),

  entry('B02', 'natural-breathing', 'quan-sat-hoi-tho-tu-nhien', 'breathing', 'breath',
    ['quan sát hơi thở', 'observing the breath'], ['breath-meditation', 'wandering-mind', 'body-mindfulness'], {
      category: 'Thiền hơi thở', title: 'Quan sát hơi thở tự nhiên: Có cần hít sâu khi thiền?',
      description: 'Phân biệt nhận biết hơi thở với điều khiển hơi thở, để buổi thiền nhập môn bớt gồng và dễ thực hành hơn.',
      imageAlt: 'Minh họa màu nước: người ngồi thoải mái bên tre và mặt hồ yên.',
      introduction: 'Vừa nghe “chú ý vào hơi thở”, nhiều người lập tức hít thật sâu, kéo dài hơi ra và kiểm tra xem mình thở đã đúng chưa. Sự nhiệt tình ấy dễ biến một điểm tựa giản dị thành công việc phải quản lý. Trong bài thiền nhập môn này, ta thử nhận biết trước, thay vì sửa nhịp thở.',
      sections: [
        { title: 'Biết hơi thở khác với tạo hơi thở', paragraphs: ['Nhận biết là cảm thấy hơi vào, hơi ra và khoảng chuyển tiếp khi chúng diễn ra. Điều chỉnh là chủ động đổi nhịp, độ sâu hoặc độ dài. Các bài tập điều chỉnh hơi thở có mục tiêu riêng; bài này tập sự chú ý với nhịp thở tự nhiên.', 'Bạn có thể biết một hơi dài là dài, một hơi ngắn là ngắn. Không cần cố tạo hơi dài trước rồi ép nó ngắn lại. Nếu vừa chú ý đã thấy nhịp thở thay đổi, cũng không cần hoảng: ghi nhận sự thay đổi ấy, rồi bớt can thiệp.'] },
        { title: 'Tìm cảm giác thật thay vì hình ảnh tưởng tượng', paragraphs: ['Chọn một vị trí như vùng mũi hoặc bụng. Nhận biết chuyển động hoặc cảm giác ở đó. Không cần tưởng tượng khí chạy khắp cơ thể, tìm cảm giác đặc biệt hay bắt hơi thở phải chạm tới một nơi nhất định.', 'Nếu cảm giác mờ, bạn có thể mở mắt và nhận biết bàn chân một lúc. Sau đó quay lại khi thuận tiện, hoặc giữ bàn chân làm điểm tựa cho buổi này. Sự linh hoạt giúp bài tập thích hợp với trải nghiệm hiện tại.'] },
        { title: 'Khi nhận ra mình đang gồng', paragraphs: ['Thử nhìn xem vai có nâng lên, hàm có siết hoặc mình đang chờ hơi thở tiếp theo để kiểm tra không. Nới lỏng một chút và nhận biết sự tiếp xúc với chỗ ngồi. Bạn không phải thả lỏng hoàn toàn mới được tiếp tục.', 'Mục tiêu buổi tập là học cách biết và quay về, không phải trình diễn một kiểu thở đẹp. Khi cần một nhịp nghỉ, hãy nghỉ. Chiếc cọc hơi thở trong câu chuyện là nơi nương tựa, không phải chiếc thước chấm điểm.'] },
      ],
      practice: { title: 'Một phút nhận biết thay vì điều khiển', steps: ['Ngồi thoải mái, để hai tay nghỉ.', 'Chọn một vị trí cảm nhận nhịp thở.', 'Biết hơi vào và hơi ra mà không cố đổi chúng.', 'Nếu gồng, nhận biết chỗ ngồi hoặc bàn chân rồi tiếp tục hoặc kết thúc.'] },
      note: 'Hướng dẫn này dành cho thiền chú ý vào hơi thở, không phải bài pranayama hay kỹ thuật nín thở. Bạn có thể chọn điểm tựa khác nếu không thoải mái.',
      cta: { label: 'Thực hành thiền hơi thở từng bước', slug: 'breath-meditation' },
    }, {
      category: 'Breath meditation', title: 'Natural Breathing in Meditation: Do You Need to Breathe Deeply?',
      description: 'Understand the difference between observing and controlling breathing, and approach your beginner practice with less strain.',
      imageAlt: 'Watercolor illustration of a relaxed seated person beside bamboo and a quiet pond.',
      introduction: 'When told to pay attention to breathing, many people immediately breathe deeply, lengthen the exhalation and check whether they are doing it correctly. An ordinary anchor becomes another task to manage. In this beginner practice, try noticing before changing the rhythm.',
      sections: [
        { title: 'Observing is different from creating a breath', paragraphs: ['Observing means feeling the inhalation, exhalation and transition as they occur. Controlling means deliberately changing the rhythm, depth or length. Breath-control exercises have their own purposes; this exercise works with natural breathing.', 'Recognise a long breath as long and a short one as short. You do not need to manufacture that sequence. If attention changes the rhythm, simply notice and ease unnecessary effort.'] },
        { title: 'Find sensations rather than imagined pathways', paragraphs: ['Choose a place such as the nose or belly and feel what happens there. You need not visualise air moving through the entire body or search for a special sensation.', 'If sensations are faint, open your eyes and feel your feet for a while. Return to breathing when useful, or keep your feet as the anchor for this session. Flexibility makes practice responsive to your experience.'] },
        { title: 'Notice when you are straining', paragraphs: ['Check whether your shoulders are lifted, your jaw is tight or you are waiting to inspect the next breath. Soften a little and feel the support of your seat. Complete relaxation is not a prerequisite.', 'You are learning to notice and return, not demonstrate impressive breathing. Rest when needed. In the manuscript’s story, the breath is an anchor, not a ruler for grading yourself.'] },
      ],
      practice: { title: 'A minute of observation', steps: ['Sit comfortably and rest your hands.', 'Choose one place to feel breathing.', 'Notice inhalation and exhalation without deliberately changing them.', 'If you strain, feel your seat or feet, then continue or finish.'] },
      note: 'This is breath-awareness meditation, not pranayama or a breath-holding exercise. Choose another anchor if this one feels uncomfortable.',
      cta: { label: 'Follow the breath meditation guide', slug: 'breath-meditation' },
    }),

  entry('D02', 'wandering-mind', 'ngoi-thien-nhieu-suy-nghi', 'challenges', 'buffalo',
    ['ngồi thiền nhiều suy nghĩ', 'thoughts during meditation'], ['breath-meditation', 'natural-breathing', 'meditation-habit'], {
      category: 'Khó khăn khi thiền', title: 'Ngồi thiền nhiều suy nghĩ: Làm gì khi tâm liên tục chạy đi?',
      description: 'Thực hành nhận biết và quay về khi suy nghĩ xuất hiện, qua câu chuyện con trâu tâm trí trong Thiền Tinh Hoa.',
      imageAlt: 'Minh họa màu nước: người nông dân và con trâu hiền bên hồ, phía sau là ruộng lúa.',
      introduction: 'Bạn vừa ngồi xuống thì danh sách việc cần làm mở hội trong đầu. Chưa hết, cuộc trò chuyện hôm qua cũng xin một chỗ. Ta dễ kết luận mình không hợp với thiền. Nhưng chính khoảnh khắc nhận ra tâm đã đi xa là một phần quan trọng của thực hành.',
      sections: [
        { title: 'Đừng lấy việc hết suy nghĩ làm bài kiểm tra', paragraphs: ['Trong bài tập chú ý, bạn có một điểm tựa và tập nhận ra lúc sự chú ý rời điểm ấy. Suy nghĩ có thể tiếp tục xuất hiện. Nhiệm vụ không phải tiêu diệt chúng, mà biết mình đang nghĩ rồi lựa chọn quay lại.', 'Thấy nhiều suy nghĩ trong một buổi tập chưa đủ để kết luận tâm đang tệ hơn. Bạn có thể đang nhận ra những hoạt động vốn ít để ý. Hãy mô tả điều đã thấy thay vì vội phán xét khả năng của mình.'] },
        { title: 'Ba động tác nhỏ: nhận ra, ghi nhận, quay về', paragraphs: ['Nhận ra mình đang ở trong một câu chuyện. Ghi nhận thật ngắn: “đang nhớ”, “đang tính” hoặc đơn giản “đang nghĩ”. Sau đó đặt lại sự chú ý vào cảm giác thở hay bàn chân. Không cần giải thích vì sao ý nghĩ ấy đến.', 'Nếu gọi tên khiến bạn phân tích nhiều hơn, bỏ bước gọi tên cũng được. Trực tiếp trở về cảm giác. Cách thực hành nên giúp bạn tiếp xúc trải nghiệm, không thêm một lớp bình luận bất tận vào trải nghiệm.'] },
        { title: 'Dắt trâu về, đừng tổ chức phiên tòa', paragraphs: ['Trong bản thảo, người nông dân kiên nhẫn đưa con trâu trở lại thay vì đánh nó. Đây là hình ảnh cho thái độ khi phân tâm. Bạn có thể quay về mười lần mà không mắng mình mười lần.', 'Nếu một việc thật sự cần xử lý cứ xuất hiện, ghi một từ nhắc việc trước buổi sau. Nếu tiếng động hay tư thế kéo bạn đi, điều chỉnh điều kiện. Chú ý cũng bao gồm khả năng lựa chọn hợp lý, không chỉ cố ngồi lâu hơn.'] },
      ],
      practice: { title: 'Thử một lần trở về có ý thức', steps: ['Chọn cảm giác thở hoặc bàn chân làm điểm tựa.', 'Khi nhận ra suy nghĩ, ghi nhận ngắn nếu hữu ích.', 'Nhẹ nhàng đặt chú ý trở lại cảm giác hiện tại.', 'Sau buổi tập, ghi nhận một lần đã quay về thay vì đếm thất bại.'] },
      note: 'Đây là cách làm việc với phân tâm trong buổi tập ngắn. Không cần ép bản thân ở lại với nội dung suy nghĩ khiến bạn quá khó chịu.',
      cta: { label: 'Lập nhịp thực hành vừa sức', slug: 'meditation-habit' },
    }, {
      category: 'Meditation challenges', title: 'Too Many Thoughts During Meditation? Working with a Wandering Mind',
      description: 'Practise noticing thoughts and returning to an anchor, with the gentle buffalo story from Thiền Tinh Hoa.',
      imageAlt: 'Watercolor illustration of a farmer and a calm buffalo beside a pond and rice fields.',
      introduction: 'You sit down and your to-do list throws a party in your head. Yesterday’s conversation asks to join. It is tempting to conclude that meditation is not for you. Yet recognising that attention has wandered is an important part of the exercise.',
      sections: [
        { title: 'Do not make a thought-free mind the test', paragraphs: ['In an attention practice, you choose an anchor and learn to notice when attention leaves it. Thoughts may continue to appear. Your task is to recognise thinking and choose to return, not to destroy thoughts.', 'Noticing many thoughts is not enough to conclude that your mind is getting worse. You may be observing activity you usually overlook. Describe what happened rather than judging your ability.'] },
        { title: 'Notice, acknowledge, return', paragraphs: ['Notice that you are inside a story. Briefly acknowledge “remembering”, “planning” or “thinking”, then return to the breath or your feet. You need not explain why the thought appeared.', 'If naming leads to more analysis, skip the label and return directly to sensation. The method should support contact with experience rather than add endless commentary.'] },
        { title: 'Bring the buffalo back without putting it on trial', paragraphs: ['The manuscript’s farmer patiently brings the buffalo back instead of beating it. Let this suggest your attitude to distraction. You can return ten times without scolding yourself ten times.', 'If an important task keeps resurfacing, make a brief reminder before your next session. If noise or posture is distracting, adjust the conditions. Attention includes practical choices, not simply sitting longer.'] },
      ],
      practice: { title: 'One deliberate return', steps: ['Choose breathing sensations or your feet as an anchor.', 'Briefly acknowledge a thought if useful.', 'Gently return attention to present sensation.', 'Afterwards, remember one return instead of counting failures.'] },
      note: 'This is a way to work with distraction during a short session. You do not need to force yourself to remain with deeply distressing thoughts.',
      cta: { label: 'Build a manageable practice rhythm', slug: 'meditation-habit' },
    }),

  entry('D03', 'meditation-posture', 'dau-chan-khi-ngoi-thien', 'challenges', 'posture',
    ['đau chân khi ngồi thiền', 'leg pain during meditation'], ['start-meditating-at-home', 'body-mindfulness', 'breath-meditation'], {
      category: 'Khó khăn khi thiền', title: 'Đau chân khi ngồi thiền: Điều chỉnh tư thế và cách tập',
      description: 'Chọn tư thế ngồi thiền phù hợp và điều chỉnh buổi tập khi khó chịu, thay vì xem đau là thước đo sự tiến bộ.',
      imageAlt: 'Minh họa màu nước: ghế gỗ có đệm nhỏ và đệm ngồi sàn trên hiên nhà.',
      introduction: 'Tư thế đẹp trong một bức ảnh chưa chắc phù hợp với cơ thể bạn hôm nay. Nếu ngồi thiền khiến chân đau, điều cần làm trước tiên không phải chứng minh ý chí. Bài viết này giúp bạn chọn cách ngồi và thời lượng dễ điều chỉnh hơn; không chẩn đoán nguyên nhân đau.',
      sections: [
        { title: 'Không có yêu cầu bắt buộc phải ngồi kiết già', paragraphs: ['Bạn có thể thực hành trên ghế vững, đặt bàn chân ở vị trí được nâng đỡ và để tay nghỉ. Với ngồi sàn, chọn cách cơ thể cảm thấy ổn định thay vì cố ép chân vào một tư thế. Ghế là một lựa chọn thực hành đầy đủ, không phải “hạng dự bị”.', 'Thử tư thế trong một khoảng ngắn trước khi hẹn buổi dài. Để ý chỗ ngồi, độ nâng đỡ và sự gồng ở vai. Không cần giữ một dáng cứng như tượng: ổn định và có thể điều chỉnh hữu ích hơn việc cố bất động.'] },
        { title: 'Nhận biết không đồng nghĩa với chịu đựng đau', paragraphs: ['Bạn có thể ghi nhận “khó chịu” rồi thay đổi tư thế hoặc kết thúc bài tập. Hướng dẫn MBSR của NHS khuyên dừng bài gây đau hoặc khó chịu và trao đổi với bác sĩ hay người hướng dẫn. Không dùng chánh niệm để ép mình bỏ qua tín hiệu của cơ thể.', 'Nếu đau làm bạn lo lắng hoặc tiếp tục ngoài buổi tập, tìm tư vấn chuyên môn để xác định cách xử lý phù hợp. Việc quan sát không tự cho biết nguyên nhân đau; cũng không chứng minh rằng đau là sự “thanh lọc” hay dấu hiệu tiến bộ.'] },
        { title: 'Thiết kế một buổi tập dễ điều chỉnh', paragraphs: ['Chọn một buổi ngắn và cho phép mình chuyển từ sàn lên ghế. Trước khi đổi, nhận biết ý định; trong lúc đổi, chú ý động tác; sau khi đổi, cảm nhận tư thế mới. Chính quá trình ấy cũng có thể là thực hành.', 'Sau buổi tập, ghi cách ngồi và điểm cần thay đổi thay vì ghi số phút chịu đau. Với nhu cầu vận động hoặc sức khỏe riêng, hỏi người hướng dẫn có kinh nghiệm và chuyên gia chăm sóc phù hợp trước khi tăng cường độ.'] },
      ],
      practice: { title: 'Kiểm tra tư thế trước buổi tập', steps: ['Chọn ghế hoặc chỗ ngồi ổn định, không ép chân.', 'Nhận biết phần cơ thể đang được nâng đỡ.', 'Thử trong thời lượng ngắn và điều chỉnh nếu cần.', 'Dừng nếu bài tập gây đau; tìm hỗ trợ phù hợp khi có băn khoăn.'] },
      note: 'Hướng dẫn tư thế tổng quát, không phải tư vấn điều trị. Tham khảo hướng dẫn MBSR của NHS ở phần nguồn đọc thêm.',
      cta: { label: 'Chuẩn bị buổi tập tại nhà', slug: 'start-meditating-at-home' },
    }, {
      category: 'Meditation challenges', title: 'Leg Pain During Meditation: Adjusting Your Posture and Practice',
      description: 'Choose an adaptable meditation posture and respond to discomfort without treating pain as a measure of progress.',
      imageAlt: 'Watercolor illustration of a cushioned wooden chair and floor cushion on a veranda.',
      introduction: 'A posture that looks beautiful in a photograph may not suit your body today. If sitting causes leg pain, proving your willpower is not the first task. This guide offers adaptable seating choices and session lengths; it does not diagnose pain.',
      sections: [
        { title: 'Lotus posture is not compulsory', paragraphs: ['Use a stable chair, support your feet and let your hands rest. For floor sitting, choose a position that feels stable rather than forcing your legs into a shape. A chair is a complete practice option, not a substitute for “real” meditation.', 'Try the posture briefly before planning a long session. Notice support and unnecessary shoulder tension. You need not sit rigidly like a statue; stability and adjustability are more useful than enforced immobility.'] },
        { title: 'Awareness does not require enduring pain', paragraphs: ['You can acknowledge discomfort and change position or finish. NHS MBSR guidance advises stopping painful or uncomfortable exercises and discussing them with a doctor or instructor. Do not use mindfulness to override your body’s signals.', 'Seek professional advice if pain concerns you or continues outside practice. Observation does not establish its cause, and pain does not demonstrate purification or progress.'] },
        { title: 'Make the session adaptable', paragraphs: ['Choose a short session and allow yourself to move from the floor to a chair. Notice the intention, the movement and the new position. This transition can itself be part of practice.', 'Record the seating arrangement and what needs changing, rather than how long you endured pain. For particular movement or health needs, consult an experienced instructor and appropriate healthcare professional before increasing intensity.'] },
      ],
      practice: { title: 'A posture check', steps: ['Choose stable seating without forcing your legs.', 'Notice where your body is supported.', 'Try a short session and adjust as needed.', 'Stop if the exercise causes pain; seek appropriate support for concerns.'] },
      note: 'General posture guidance, not treatment advice. See the NHS MBSR resource below.',
      cta: { label: 'Prepare a session at home', slug: 'start-meditating-at-home' },
    }, [manuscriptSource, postureGuide]),

  entry('A02', 'what-is-meditation', 'thien-la-gi', 'beginning', 'buffalo',
    ['thiền là gì', 'what is meditation'], ['natural-breathing', 'breath-meditation', 'meditation-for-beginners'], {
      category: 'Bắt đầu với thiền', title: 'Thiền là gì? Hiểu qua câu chuyện mặt hồ và con trâu',
      description: 'Một câu chuyện gần gũi để hiểu sự chú ý, tâm phân tán và thái độ quan sát trong thực hành thiền.',
      imageAlt: 'Minh họa màu nước: ông lão và con trâu bên mặt hồ phản chiếu bầu trời.',
      introduction: 'Một người nông dân dẫn trâu ra đồng. Con trâu thích nước, lao xuống hồ và làm bùn tung lên. Ông càng sốt ruột khuấy nước cho trong, mặt hồ càng đục. Câu chuyện trong Thiền Tinh Hoa mở ra một cách hình dung về tâm trí — vừa dễ nhớ, vừa bớt nghiêm trọng hóa mỗi lần ta phân tâm.',
      sections: [
        { title: 'Con trâu là hình ảnh, không phải kẻ có lỗi', paragraphs: ['Con trâu tượng trưng cho sự chú ý hay chạy theo điều hấp dẫn, khó chịu hoặc chưa hoàn tất. Mặt hồ gợi những trải nghiệm đang diễn ra trong ta. Đó là ngôn ngữ kể chuyện; không cần xem tâm trí là con vật phải bị chế ngự.', 'Trong thực hành, ta nhận biết mình đang nghĩ, cảm thấy hoặc nghe điều gì. Một điểm tựa như hơi thở giúp quay lại. Người nông dân có thể kiên nhẫn dắt trâu về; ta có thể nhận ra phân tâm mà không coi bản thân là người thất bại.'] },
        { title: 'Lắng lại và quan sát có thể hỗ trợ nhau', paragraphs: ['Khung Lắng–Quan sát–Thấu của Hương Thiền Nature diễn tả một hướng học: bớt cưỡng ép, nhận biết rõ hơn và xem xét điều đang xảy ra. Đây là khung diễn giải của dự án, không phải định nghĩa duy nhất của thiền trong mọi truyền thống.', 'Không cần chờ tâm hoàn toàn yên mới bắt đầu quan sát. Khi nhận biết vai căng hoặc một ý nghĩ vừa đến, bạn đã có thể thực hành. Sự chú ý và sự ổn định có thể hỗ trợ nhau ngay trong một buổi tập bình thường.'] },
        { title: 'Bản đồ hữu ích khi dẫn tới một bước thật', paragraphs: ['Một câu chuyện hay có thể khiến ta nhớ phương pháp, nhưng không thay thế việc ngồi xuống và thử. Chọn một điểm tựa, biết nó, nhận ra khi đi xa rồi quay lại: đó là bước thực hành cụ thể bên dưới hình ảnh mặt hồ.', 'Bạn cũng không cần “làm nước trong” trước mọi quyết định đời sống. Khi cần hành động, hãy dùng thông tin, trao đổi và trách nhiệm thực tế. Thiền hỗ trợ cách hiện diện; nó không thay bạn giải quyết mọi việc.'] },
      ],
      practice: { title: 'Đưa câu chuyện vào một phút thực hành', steps: ['Ngồi hoặc đứng thoải mái.', 'Nhận biết một cảm giác gần như bàn chân hoặc hơi thở.', 'Nếu tâm đi xa, nhẹ nhàng dắt chú ý trở lại.', 'Kết thúc và chọn một việc cụ thể cần làm tiếp.'] },
      note: 'Câu chuyện mặt hồ là ẩn dụ biên tập từ bản thảo. Nó không mô tả cơ chế khoa học của tâm trí hay đảm bảo một trạng thái thiền.',
      cta: { label: 'Thử bài thiền hơi thở', slug: 'breath-meditation' },
    }, {
      category: 'Getting started', title: 'What Is Meditation? A Simple Story About a Buffalo and a Pond',
      description: 'An accessible story about attention, distraction and the attitude of observation in meditation.',
      imageAlt: 'Watercolor illustration of an elderly farmer and buffalo beside a pond reflecting the sky.',
      introduction: 'A farmer leads his buffalo to the fields. The buffalo jumps into a pond and stirs up mud. The more urgently the farmer stirs the water to clear it, the muddier it becomes. This story from Thiền Tinh Hoa offers a memorable way to reflect on attention without making every distraction a crisis.',
      sections: [
        { title: 'The buffalo is an image, not a culprit', paragraphs: ['The buffalo represents attention drawn toward what is attractive, unpleasant or unfinished. The pond suggests unfolding experience. This is storytelling language; you do not need to treat your mind as an animal to subdue.', 'Notice thinking, feeling or hearing. An anchor such as the breath provides somewhere to return. Just as the farmer can patiently lead the buffalo back, you can recognise distraction without declaring yourself a failure.'] },
        { title: 'Settling and observing can support each other', paragraphs: ['Hương Thiền Nature’s Calm–Observe–Understand framework offers a learning direction: reduce unnecessary force, notice more clearly and examine experience. It is the project’s interpretive framework, not a universal definition across all meditation traditions.', 'You need not wait for total stillness before observing. Noticing a tense shoulder or a new thought is already an opportunity to practise. Attention and steadiness can support each other within an ordinary session.'] },
        { title: 'A useful map leads to a real step', paragraphs: ['A memorable story does not replace trying the exercise. Choose an anchor, notice it, recognise wandering and return. These actions give the pond metaphor a practical foundation.', 'Nor must you make the water clear before every life decision. Use information, communication and practical responsibility when action is needed. Meditation supports how you are present; it does not make every decision for you.'] },
      ],
      practice: { title: 'Bring the story into one minute', steps: ['Sit or stand comfortably.', 'Notice a nearby sensation such as your feet or breath.', 'Gently bring attention back when it wanders.', 'Finish and choose one practical next action.'] },
      note: 'The pond is a metaphor adapted from the manuscript, not a scientific model of the mind or a guarantee of a meditation state.',
      cta: { label: 'Try breath meditation', slug: 'breath-meditation' },
    }),

  entry('C02', 'body-mindfulness', 'chanh-niem-co-the', 'mindfulness', 'garden',
    ['chánh niệm cơ thể', 'body mindfulness'], ['mindful-gardening', 'everyday-mindfulness', 'meditation-posture'], {
      category: 'Chánh niệm thân tâm', title: 'Chánh niệm cơ thể: Nhận biết khi đi, đứng và ngồi',
      description: 'Thử nhận biết tiếp xúc và chuyển động của cơ thể trong những hoạt động quen thuộc, không cần chờ một buổi ngồi thiền.',
      imageAlt: 'Minh họa màu nước: người chăm vườn chú ý từng động tác bên luống rau.',
      introduction: 'Cơ thể có mặt trong mọi việc, nhưng sự chú ý thường đến nơi khác trước nó. Ta đi mà nghĩ tới điểm đến, ngồi mà tiếp tục chạy theo một cuộc trò chuyện. Chánh niệm cơ thể bắt đầu bằng việc nhận ra một chuyển động hoặc một điểm tiếp xúc đang thật sự diễn ra.',
      sections: [
        { title: 'Khi ngồi: nhận biết sự nâng đỡ', paragraphs: ['Cảm nhận chỗ ngồi, bàn chân hoặc bàn tay đang nghỉ. Chọn một cảm giác dễ nhận biết, không cần rà soát toàn bộ cơ thể cùng lúc. Nếu thấy mình đang gồng, ghi nhận và điều chỉnh vừa đủ.', 'Bạn có thể thực hành trong một nhịp nghỉ trước khi mở máy tính. Không cần tìm cảm giác đặc biệt. Cảm giác bình thường, kể cả khó mô tả, cũng là nơi bắt đầu quan sát.'] },
        { title: 'Khi đứng và đi: biết động tác đang xảy ra', paragraphs: ['Ở nơi an toàn, đứng lại và cảm nhận chân chạm đất. Khi đi vài bước, chú ý sự nhấc chân, đặt chân và chuyển trọng lượng trong phạm vi bạn nhận biết được. Không cần chia động tác thành quá nhiều tên gọi.', 'Giữ mắt và sự chú ý đủ rộng để nhìn đường. Khi băng qua đường, dùng dụng cụ hoặc ở nơi cần phản ứng nhanh, ưu tiên nhiệm vụ và an toàn. Bài tập không đòi thu hẹp chú ý vào chân trong mọi hoàn cảnh.'] },
        { title: 'Từ biết thân tới biết cách mình phản ứng', paragraphs: ['Khi nhấc bình tưới, bạn có thể nhận ra tay đang gồng; khi chờ một tin nhắn, vai có thể nhô lên. Ghi nhận cảm giác trước, rồi nhận biết tâm trạng nếu rõ. Không cần suy đoán rằng mọi căng thẳng đều có một ý nghĩa tâm linh.', 'Chương về quan sát trong bản thảo gợi mở Thân–Thọ–Tâm–Pháp. Bài này chỉ tập trung vào thân và chuyển động, không thay thế một hướng dẫn Tứ Niệm Xứ đầy đủ. Một phạm vi nhỏ giúp bạn dễ thực hành rồi mở rộng dần.'] },
      ],
      practice: { title: 'Hai phút với một hoạt động', steps: ['Chọn một việc an toàn như đứng dậy khỏi ghế hoặc bước trong phòng.', 'Nhận biết ý định bắt đầu.', 'Cảm nhận một động tác hoặc điểm tiếp xúc.', 'Khi phân tâm, quay lại và kết thúc bằng việc nhìn quanh.'] },
      note: 'Chọn hoạt động phù hợp với khả năng vận động của bạn. Bạn có thể thực hành hoàn toàn ở tư thế ngồi.',
      cta: { label: 'Thử chánh niệm khi làm vườn', slug: 'mindful-gardening' },
    }, {
      category: 'Mindfulness', title: 'Body Mindfulness: Awareness While Walking, Standing, and Sitting',
      description: 'Notice contact and movement during familiar activities, without waiting for a formal meditation session.',
      imageAlt: 'Watercolor illustration of a gardener attending to movements beside a vegetable bed.',
      introduction: 'Your body is present in every task, while attention often travels elsewhere. You walk while thinking of the destination or sit while replaying a conversation. Body mindfulness begins with noticing a movement or point of contact that is happening now.',
      sections: [
        { title: 'Sitting: notice support', paragraphs: ['Feel your seat, feet or resting hands. Choose one accessible sensation rather than scanning everything at once. If you notice strain, acknowledge it and adjust gently.', 'Try a pause before opening your computer. You do not need a special sensation. Ordinary contact, even when difficult to describe, is enough to begin observing.'] },
        { title: 'Standing and walking: notice movement', paragraphs: ['In a safe place, feel your feet on the ground. Take a few steps and notice lifting, placing and shifting weight as available to you. There is no need to give every movement a complicated label.', 'Keep your eyes and attention broad enough to see your surroundings. When crossing roads, handling tools or responding quickly, prioritise the task and safety. You do not need to focus narrowly on your feet everywhere.'] },
        { title: 'From body awareness to noticing responses', paragraphs: ['Lifting a watering can may reveal tension in your hand; waiting for a message may reveal raised shoulders. Notice sensations first, then mood if it is clear. Avoid assuming every tension has a spiritual explanation.', 'The manuscript introduces body, feeling, mind and dhammas. This article focuses on body and movement rather than offering a complete Satipatthana guide. A small scope makes it easier to practise before widening attention.'] },
      ],
      practice: { title: 'Two minutes with one activity', steps: ['Choose a safe action such as standing from a chair or walking indoors.', 'Notice the intention to begin.', 'Feel one movement or point of contact.', 'Return when distracted, then look around to finish.'] },
      note: 'Choose an activity suited to your mobility. This practice can be done entirely while seated.',
      cta: { label: 'Try mindful gardening', slug: 'mindful-gardening' },
    }),

  entry('E01', 'everyday-mindfulness', 'chanh-niem-trong-doi-song', 'daily-life', 'beginning',
    ['chánh niệm trong đời sống', 'everyday mindfulness'], ['body-mindfulness', 'mindful-gardening', 'loving-kindness-meditation'], {
      category: 'Thiền trong đời sống', title: 'Chánh niệm trong đời sống: Thực hành giữa những việc thường ngày',
      description: 'Đưa sự chú ý vào một việc nhỏ mỗi ngày: chuyển động, công việc, bữa ăn và cách gặp gỡ người khác.',
      imageAlt: 'Minh họa màu nước: hiên nhà và góc thực hành mở ra khu vườn buổi sáng.',
      introduction: 'Thiền không chỉ thuộc về khoảng thời gian trên đệm. Chương 9 của Thiền Tinh Hoa mở lời mời đưa sự tỉnh thức vào nhịp làm việc và sinh hoạt. Ta bắt đầu từ một việc đủ nhỏ để có thể thực hành thật, thay vì đặt mục tiêu tỉnh thức hoàn hảo cả ngày.',
      sections: [
        { title: 'Chọn một việc làm cửa trở về', paragraphs: ['Bạn có thể chọn lúc rửa tay, uống nước hoặc đứng dậy khỏi bàn. Biết mình bắt đầu việc gì, nhận biết một cảm giác rõ, rồi hoàn thành việc đó. Không cần làm mọi thứ thật chậm; điều cần thử là có mặt với việc đang làm.', 'Nếu quên, lần nhớ ra kế tiếp là một cơ hội. Chánh niệm không cần trở thành người giám thị đi theo chấm lỗi. Một lời nhắc nhẹ phù hợp hơn một yêu cầu không được phân tâm.'] },
        { title: 'Khi làm việc: chú ý cũng bao gồm lựa chọn', paragraphs: ['Trước khi mở một tab mới, hỏi mình cần làm gì lúc này. Có thể nhận biết tay trên bàn phím rồi tiếp tục công việc. Khi cần suy nghĩ, hãy suy nghĩ; hiện diện không đồng nghĩa với ngừng dùng trí óc.', 'Nếu nhiều thông báo kéo bạn đi, điều chỉnh chúng theo nhu cầu công việc. Một nhịp dừng giúp nhận ra lựa chọn; việc giảm nguồn gián đoạn vẫn cần hành động cụ thể. Không thể chỉ thiền rồi mong lịch làm việc tự sắp xếp.'] },
        { title: 'Khi gặp người khác: để ý cả mình và họ', paragraphs: ['Trong một cuộc trò chuyện, thử nghe trọn một câu trước khi chuẩn bị câu trả lời. Nhận ra mình đang sốt ruột hoặc muốn chen vào. Sau đó lựa chọn cách nói rõ ràng, phù hợp với hoàn cảnh.', 'Có mặt không bắt buộc bạn phải đồng ý với mọi điều. Bạn vẫn có thể nêu nhu cầu, giới hạn và việc cần giải quyết. Thực hành giúp đưa nhận biết vào hành động; nó không thay thế giao tiếp có trách nhiệm.'] },
        { title: 'Nối buổi tập ngắn với ngày sống', paragraphs: ['Một buổi ngồi tập giúp bạn làm quen thao tác nhận biết và quay về. Trong ngày, thử cùng thao tác đó ở một hoạt động an toàn. Hai hình thức có thể bổ sung nhau, không cần chọn một và bỏ hình thức còn lại.', 'Cuối ngày, ghi một lần mình đã nhớ quay về và một điều cần điều chỉnh. Không cần biến toàn bộ sinh hoạt thành bài tập. Cũng hãy để đời sống có khoảng tự nhiên, vui vẻ và nghỉ ngơi.'] },
      ],
      practice: { title: 'Một cửa trở về cho hôm nay', steps: ['Chọn một hoạt động thường ngày và an toàn.', 'Trước khi làm, biết rõ mình sắp làm gì.', 'Trong lúc làm, nhận biết một cảm giác hoặc động tác.', 'Sau đó tiếp tục ngày sống, không tự chấm điểm.'] },
      note: 'Bài viết phát triển từ đề cương ứng dụng đời sống của bản thảo. Không cần thực hành khi nhiệm vụ đòi hỏi sự chú ý khẩn cấp vào an toàn.',
      cta: { label: 'Khám phá chánh niệm cơ thể', slug: 'body-mindfulness' },
    }, {
      category: 'Everyday practice', title: 'Everyday Mindfulness: Practice in Ordinary Moments',
      description: 'Bring attention to one small daily activity: movement, work, meals and the way you meet other people.',
      imageAlt: 'Watercolor illustration of a veranda and practice corner opening onto a morning garden.',
      introduction: 'Meditation need not belong only to time on a cushion. Chapter 9 of Thiền Tinh Hoa invites awareness into work and everyday activity. Begin with something small enough to practise, rather than aiming for perfect mindfulness all day.',
      sections: [
        { title: 'Choose one doorway back', paragraphs: ['Try washing your hands, drinking water or standing from your desk. Know what you are beginning, notice one clear sensation and complete the activity. Everything need not be slow; try being present with what you are doing.', 'If you forget, the next moment of remembering is another opportunity. Mindfulness need not become an inspector following you around. A gentle reminder is more useful than a ban on distraction.'] },
        { title: 'At work, attention includes choosing', paragraphs: ['Before opening another tab, ask what you need to do now. Feel your hands on the keyboard and continue. When thinking is required, think; presence does not mean switching off your reasoning.', 'Adjust notifications to your work needs. A pause may help you notice a choice, but reducing interruptions still requires practical action. Meditation will not arrange your calendar for you.'] },
        { title: 'In conversation, notice yourself and the other person', paragraphs: ['Try hearing a complete sentence before preparing a reply. Notice impatience or an urge to interrupt, then choose a clear response suited to the situation.', 'Being present does not require agreeing with everything. Express needs, boundaries and problems that require action. Awareness supports responsible communication rather than replacing it.'] },
        { title: 'Connect short sessions with daily life', paragraphs: ['A seated session introduces noticing and returning. Try the same movement of attention in one safe daily activity. Formal and informal practice can complement each other.', 'At the end of the day, note one return and one practical adjustment. You need not make every activity an exercise. Leave room for spontaneity, enjoyment and rest.'] },
      ],
      practice: { title: 'One doorway for today', steps: ['Choose a safe, familiar activity.', 'Know what you are about to do.', 'Notice one sensation or movement while doing it.', 'Continue your day without grading yourself.'] },
      note: 'This article develops the manuscript’s daily-life outline. Prioritise immediate safety when a task requires urgent attention.',
      cta: { label: 'Explore body mindfulness', slug: 'body-mindfulness' },
    }),

  entry('E02', 'mindful-gardening', 'thien-khi-lam-vuon', 'daily-life', 'garden',
    ['thiền khi làm vườn', 'mindful gardening'], ['body-mindfulness', 'everyday-mindfulness', 'listening-to-nature'], {
      category: 'Thiên nhiên và thực hành', title: 'Thiền khi làm vườn: Trở về hiện tại qua từng động tác',
      description: 'Thử chánh niệm khi tưới cây và chăm vườn: nhận biết động tác, quan sát cây rồi chọn việc cần làm.',
      imageAlt: 'Minh họa màu nước: người tưới một luống rau trong khu vườn nhà Việt Nam.',
      introduction: 'Khu vườn là hình ảnh xuyên suốt Thiền Tinh Hoa. Khi bước vào vườn thật, ta có thêm cơ hội gặp những điều rất cụ thể: trọng lượng bình tưới, đất ẩm, lá mới và cả việc chưa xong. Không cần khu vườn lớn; một chậu cây cũng có thể mở ra một khoảng quan sát.',
      sections: [
        { title: 'Bắt đầu từ cơ thể đang làm việc', paragraphs: ['Trước khi tưới, đứng hoặc ngồi ổn định. Cảm nhận tay cầm bình, chuyển động khi nâng và động tác khi đặt xuống. Chọn một hoạt động nhẹ, phù hợp với khả năng của bạn; không làm chậm một thao tác đến mức mất an toàn.', 'Khi sự chú ý chạy sang kế hoạch khác, nhận ra rồi quay lại động tác đang làm. Bạn không phải nghĩ về thiền trong lúc tưới. Biết rõ mình đang làm gì là một cách bắt đầu.'] },
        { title: 'Nhìn cây trước khi kể câu chuyện về cây', paragraphs: ['Quan sát màu lá, độ sáng, bề mặt đất và những thay đổi có thể thấy. Ghi điều cụ thể trước: “lá dưới có màu vàng”, thay vì lập tức kết luận cây đang gửi một thông điệp. Quan sát và diễn giải là hai việc có thể tách ra.', 'Việc chăm cây vẫn cần kiến thức của từng loài và điều kiện trồng. Chánh niệm không cho ta công thức tưới áp dụng cho mọi cây. Khi chưa biết, tìm thông tin phù hợp thay vì dùng cảm giác riêng làm bằng chứng.'] },
        { title: 'Gặp cả sự nôn nóng của người làm vườn', paragraphs: ['Có thể bạn muốn cây lớn nhanh, bực vì cỏ hoặc sốt ruột với một chiếc lá héo. Nhận biết thái độ ấy rồi chọn việc cần làm. Ta có thể chăm sóc tích cực mà không đòi khu vườn phải hoàn hảo ngay lập tức.', 'Hình ảnh hạt nảy mầm trong sách nhắc về sự đều đặn. Nhưng thực hành cũng cần điều chỉnh: cây thiếu nước cần nước, người mệt cần nghỉ. Kiên nhẫn không có nghĩa bỏ mặc nhu cầu thực tế.'] },
      ],
      practice: { title: 'Một lượt chăm cây trong chánh niệm', steps: ['Chọn một cây quen thuộc và một việc nhẹ, an toàn.', 'Nhận biết một động tác và một điểm tiếp xúc của cơ thể.', 'Quan sát ba chi tiết cụ thể của cây hoặc đất.', 'Hoàn thành việc chăm sóc phù hợp, cất dụng cụ rồi nghỉ.'] },
      note: 'Đây là thực hành quan sát, không phải hướng dẫn chữa bệnh bằng cây hay kỹ thuật trồng trọt chuyên môn. Tôn trọng cây, môi trường và khả năng vận động của mình.',
      cta: { label: 'Lắng nghe thiên nhiên bằng giác quan', slug: 'listening-to-nature' },
    }, {
      category: 'Nature and practice', title: 'Mindful Gardening: Returning to the Present Through Simple Actions',
      description: 'Try mindfulness while watering and tending plants: notice movement, observe the plant and choose the next practical task.',
      imageAlt: 'Watercolor illustration of a person watering vegetables in a Vietnamese home garden.',
      introduction: 'The garden runs throughout Thiền Tinh Hoa as a metaphor. A real garden offers concrete experience: a watering can’s weight, damp soil, new leaves and unfinished jobs. One potted plant is enough to create a moment of observation.',
      sections: [
        { title: 'Begin with the working body', paragraphs: ['Before watering, find a stable standing or seated position. Notice holding, lifting and setting down the can. Choose a gentle task suited to your abilities, and do not slow movements in ways that compromise safety.', 'When attention moves to another plan, notice and return to the action. You need not think about meditation while watering. Knowing what you are doing is a useful beginning.'] },
        { title: 'See the plant before telling its story', paragraphs: ['Notice leaf colour, light, soil and visible changes. Record something concrete, such as a yellow lower leaf, before deciding the plant is sending a message. Observation and interpretation can be distinguished.', 'Plant care still requires knowledge of species and growing conditions. Mindfulness provides no universal watering formula. Seek relevant information rather than treating a personal feeling as evidence.'] },
        { title: 'Meet the gardener’s impatience too', paragraphs: ['You may want faster growth, resent weeds or worry about a wilted leaf. Notice the attitude and choose the necessary action. Active care does not require an immediately perfect garden.', 'The manuscript’s seed imagery suggests consistency. Practice also needs adjustment: a thirsty plant needs water and a tired person needs rest. Patience does not mean neglecting practical needs.'] },
      ],
      practice: { title: 'One mindful plant-care task', steps: ['Choose a familiar plant and a gentle, safe task.', 'Notice one movement and one point of contact.', 'Observe three concrete details of the plant or soil.', 'Complete appropriate care, put tools away and rest.'] },
      note: 'This is an observation exercise, not herbal treatment or specialist horticultural advice. Respect the plant, environment and your mobility.',
      cta: { label: 'Meet nature through the senses', slug: 'listening-to-nature' },
    }),

  entry('E04', 'loving-kindness-meditation', 'thien-tam-tu-cho-nguoi-moi', 'kindness', 'kindness',
    ['thiền tâm từ', 'loving-kindness meditation'], ['everyday-mindfulness', 'meditation-habit', 'body-mindfulness'], {
      category: 'Tâm từ', title: 'Thiền tâm từ cho người mới: Bắt đầu với chính mình và người khác',
      description: 'Một bài thực hành tâm từ ngắn với lời nguyện vừa sức, không ép cảm xúc và có chỗ cho giới hạn của bản thân.',
      imageAlt: 'Minh họa màu nước: hai người chia sẻ giỏ rau trên lối đi trong vườn.',
      introduction: 'Chương 10 của Thiền Tinh Hoa nối sự thực hành cá nhân với lòng tử tế và phụng sự. Tâm từ có thể bắt đầu bằng một ý hướng giản dị: mong mình và người khác được an ổn. Bạn không phải cảm thấy yêu thương tràn đầy mới được thử, cũng không cần bỏ qua những điều đang khó khăn.',
      sections: [
        { title: 'Bắt đầu từ một lời nguyện có thể tiếp nhận', paragraphs: ['Ngồi thoải mái và nhận biết chỗ cơ thể đang được nâng đỡ. Bạn có thể thầm nói: “Mong tôi được an ổn. Mong tôi biết chăm sóc mình. Mong tôi có đủ sáng suốt để làm điều cần làm.” Đây là gợi ý lời nguyện của bài viết, không phải công thức bắt buộc.', 'Nếu câu dành cho mình khó tiếp nhận, bắt đầu với một người khiến bạn dễ khởi ý tốt, hoặc một sinh vật bạn đang chăm sóc. Chọn điểm khởi đầu vừa sức rồi để câu nguyện đi qua nhẹ nhàng.'] },
        { title: 'Ý hướng tử tế không đòi cảm xúc phải xuất hiện', paragraphs: ['Bạn có thể cảm thấy ấm áp, bình thường hoặc chẳng thấy gì đặc biệt. Ghi nhận trải nghiệm ấy. Không cố tạo xúc động, cũng không kết luận mình thiếu lòng từ nếu câu nguyện chưa chạm tới cảm xúc.', 'Nếu buồn hoặc căng thẳng nổi lên, quay lại điểm tiếp xúc với ghế, mở mắt hoặc kết thúc. Bạn không phải tiếp tục chỉ để chứng minh thiện chí. Sự tử tế cũng bao gồm cách đối xử với khả năng hiện tại của mình.'] },
        { title: 'Mở rộng vừa đủ và giữ giới hạn rõ', paragraphs: ['Khi thuận tiện, hướng lời nguyện tới một người thân thiện hoặc một người trung tính. Chưa cần chọn người từng gây tổn thương. “Mong người ấy được an ổn” không có nghĩa đồng ý với mọi hành vi hoặc phải nối lại quan hệ.', 'Sau buổi tập, chọn một hành động nhỏ: nói rõ hơn, nghe trọn một câu, chia sẻ công việc hoặc nghỉ ngơi đúng lúc. Ý hướng trở nên cụ thể qua cách sống; không chỉ qua cảm giác dễ chịu trong lúc ngồi.'] },
      ],
      practice: { title: 'Một lời nguyện, một hành động', steps: ['Ngồi thoải mái và cảm nhận sự nâng đỡ.', 'Chọn mình hoặc một người dễ khởi ý tốt.', 'Lặp một lời nguyện ngắn, không ép cảm xúc.', 'Kết thúc và chọn một việc tử tế vừa sức trong ngày.'] },
      note: 'Bài thực hành được phát triển từ đề cương tâm từ trong bản thảo. Bạn được quyền giữ ranh giới và không cần ép mình tha thứ hoặc tiếp xúc với người gây tổn thương.',
      cta: { label: 'Đưa thực hành vào đời sống', slug: 'everyday-mindfulness' },
    }, {
      category: 'Loving-kindness', title: 'Loving-Kindness Meditation for Beginners: Start with Yourself and Others',
      description: 'Try a short loving-kindness practice with accessible wishes, room for your boundaries and no need to force emotion.',
      imageAlt: 'Watercolor illustration of two people sharing a basket of vegetables on a garden path.',
      introduction: 'Chapter 10 of Thiền Tinh Hoa connects personal practice with kindness and service. Loving-kindness can begin with a simple intention: wishing yourself and others well. You need not feel overflowing affection before trying, or overlook what is difficult.',
      sections: [
        { title: 'Choose a wish you can receive', paragraphs: ['Sit comfortably and feel the support beneath you. Try: “May I be at ease. May I care for myself. May I have the clarity to do what is needed.” These are suggested phrases, not a required formula.', 'If wishing yourself well feels difficult, begin with someone for whom a kind intention comes more easily, or a living being you care for. Choose a manageable starting point and let the phrase pass gently.'] },
        { title: 'Kind intention does not demand a feeling', paragraphs: ['You may feel warmth, neutrality or nothing unusual. Notice that experience. Do not manufacture emotion or conclude you lack kindness when the words do not produce a feeling.', 'If sadness or strain arises, return to the contact of your seat, open your eyes or finish. Continuing is not proof of goodwill. Kindness includes respecting your present capacity.'] },
        { title: 'Widen gently and keep boundaries clear', paragraphs: ['When useful, direct a wish toward a friendly or neutral person. You do not need to choose someone who hurt you. Wishing a person well does not mean approving every action or resuming contact.', 'Afterwards, choose a small action: speak clearly, listen to a complete sentence, share a task or take needed rest. Intention becomes concrete through how you live, not only how you feel while sitting.'] },
      ],
      practice: { title: 'One wish, one action', steps: ['Sit comfortably and feel support.', 'Choose yourself or someone easy to wish well.', 'Repeat a short wish without forcing emotion.', 'Finish and choose one manageable act of kindness.'] },
      note: 'This exercise develops the manuscript’s loving-kindness outline. You may keep boundaries without forcing forgiveness or contact with someone who caused harm.',
      cta: { label: 'Bring practice into daily life', slug: 'everyday-mindfulness' },
    }),

  entry('F05', 'meditation-habit', 'duy-tri-thoi-quen-thien', 'continuing', 'beginning',
    ['duy trì thói quen thiền', 'meditation habit'], ['breath-meditation', 'wandering-mind', 'everyday-mindfulness'], {
      category: 'Đi đường dài', title: 'Duy trì thói quen thiền: Kế hoạch thực hành vừa sức',
      description: 'Lập nhịp thiền phù hợp với đời sống, ghi chép ngắn và biết quay lại sau một buổi bỏ lỡ mà không tự trách.',
      imageAlt: 'Minh họa màu nước: góc thực hành giản dị trên hiên nhà giữa khu vườn.',
      introduction: 'Chương cuối của Thiền Tinh Hoa nhắc rằng có bản đồ rồi vẫn cần bước đi. Bước đi đều đặn không nhất thiết là ngồi thật lâu. Một kế hoạch hữu ích phải có chỗ cho công việc, gia đình, những ngày mệt và cả khả năng bắt đầu lại.',
      sections: [
        { title: 'Chọn mức tối thiểu mình thực sự làm được', paragraphs: ['Thử hẹn ba phút vào một thời điểm dễ nhớ trong một tuần. Con số này là gợi ý tổ chức, không phải liều lượng chuẩn cho mọi người. Nếu chưa phù hợp, chọn thời lượng hoặc lịch khác có thể thực hiện mà không phải hy sinh nhu cầu thiết yếu.', 'Dùng một việc quen thuộc làm dấu nhắc, chẳng hạn sau khi rửa mặt. Chuẩn bị chỗ ngồi trước nếu tiện. Mục tiêu là giảm số quyết định phải đưa ra, không tạo thêm một danh sách nhiệm vụ khiến bạn ngại bắt đầu.'] },
        { title: 'Ghi trải nghiệm, không chấm điểm trạng thái', paragraphs: ['Sau buổi tập, ghi ngày, thời lượng và một điều nhận biết: điểm tựa dễ hay khó, vai có gồng, mình đã quay về khi nào. Một dòng là đủ. Nhật ký không cần kể lại toàn bộ nội tâm.', 'Cuối tuần, xem điều kiện nào giúp bạn thực hành và điều gì cần thay đổi. Không dùng độ bình an để xếp hạng bản thân. Nhu cầu của từng buổi có thể khác; điều chỉnh lịch cũng là một quyết định có trách nhiệm.'] },
        { title: 'Bỏ lỡ một buổi không xóa cả hành trình', paragraphs: ['Khi bỏ lỡ, quay lại ở cuộc hẹn phù hợp tiếp theo. Không cần ngồi bù gấp đôi để trả nợ. Bạn có thể tìm nguyên nhân thực tế: thời điểm khó, thiếu ngủ hoặc kế hoạch quá lớn, rồi sửa một điều.', 'Nếu việc ngồi tập liên tục làm bạn khó chịu, đừng chỉ tăng quyết tâm. Xem lại điểm tựa, giảm phạm vi, trao đổi với người hướng dẫn có kinh nghiệm hoặc tìm hỗ trợ phù hợp. Thiền không nên thay thế chăm sóc chuyên môn cho vấn đề sức khỏe.'] },
        { title: 'Để thực hành có chỗ trong đời sống', paragraphs: ['Ngoài buổi ngồi, chọn một nhịp trở về như cảm nhận bàn chân khi đứng dậy. Một việc nhỏ đủ rõ dễ duy trì hơn lời hứa phải tỉnh thức mọi lúc. Bạn vẫn cần hoàn thành trách nhiệm, nghỉ ngơi và gặp gỡ người khác.', 'Cuốn sách tiếp nối Con Đường Thiền được bản thảo nêu như định hướng phát triển. Trong lúc ấy, không cần chờ một tài liệu mới để bắt đầu. Hãy dùng hướng dẫn đã có, đặt câu hỏi khi cần và học từ trải nghiệm đang diễn ra.'] },
      ],
      practice: { title: 'Kế hoạch một tuần có thể điều chỉnh', steps: ['Chọn thời điểm và thời lượng tối thiểu vừa sức.', 'Đặt một dấu nhắc gắn với việc quen thuộc.', 'Sau buổi tập, ghi một câu về điều nhận biết.', 'Cuối tuần, giữ một điều hữu ích và sửa một điều chưa phù hợp.'] },
      note: 'Kế hoạch một tuần là gợi ý tự tổ chức, không cam kết hình thành thói quen trong bảy ngày. Thiền không thay thế chăm sóc chuyên môn.',
      cta: { label: 'Quay về bài thiền hơi thở', slug: 'breath-meditation' },
    }, {
      category: 'Continuing practice', title: 'Building a Meditation Habit: A Sustainable Practice Plan',
      description: 'Find a realistic meditation rhythm, keep brief notes and return after a missed session without scolding yourself.',
      imageAlt: 'Watercolor illustration of a simple practice space on a garden veranda.',
      introduction: 'The final chapter of Thiền Tinh Hoa reminds us that having a map still calls for taking a step. Consistency need not mean long sessions. A useful plan has room for work, family, tired days and beginning again.',
      sections: [
        { title: 'Choose a minimum you can actually manage', paragraphs: ['Try three minutes at a memorable time for one week. This is an organisational suggestion, not a universal dose. Choose another duration or schedule if needed, without sacrificing essential needs.', 'Attach practice to a familiar event, such as washing your face. Prepare your seat if convenient. Reduce the number of decisions needed to begin rather than creating another daunting task list.'] },
        { title: 'Record experience without grading states', paragraphs: ['After practice, note the date, duration and one observation: an accessible anchor, shoulder tension or a moment of returning. One line is enough; you need not document your entire inner life.', 'At the end of the week, consider what conditions supported practice and what to change. Do not rank yourself by calmness. Different sessions may call for different choices.'] },
        { title: 'Missing a session does not erase the journey', paragraphs: ['Return at the next suitable opportunity. You do not need a double session to repay a debt. Consider practical causes, such as an awkward time, poor sleep or an oversized plan, and change one thing.', 'If sitting repeatedly feels distressing, do not simply increase determination. Reconsider the anchor, reduce the scope and consult an experienced instructor or appropriate support. Meditation should not replace professional care for a health concern.'] },
        { title: 'Give practice a place within life', paragraphs: ['Alongside sitting, choose one brief return, such as feeling your feet when standing. A small, specific action is more manageable than a promise of constant awareness. Responsibilities, rest and relationships still matter.', 'The manuscript describes Con Đường Thiền as a future continuation. You need not wait for another book to begin. Use the available guidance, ask questions and learn from present experience.'] },
      ],
      practice: { title: 'An adaptable one-week plan', steps: ['Choose a manageable minimum duration and time.', 'Connect it to a familiar reminder.', 'Write one observation after each session.', 'Keep one useful element and adjust one difficulty at the end of the week.'] },
      note: 'This is a planning suggestion, not a promise to establish a habit in seven days. Meditation does not replace professional care.',
      cta: { label: 'Return to breath meditation', slug: 'breath-meditation' },
    }, [manuscriptSource, safetyGuide]),
];
