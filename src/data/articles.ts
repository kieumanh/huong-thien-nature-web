import type { Language } from './site';

export type ArticleTranslation = {
  category: string;
  title: string;
  description: string;
  imageAlt: string;
  introduction: string;
  sections: { title: string; paragraphs: string[] }[];
  practice: { title: string; steps: string[] };
  note: string;
};

export type Article = {
  slug: string;
  image: string;
  minutes: number;
  translations: Record<Language, ArticleTranslation>;
};

export const articles: Article[] = [
  {
    slug: 'returning-attention',
    image: '/media/practice-cushion-v2.webp',
    minutes: 4,
    translations: {
      vi: {
        category: 'Thực tập',
        title: 'Sự trở lại cũng là thực tập',
        description: 'Một thực tập ngắn để nhận ra tâm đi lang thang và nhẹ nhàng trở về với hơi thở.',
        imageAlt: 'Đệm thiền và chiếc bình trong khoảng rừng yên tĩnh.',
        introduction: 'Có những lúc vừa ngồi xuống, ta đã thấy mình ở trong một cuộc trò chuyện cũ, một danh sách việc cần làm, hay một điều chưa xảy ra. Đó không phải là dấu hiệu mình thực tập sai. Khoảnh khắc nhận ra chính là nơi có thể bắt đầu lại.',
        sections: [
          { title: 'Chọn một điểm tựa vừa đủ', paragraphs: [
            'Không cần thay đổi hơi thở. Bạn có thể chú ý đến cảm giác không khí đi qua mũi, chuyển động của bụng, hoặc sự tiếp xúc giữa bàn chân và mặt đất. Chọn điều dễ nhận biết nhất trong lúc này.',
            'Nếu chú ý vào hơi thở khiến bạn không thoải mái, hãy mở mắt và chọn một âm thanh hoặc một vật trước mặt. Điểm tựa có thể thay đổi theo nhu cầu của bạn.',
          ] },
          { title: 'Nhận ra mà không trách mình', paragraphs: [
            'Khi nhận ra tâm đã đi xa, thử gọi tên thật nhẹ: “đang nghĩ”, “đang nhớ”, “đang tính”. Không cần đuổi suy nghĩ đi hay giải quyết nó ngay lúc này.',
            'Sau đó trở về với điểm tựa. Có thể một lát sau bạn lại đi xa. Sự lặp lại ấy là một phần của thực tập, không phải một bài kiểm tra về khả năng giữ tâm trống rỗng.',
          ] },
          { title: 'Mang một nhịp trở về vào ngày thường', paragraphs: [
            'Bạn có thể thực tập trong lúc chờ nước sôi, trước khi mở một tin nhắn, hoặc khi đứng dậy khỏi bàn làm việc. Cảm nhận bàn chân, nhận biết một hơi thở, rồi tiếp tục việc đang làm.',
            'Một khoảnh khắc nhỏ, được lặp lại bằng sự kiên nhẫn, là cách đưa sự chú tâm vào đời sống mà không phải chờ đến một điều kiện hoàn hảo.',
          ] },
        ],
        practice: { title: 'Thử trong một phút', steps: ['Ngồi hoặc đứng ở tư thế thoải mái; mắt mở hay khép tùy bạn.', 'Nhận biết ba hơi thở tự nhiên hoặc ba âm thanh xung quanh.', 'Nếu tâm đi xa, nhận ra và quay lại điểm tựa một lần.', 'Kết thúc bằng việc nhìn quanh và cảm nhận nơi mình đang có mặt.'] },
        note: 'Thực tập này là lời mời, không phải yêu cầu. Dừng lại hoặc thay đổi điểm tựa nếu thấy không thoải mái; không cần cố giữ một trạng thái nào.',
      },
      en: {
        category: 'Practice',
        title: 'Returning is part of the practice',
        description: 'A short practice for noticing a wandering mind and gently returning to the breath.',
        imageAlt: 'A meditation cushion and a small vessel in a quiet forest clearing.',
        introduction: 'Sometimes, just after sitting down, we find ourselves in an old conversation, a list of tasks or something that has not happened yet. This does not mean we are practising incorrectly. The moment of noticing is a place to begin again.',
        sections: [
          { title: 'Choose a simple anchor', paragraphs: [
            'You do not need to change your breathing. Notice the air at the nose, the movement of the belly or the contact between your feet and the ground. Choose what is easiest to recognise right now.',
            'If attention to the breath feels uncomfortable, open your eyes and choose a sound or an object in front of you. Your anchor can change with your needs.',
          ] },
          { title: 'Notice without scolding yourself', paragraphs: [
            'When you realise the mind has travelled, try a gentle name: “thinking”, “remembering”, “planning”. There is no need to chase the thought away or solve it immediately.',
            'Then return to your anchor. You may wander again a moment later. This repetition is part of the practice, rather than a test of your ability to keep the mind empty.',
          ] },
          { title: 'Bring one return into everyday life', paragraphs: [
            'Practise while waiting for the kettle, before opening a message or when standing up from your desk. Feel your feet, notice one breath, then continue what you were doing.',
            'A small moment, repeated patiently, brings attention into daily life without waiting for perfect conditions.',
          ] },
        ],
        practice: { title: 'Try it for one minute', steps: ['Sit or stand comfortably, with eyes open or gently closed.', 'Notice three natural breaths or three sounds around you.', 'If the mind travels, notice and return to your anchor once.', 'Finish by looking around and sensing where you are.'] },
        note: 'This practice is an invitation. Stop or change your anchor if you feel uncomfortable; there is no state you have to maintain.',
      },
    },
  },
  {
    slug: 'seven-layers',
    image: '/media/fern-study-v2.webp',
    minutes: 5,
    translations: {
      vi: {
        category: 'Chiêm nghiệm',
        title: 'Bảy tầng — một bản đồ để tự hỏi',
        description: 'Tìm hiểu khung bảy tầng trải nghiệm của Hương Thiền Nature như một lời mời chiêm nghiệm cá nhân.',
        imageAlt: 'Những chiếc lá dương xỉ và rêu trên nền đất rừng.',
        introduction: 'Một bản đồ có thể giúp ta đặt câu hỏi, nhưng không thay thế trải nghiệm đang diễn ra. Khung bảy tầng của Hương Thiền Nature được chia sẻ theo tinh thần ấy: một cách nhìn do tác giả chiêm nghiệm, để mỗi người quan sát và tự tìm ngôn ngữ cho mình.',
        sections: [
          { title: 'Từ thân thể đến cách mình hiện diện', paragraphs: [
            'Một cách diễn giải đi qua thân thể; năng lượng và cảm xúc; tâm trí; giá trị và ý chí; tập khí và nghiệp lực; tánh biết; tánh không và duyên khởi. Một diễn giải khác trong tư liệu của tác giả gọi tên thân thể, cảm xúc, tâm trí, tinh thần, nhân quả, tánh biết và tánh không.',
            'Đây là những tên gọi để chiêm nghiệm, không phải các lớp giải phẫu hay một thang đo ý thức. Từ “năng lượng” ở đây diễn tả cảm nhận chủ quan; không khẳng định một đại lượng vật lý có thể đo được.',
          ] },
          { title: 'Dùng bản đồ bằng những câu hỏi nhỏ', paragraphs: [
            'Thay vì tự xếp mình vào một tầng, thử hỏi: thân đang cảm thấy gì? Cảm xúc nào đang có mặt? Câu chuyện nào mình đang lặp lại? Điều gì đang quan trọng với mình?',
            'Không nhất thiết phải có câu trả lời. Đôi khi nhận ra một sự căng ở vai, một cảm xúc chưa được gọi tên, hay một thói quen quen thuộc đã là đủ cho lần quan sát này.',
          ] },
          { title: 'Giữ khoảng mở giữa các cách hiểu', paragraphs: [
            'Tư liệu gốc có những liên hệ với thuật ngữ Phật học và Yoga Vedanta. Những liên hệ đó là phép so sánh của dự án, không chứng minh các truyền thống dạy cùng một hệ thống.',
            'Bạn có thể giữ phần hữu ích cho sự tự quan sát và để phần chưa phù hợp sang một bên. Khung này không dùng để chẩn đoán, đánh giá sức khỏe hay phân loại người khác.',
          ] },
        ],
        practice: { title: 'Một ghi chép không cần kết luận', steps: ['Viết một câu về cảm giác của thân trong lúc này.', 'Gọi tên một cảm xúc, nếu nhận ra được.', 'Ghi lại một điều mình đang coi trọng.', 'Đọc lại bằng sự tò mò, không chấm điểm hoặc xếp tầng.'] },
        note: 'Đây là khung chiêm nghiệm cá nhân, không phải mô hình khoa học phổ quát hay công cụ lâm sàng. Những thực tập trên website không thay thế chăm sóc chuyên môn.',
      },
      en: {
        category: 'Reflection',
        title: 'Seven layers — a map for asking questions',
        description: 'Explore the seven-layer framework of Hương Thiền Nature as an invitation to personal reflection.',
        imageAlt: 'Fern leaves and moss on the woodland floor.',
        introduction: 'A map can help us ask questions, but it cannot replace experience as it happens. The seven-layer framework of Hương Thiền Nature is offered in that spirit: a personal lens developed by its author, leaving room for each person to observe and find their own language.',
        sections: [
          { title: 'From the body to how we are present', paragraphs: [
            'One expression moves through body; energy and emotion; mind; values and intention; habit and karmic patterns; awareness; openness and dependent arising. Another expression in the author’s materials names body, emotion, mind, spirit, karma, awareness and emptiness.',
            'These are prompts for contemplation, rather than anatomical layers or a scale of consciousness. “Energy” describes subjective experience here; it does not assert a measurable physical quantity.',
          ] },
          { title: 'Use the map through small questions', paragraphs: [
            'Instead of assigning yourself a layer, try asking: what does the body feel? Which emotion is present? What story am I repeating? What matters to me right now?',
            'An answer is not required. Sometimes noticing tension in a shoulder, an unnamed feeling or a familiar habit is enough for this moment of observation.',
          ] },
          { title: 'Leave room between interpretations', paragraphs: [
            'The source materials make comparisons with Buddhist and Yoga Vedanta terms. These are the project’s analogies; they do not establish that the traditions teach an identical system.',
            'Keep what supports your observation and set aside what does not fit. This framework is not for diagnosis, health assessment or classifying other people.',
          ] },
        ],
        practice: { title: 'A note that needs no conclusion', steps: ['Write one sentence about what the body feels right now.', 'Name an emotion, if you can recognise one.', 'Note one thing that matters to you.', 'Read it back with curiosity, without scoring or assigning layers.'] },
        note: 'This is a personal contemplative framework, not a universal scientific model or clinical tool. The practices on this site do not replace professional care.',
      },
    },
  },
  {
    slug: 'listening-to-nature',
    image: '/media/woodland-stream-v2.webp',
    minutes: 4,
    translations: {
      vi: {
        category: 'Thiên nhiên',
        title: 'Lắng nghe nơi mình đang đứng',
        description: 'Một cách quan sát thiên nhiên bằng giác quan, sự tò mò và những ghi chép không vội diễn giải.',
        imageAlt: 'Dòng suối nhỏ đi qua đá và cây xanh trong rừng.',
        introduction: 'Không phải lúc nào ta cũng có thể đi vào rừng. Một chiếc lá bên cửa sổ, bóng nắng trên tường hay âm thanh của gió cũng có thể là điểm bắt đầu để gặp thế giới sống quanh mình.',
        sections: [
          { title: 'Quan sát trước khi diễn giải', paragraphs: [
            'Chọn một điều ở gần: thân cây, đám mây, một chậu cây. Nhận biết màu sắc, đường nét, độ sáng và chuyển động. Thử mô tả những gì đang thấy trước khi tìm ý nghĩa.',
            'Giữ khoảng cách phù hợp, đi trên lối được phép và không hái hoặc chạm vào cây lạ. Sự chú tâm cũng bao gồm việc chăm sóc nơi mình ghé qua.',
          ] },
          { title: 'Nghe cả những âm thanh bình thường', paragraphs: [
            'Bạn có thể nghe tiếng chim cùng tiếng xe, tiếng lá cùng tiếng người. Không cần loại bỏ những âm thanh “không đủ thiên nhiên”. Chỉ nhận biết nơi âm thanh đến và đi.',
            'Nếu môi trường quá ồn hoặc không an toàn, hãy chọn một nơi khác hay quay về một điểm tựa gần hơn. Không cần cố hoàn thành bài tập.',
          ] },
          { title: 'Để ý nghĩa được rộng mở', paragraphs: [
            'Một thay đổi của trời hay một chiếc lá có thể gợi lên điều gì đó riêng với bạn. Bạn có thể viết lại cảm xúc ấy mà không xem nó là bằng chứng của một thông điệp từ thiên nhiên.',
            'Những cách nói như “cộng hưởng” hoặc “kết nối năng lượng” trong tư liệu của dự án được hiểu như ẩn dụ chiêm nghiệm. Thực tập ở đây bắt đầu bằng giác quan và sự quan sát, không bằng lời hứa về khả năng đặc biệt.',
          ] },
        ],
        practice: { title: 'Một cuộc gặp ba phút', steps: ['Chọn một nơi an toàn và một điều tự nhiên có thể quan sát.', 'Nhận biết ba chi tiết bằng mắt và ba âm thanh, nếu có.', 'Ghi một câu về điều đã thấy, một câu về điều đã cảm nhận.', 'Rời đi nhẹ nhàng, để nơi ấy nguyên vẹn.'] },
        note: 'Thực tập tùy chọn, có thể thực hiện trong nhà. Tôn trọng môi trường và giới hạn của bản thân; cảm nhận cá nhân không phải phép đo khoa học hay lời khuyên y khoa.',
      },
      en: {
        category: 'Nature',
        title: 'Listen to the place where you stand',
        description: 'A sensory practice for observing nature with curiosity and notes that leave room for interpretation.',
        imageAlt: 'A small stream flowing between rocks and green plants in a woodland.',
        introduction: 'We cannot always go into a forest. A leaf by a window, sunlight on a wall or the sound of wind can also be a beginning for meeting the living world around us.',
        sections: [
          { title: 'Observe before interpreting', paragraphs: [
            'Choose something nearby: a tree trunk, a cloud, a potted plant. Notice colour, lines, light and movement. Try describing what you see before looking for meaning.',
            'Keep a suitable distance, stay on permitted paths and avoid picking or touching unfamiliar plants. Attention includes caring for the place you visit.',
          ] },
          { title: 'Listen to ordinary sounds too', paragraphs: [
            'You may hear birds alongside traffic, leaves alongside people. There is no need to remove sounds that are not “natural enough”. Just notice where sounds arrive and pass.',
            'If the setting is too loud or unsafe, choose another place or a closer anchor. There is no need to finish the exercise.',
          ] },
          { title: 'Leave meaning open', paragraphs: [
            'A changing sky or a leaf may bring up something personal. You can write about that feeling without treating it as evidence of a message from nature.',
            'Language such as “resonance” or “energy connection” in the project’s materials is treated as contemplative metaphor. This practice begins with the senses and observation, rather than promises of special abilities.',
          ] },
        ],
        practice: { title: 'A three-minute encounter', steps: ['Choose a safe place and something natural you can observe.', 'Notice three visual details and three sounds, if available.', 'Write one sentence about what you observed and one about what you felt.', 'Leave gently, keeping the place intact.'] },
        note: 'This optional practice can be done indoors. Respect the environment and your own limits; personal feelings are not scientific measurements or medical advice.',
      },
    },
  },
];

export function articlePath(lang: Language, slug: string) {
  return `/${lang}/journal/${slug}/`;
}
