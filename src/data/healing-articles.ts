import type { Article, ArticleTranslation } from './articles';

// Five reflections for people on a healing journey (2.14.0). Vietnamese is the full text; English is a faithful,
// shorter version, following the pattern of the other journal articles. Covers are real photographs from the album.

const words = (t: ArticleTranslation) =>
  [t.introduction, ...t.sections.flatMap(section => section.paragraphs), ...t.practice.steps].join(' ').trim().split(/\s+/).length;

function healingArticle(base: Omit<Article, 'minutes' | 'minutesVi'>): Article {
  return {
    ...base,
    minutes: Math.max(3, Math.ceil(words(base.translations.en) / 200)),
    minutesVi: Math.ceil(words(base.translations.vi) / 180),
  };
}

export const healingArticles: Article[] = [
  healingArticle({
    slug: 'healing-as-coming-home',
    viSlug: 'chua-lanh-la-tro-ve',
    image: '/media/journey/beach-sit-side.webp',
    publishedAt: '2026-11-24',
    level: 'beginner',
    keywords: { vi: 'chữa lành, làm bạn với mình, tự thương, tổn thương, chánh niệm', en: 'healing, self-compassion, befriending yourself, hurt, mindfulness' },
    relatedSlugs: ['staying-with-strong-emotions', 'loving-kindness-meditation', 'returning-attention'],
    translations: {
      vi: {
        category: 'Chữa lành',
        title: 'Chữa lành không phải là trở thành một người khác',
        description: 'Khi chữ “chữa lành” trở thành thêm một áp lực, có lẽ điều mình cần là thôi bỏ rơi người mình đang là, và học cách làm bạn với chính mình.',
        imageAlt: 'Một người phụ nữ ngồi nghiêng trên bãi cát, mắt khép, nhìn ra biển.',
        introduction: 'Có một thời gian, mình nghĩ chữa lành là một cái đích. Ở đó mình sẽ không còn buồn vô cớ, không còn giật mình khi nghe một câu nói quen, không còn những đêm nằm nhìn trần nhà. Mình đọc sách, đi khóa học, ghi chép, cố gắng rất nhiều. Rồi một buổi chiều ngồi bên biển, nhìn sóng cứ đến rồi đi, mình chợt hiểu: có lẽ chữa lành không phải là trở thành một người khác, mà là thôi bỏ rơi người mình đang là.',
        sections: [
          { title: 'Khi chữ “chữa lành” trở thành thêm một áp lực', paragraphs: [
            'Chữ “chữa lành” bây giờ xuất hiện ở khắp nơi: trên mạng xã hội, trong tên các khóa học, trên bìa sách. Điều đó có mặt tốt, vì nhiều người đã dám thừa nhận rằng mình đang đau. Nhưng nó cũng có thể biến thành một danh sách việc phải làm: phải tha thứ, phải buông bỏ, phải tích cực, phải biết ơn. Và nếu chưa làm được, mình lại thấy mình hỏng thêm một chút.',
            'Nếu bạn từng thấy mệt chính vì cố gắng chữa lành, bạn không đơn độc. Cái mệt ấy là một tín hiệu đáng nghe. Nó cho biết có thể mình đang đối xử với nỗi đau như một vết bẩn cần tẩy đi, thay vì một phần của mình đang cần được nhìn thấy.',
            'Trong thực hành thiền, người ta hay nói về sự có mặt. Có mặt không có nghĩa là mọi thứ phải dễ chịu. Có mặt nghĩa là mình không bỏ đi khi bên trong khó chịu. Chữa lành, theo nghĩa giản dị nhất, có thể bắt đầu từ đó.',
          ] },
          { title: 'Những phần trong mình đã từng bảo vệ mình', paragraphs: [
            'Hãy thử nhìn lại một thói quen bạn không thích ở mình: hay lo xa, khó từ chối, luôn muốn mọi thứ hoàn hảo, hay im lặng khi buồn. Rất nhiều khi, những thói quen ấy từng là cách tốt nhất mình có để đi qua một giai đoạn khó. Một đứa trẻ lớn lên trong ngôi nhà hay to tiếng có thể học cách đọc nét mặt người lớn thật nhanh. Một người từng bị bỏ lại có thể học cách không cần ai.',
            'Khi nhìn như vậy, mình bớt muốn chiến đấu với chính mình. Mình có thể nói với phần lo âu ấy: “Cảm ơn vì đã cố giữ an toàn cho mình. Bây giờ mình đã lớn hơn, mình có thêm những cách khác.” Câu nói ấy không làm nỗi lo biến mất ngay, nhưng nó đổi giọng điệu của cuộc đối thoại bên trong, từ trách móc sang thấu hiểu.',
            'Thấu hiểu không có nghĩa là chấp nhận mọi hành vi làm tổn thương mình hay người khác. Nó chỉ có nghĩa là mình bắt đầu từ sự tò mò thay vì từ sự xấu hổ. Và sự tò mò thường mở ra nhiều cánh cửa hơn.',
          ] },
          { title: 'Chậm lại để nghe điều cơ thể đang giữ', paragraphs: [
            'Nhiều điều mình chưa nói được thành lời vẫn nằm trong cơ thể: một bờ vai luôn gồng, một cái hàm nghiến lúc ngủ, một hơi thở ngắn lại mỗi khi điện thoại reo. Thiền không đòi hỏi bạn giải mã tất cả những điều đó. Chỉ cần nhận ra: “À, vai mình đang căng.” Rồi để hơi thở chạm vào chỗ ấy một chút.',
            'Có những ngày, quay vào cơ thể lại làm mình thấy khó chịu hơn. Điều đó bình thường. Bạn có thể mở mắt, nhìn quanh phòng, gọi tên năm thứ mình thấy, cảm nhận bàn chân trên sàn. Chọn một điểm tựa an toàn trước, rồi mới quay vào bên trong. Không ai bắt bạn phải đi sâu hơn mức mình sẵn sàng.',
            'Lắng nghe cơ thể cũng là học lại cách chăm sóc những nhu cầu rất thường: ngủ đủ, ăn một bữa ấm, ra ngoài nắng, uống nước, đi bộ một đoạn. Nghe có vẻ quá đơn giản để gọi là chữa lành, nhưng một tâm trí kiệt sức khó lòng nhìn đời dịu dàng.',
          ] },
          { title: 'Chữa lành không đi một đường thẳng', paragraphs: [
            'Có tuần bạn thấy nhẹ nhõm, nghĩ rằng mọi chuyện đã qua. Rồi một mùi hương, một bài hát, một ngày kỷ niệm kéo bạn về đúng chỗ cũ. Rất dễ kết luận rằng mình chẳng tiến bộ gì. Nhưng nếu để ý kỹ, có thể lần này bạn nhận ra sớm hơn, ở lại với nó lâu hơn một chút, hoặc đứng dậy nhanh hơn một chút.',
            'Hình ảnh mình hay nghĩ tới là những con sóng. Biển không hỏng khi có sóng. Sóng đến, rồi rút, rồi lại đến. Điều thay đổi theo thời gian không phải là hết sóng, mà là mình học được cách đứng trên bờ cát mà không bị cuốn đi.',
            'Vì vậy, thay vì hỏi “Bao giờ mình mới khỏi?”, bạn có thể thử hỏi “Hôm nay mình cần gì?”. Câu hỏi thứ hai nhỏ hơn, và trả lời được.',
            'Bạn cũng có thể ghi lại những dấu hiệu nhỏ của sự thay đổi: lần đầu tiên dám nói một điều mình cần, một buổi sáng thức dậy không thấy nặng, một lần bỏ qua lời tự trách. Những dấu hiệu ấy dễ bị quên nếu mình chỉ chăm chăm nhìn vào chỗ còn đau. Khi đọc lại, bạn sẽ thấy con đường mình đã đi dài hơn mình nghĩ.',
          ] },
          { title: 'Không ai phải đi một mình', paragraphs: [
            'Có một hiểu lầm khá phổ biến rằng người tỉnh thức thì phải tự mình vượt qua mọi chuyện. Thật ra, con người lớn lên và lành lại trong các mối quan hệ. Một người bạn chịu ngồi nghe, một nhóm thực hành cùng nhau mỗi tuần, một người hướng dẫn hiểu con đường mình đang đi, tất cả đều là một phần của việc chữa lành.',
            'Có những lúc, điều cần thiết nhất là một chuyên gia: bác sĩ, nhà tâm lý, nhà trị liệu. Tìm đến họ không có nghĩa là thiền thất bại hay bạn yếu đuối. Nó có nghĩa là bạn đang chăm sóc mình bằng tất cả những nguồn lực có thể. Thiền và chánh niệm có thể đi cùng, không cần thay thế.',
            'Nếu bạn chưa biết bắt đầu kể với ai, hãy bắt đầu bằng việc viết. Vài dòng mỗi tối về điều mình thấy, điều mình cảm, điều mình cần. Trang giấy không phán xét. Đôi khi, chỉ cần thấy cảm xúc của mình nằm yên trên giấy, mình đã thấy nó bớt nặng.',
          ] },
          { title: 'Trở về làm bạn với mình', paragraphs: [
            'Nếu phải gói lại bằng một câu, mình sẽ nói: chữa lành là học cách làm bạn với chính mình, kể cả vào những ngày mình không dễ thương. Một người bạn tốt không đợi bạn hoàn hảo mới ngồi cạnh. Một người bạn tốt chỉ nói: “Hôm nay bạn mệt à? Ngồi xuống đây một lát.”',
            'Bạn có thể tập nói câu ấy với chính mình. Lúc đầu nghe có vẻ gượng. Không sao. Nhiều điều tử tế lúc đầu đều gượng, rồi dần thành quen. Mỗi lần bạn chọn dừng lại thay vì tự trách, bạn đang đặt thêm một viên gạch cho ngôi nhà bên trong.',
            'Ngôi nhà ấy không cần lộng lẫy. Chỉ cần đủ ấm để bạn biết rằng, dù ngoài kia có ra sao, bạn vẫn có một chỗ để quay về.',
          ] },
        ],
        practice: { title: 'Năm phút làm bạn với mình', steps: [
          'Ngồi hoặc nằm ở tư thế dễ chịu; mắt mở hay khép tùy bạn.',
          'Đặt một bàn tay lên ngực hoặc lên bụng, nơi bạn thấy dễ chịu nhất, và cảm nhận hơi ấm của bàn tay.',
          'Hỏi khẽ: “Lúc này mình đang cảm thấy gì?” Gọi tên bằng một hai chữ, như “mệt”, “lo”, “trống”.',
          'Nói với mình một câu bạn sẽ nói với một người bạn thân đang như vậy, chẳng hạn: “Không sao, mình ở đây với bạn.”',
          'Thở ba hơi chậm, để câu nói ấy lắng xuống.',
          'Hỏi: “Hôm nay mình cần một điều nhỏ nào?” rồi chọn một việc làm được trong ngày.',
        ] },
        note: 'Bài viết chia sẻ góc nhìn chiêm nghiệm, không phải lời khuyên y khoa hay trị liệu. Nếu bạn đang trải qua giai đoạn quá sức, có ý nghĩ làm hại bản thân, hoặc cảm xúc kéo dài ảnh hưởng đến sinh hoạt, hãy tìm đến bác sĩ, chuyên gia tâm lý hoặc người thân tin cậy.',
        cta: { label: 'Thử thiền tâm từ với chính mình', slug: 'loving-kindness-meditation' },
      },
      en: {
        category: 'Healing',
        title: 'Healing is not becoming someone else',
        description: 'When “healing” becomes one more pressure, perhaps what we need is to stop abandoning the person we already are, and learn to befriend ourselves.',
        imageAlt: 'A woman sits sideways on the sand with her eyes closed, facing the sea.',
        introduction: 'For a while I thought of healing as a destination, a place where I would no longer feel sad for no reason or lie awake staring at the ceiling. I read, took courses and tried very hard. Then one afternoon by the sea, watching the waves come and go, I understood that healing may not mean becoming someone else. It may mean no longer abandoning who I already am.',
        sections: [
          { title: 'When “healing” becomes another pressure', paragraphs: [
            'Healing language is everywhere now, and it has helped many people admit that they hurt. It can also turn into a list of duties: forgive, let go, be positive, be grateful. When we cannot tick them off, we feel even more broken.',
            'If trying to heal has exhausted you, that tiredness is worth listening to. Presence does not mean everything feels pleasant. It means not leaving when things feel hard inside.',
          ] },
          { title: 'The parts of us that once protected us', paragraphs: [
            'Many habits we dislike, such as worrying ahead, struggling to say no or going quiet when sad, were once the best way we had to get through a difficult time. Seen this way, we can thank them instead of fighting them: “Thank you for trying to keep me safe. I have other ways now.”',
            'Understanding is not the same as accepting harm. It simply means starting from curiosity rather than shame.',
          ] },
          { title: 'Listening to the body, at your own pace', paragraphs: [
            'Much of what we cannot yet say lives in the body: tight shoulders, a clenched jaw, short breaths when the phone rings. Noticing is enough. If turning inward feels too much, open your eyes, name five things you see and feel your feet on the floor first.',
            'Healing also means caring for ordinary needs: sleep, a warm meal, sunlight, water, a short walk.',
          ] },
          { title: 'Not a straight line, and not alone', paragraphs: [
            'Some weeks feel lighter, then a song or an anniversary brings old pain back. Perhaps this time you notice it sooner or stand up a little faster. Instead of asking “When will I be fixed?”, try asking “What do I need today?”',
            'We heal in relationship: a friend who listens, a group that practises together, and sometimes a doctor or therapist. Seeking professional help is not a failure of meditation; the two can go together. Learning to befriend yourself, even on unlovable days, is a home you can always return to.',
          ] },
        ],
        practice: { title: 'Five minutes of befriending yourself', steps: [
          'Sit or lie comfortably, with your eyes open or closed.',
          'Rest a hand on your chest or belly and feel its warmth.',
          'Ask softly what you feel right now and name it in a word or two.',
          'Say what you would tell a close friend in your place, such as “It’s all right, I’m here with you.”',
          'Take three slow breaths and choose one small thing you need today.',
        ] },
        note: 'This is a contemplative reflection, not medical or therapeutic advice. If you feel overwhelmed, have thoughts of harming yourself, or your feelings affect daily life for a long time, please contact a doctor, a mental health professional or someone you trust.',
        cta: { label: 'Try loving-kindness towards yourself', slug: 'loving-kindness-meditation' },
      },
    },
  }),

  healingArticle({
    slug: 'staying-with-strong-emotions',
    viSlug: 'o-lai-voi-cam-xuc-manh',
    image: '/media/journey/beach-meditate-calm.webp',
    publishedAt: '2026-11-24',
    level: 'beginner',
    keywords: { vi: 'cảm xúc, giận dữ, lo âu, buồn, gọi tên cảm xúc, khoảng dừng', en: 'emotions, anger, anxiety, sadness, naming feelings, pause' },
    relatedSlugs: ['healing-as-coming-home', 'breath-meditation', 'wandering-mind'],
    translations: {
      vi: {
        category: 'Cảm xúc',
        title: 'Ở lại với một cơn cảm xúc mạnh',
        description: 'Giận, lo, buồn có thể đến như một cơn sóng. Bốn bước nhỏ để dừng lại, gọi tên, cho phép và chăm sóc mình, thay vì để cơn sóng quyết định thay mình.',
        imageAlt: 'Một người phụ nữ đội mũ đan ngồi xếp bằng trên bãi cát, mắt nhắm.',
        introduction: 'Bạn còn nhớ lần gần nhất mình nói một câu rồi hối hận ngay sau đó không? Có thể là một tin nhắn gửi đi lúc nóng giận, một lời nặng với người thân, hay một buổi tối ngồi khóc mà không hiểu vì sao. Cảm xúc mạnh không xấu. Chúng là một phần rất người của mình. Điều làm mình khổ thường không phải bản thân cảm xúc, mà là những gì mình làm khi bị nó cuốn đi.',
        sections: [
          { title: 'Cảm xúc đến như thời tiết', paragraphs: [
            'Có ngày trời nắng, có ngày mưa giông. Không ai trách bầu trời vì có mây. Cảm xúc cũng vậy: chúng đến vì có điều kiện, rồi thay đổi khi điều kiện thay đổi. Một đêm thiếu ngủ, một cái bụng đói, một lời nói chạm vào vết thương cũ, tất cả đều có thể làm cơn giông lớn hơn.',
            'Hiểu như vậy không có nghĩa là mình phải chịu đựng mọi cơn giông. Nó chỉ giúp mình bớt thêm một lớp khổ thứ hai: “Sao mình lại như thế này? Mình tệ quá.” Lớp khổ ấy thường nặng hơn chính cảm xúc ban đầu.',
            'Lần tới khi một cảm xúc mạnh đến, bạn có thể thử nói thầm: “Đây là một cơn giông. Nó đang đi qua.” Câu nói không làm mưa tạnh, nhưng nhắc mình rằng mình là bầu trời, không chỉ là đám mây.',
          ] },
          { title: 'Khoảng dừng giữa cảm xúc và phản ứng', paragraphs: [
            'Giữa lúc cảm xúc dâng lên và lúc mình hành động, luôn có một khoảng rất nhỏ. Khi đang bị cuốn, khoảng ấy gần như không thấy được. Thực hành chánh niệm, ở một góc độ, là tập mở rộng khoảng dừng đó từng chút một.',
            'Khoảng dừng có thể chỉ là một hơi thở. Hít vào, cảm nhận không khí đi vào. Thở ra, cảm nhận vai hạ xuống. Có khi là đặt điện thoại xuống bàn thay vì bấm gửi. Có khi là nói: “Cho mình vài phút, mình sẽ quay lại nói chuyện tiếp.”',
            'Bạn không cần dừng hoàn hảo. Chỉ cần dừng được một lần trong mười lần, đó đã là một hạt giống. Lần sau, hạt giống ấy sẽ dễ nảy hơn.',
            'Bạn có thể chuẩn bị trước cho khoảng dừng ấy, như chuẩn bị một chiếc ô cho ngày mưa. Chọn sẵn một câu nhắc ngắn, chẳng hạn “thở trước đã”, và dùng nó nhiều lần trong những lúc bình thường, để khi giông đến, câu ấy tự bật lên.',
          ] },
          { title: 'Gọi tên để thấy rõ hơn', paragraphs: [
            'Khi cảm xúc còn là một khối mù mịt, nó rất đáng sợ. Khi mình gọi được tên, nó trở nên cụ thể hơn, và vì vậy dễ ở cùng hơn. Hãy thử nói thầm: “Đây là giận.” “Đây là sợ bị bỏ rơi.” “Đây là buồn vì không được hiểu.”',
            'Đôi khi, bên dưới một cảm xúc lại có một cảm xúc khác. Cơn giận với người thân có thể đang che một nỗi tủi thân. Sự cáu kỉnh có thể là mệt mỏi chưa được nghỉ. Gọi tên không phải để phân tích mình đến tận cùng, mà để thấy đúng hơn điều đang thật sự cần chăm sóc.',
            'Nếu chưa tìm được chữ, bạn có thể mô tả cảm giác trong cơ thể: “Ngực mình nóng.” “Bụng mình thắt lại.” “Cổ họng nghẹn.” Cơ thể luôn ở hiện tại, và vì thế nó là một điểm tựa tốt.',
          ] },
          { title: 'Khi cảm xúc mang theo một vết thương cũ', paragraphs: [
            'Có những lúc phản ứng của mình lớn hơn nhiều so với chuyện vừa xảy ra. Một người đến trễ năm phút mà mình thấy bị bỏ rơi. Một lời góp ý nhỏ mà mình thấy như bị phủ nhận cả con người. Khi đó, có thể cảm xúc không chỉ đến từ hôm nay, mà còn mang theo dư âm của những lần cũ.',
            'Nhận ra điều này không phải để đổ lỗi cho quá khứ, mà để đối xử với mình dịu dàng hơn. Bạn có thể nói: “Có lẽ phần trong mình đang đau không chỉ vì chuyện này. Nó nhắc mình về một điều cũ.” Chỉ cần thấy được hai lớp ấy, phản ứng của bạn với người trước mặt thường đã công bằng hơn.',
            'Nếu những vết thương cũ thường xuyên trỗi dậy và làm bạn khó sống, đó là điều đáng được chăm sóc kỹ hơn cùng một nhà trị liệu. Bạn không cần tự mình gỡ hết mọi nút thắt.',
          ] },
          { title: 'Cho phép, nhưng không chạy theo', paragraphs: [
            'Cho phép một cảm xúc có mặt khác với làm theo nó. Bạn có thể cho phép mình giận mà không cần nói lời làm tổn thương. Bạn có thể cho phép mình sợ mà không cần bỏ chạy. Cho phép nghĩa là mình thôi chống lại điều đã có, để năng lượng không bị dồn nén thêm.',
            'Một hình ảnh có thể giúp: hãy tưởng tượng cảm xúc như một đứa trẻ đang khóc. Quát nó im thì nó khóc to hơn. Bỏ mặc nó thì nó thấy cô đơn. Nhưng nếu mình ngồi xuống bên cạnh, nhẹ nhàng nói “Mình biết, mình ở đây”, dần dần tiếng khóc sẽ dịu lại.',
            'Nhiều người thấy một chuỗi bước tương tự rất hữu ích, như phương pháp RAIN do giáo viên thiền Tara Brach phổ biến: nhận ra, cho phép, tìm hiểu với sự tử tế, rồi nuôi dưỡng. Tên gọi không quan trọng bằng tinh thần: ở lại với mình bằng sự dịu dàng.',
          ] },
          { title: 'Chăm sóc sau cơn sóng', paragraphs: [
            'Khi cơn cảm xúc đã đi qua, cơ thể thường mệt như vừa chạy một quãng dài. Đó là lúc cần được chăm sóc: uống một ly nước ấm, ra ngoài hít thở, rửa mặt, nằm nghỉ vài phút. Đừng vội đòi hỏi mình phải lập tức sáng suốt hay tích cực.',
            'Sau đó, nếu được, hãy nhìn lại với sự tò mò: Điều gì đã chạm vào mình? Mình cần gì mà chưa có? Có điều gì mình muốn nói lại với ai đó, bằng giọng bình tĩnh hơn? Viết vài dòng có thể giúp bạn hiểu mình hơn mà không phải nghĩ mãi trong đầu.',
            'Nếu bạn đã lỡ nói hay làm điều gì khiến người khác tổn thương, lời xin lỗi chân thành cũng là một phần của sự chăm sóc. Nó chữa lành cả cho bạn lẫn cho mối quan hệ.',
          ] },
          { title: 'Khi nào cần nhiều hơn một khoảng thở', paragraphs: [
            'Có những cảm xúc quá lớn để một hơi thở có thể giữ. Nếu bạn thường xuyên thấy hoảng loạn, buồn kéo dài nhiều tuần, mất ngủ, hoặc có ý nghĩ làm hại bản thân, đó là lúc cần thêm sự hỗ trợ từ chuyên gia. Thiền có thể đi cùng, nhưng không nên là chỗ dựa duy nhất.',
            'Tìm đến bác sĩ hay nhà tâm lý cũng là một hành động chánh niệm: mình nhận ra giới hạn của mình và chọn chăm sóc mình bằng cách phù hợp. Không có gì đáng xấu hổ ở đó.',
            'Và nếu chỉ là một ngày khó, hãy nhớ rằng ngày nào rồi cũng kết thúc. Bầu trời vẫn ở đó, sau mọi cơn giông.',
          ] },
        ],
        practice: { title: 'Bốn bước khi cảm xúc dâng lên', steps: [
          'Dừng: đặt việc đang làm xuống, cảm nhận hai bàn chân trên sàn và thở ra chậm một lần.',
          'Gọi tên: nói thầm “Đây là…” cùng tên cảm xúc, hoặc mô tả cảm giác trong cơ thể.',
          'Cho phép: đặt tay lên chỗ cơ thể đang căng và nói “Không sao, mình cho phép cảm giác này có mặt.”',
          'Chăm sóc: hỏi “Lúc này mình cần gì?” và làm một việc nhỏ, như uống nước hay ra ngoài vài phút.',
          'Khi đã dịu lại, nếu cần, mới quay lại giải quyết vấn đề hoặc trò chuyện với người liên quan.',
        ] },
        note: 'Thực tập này dành cho những cảm xúc thường ngày. Nếu cảm xúc khiến bạn hoảng loạn, kéo dài nhiều tuần, hoặc bạn có ý nghĩ làm hại bản thân hay người khác, hãy tìm đến bác sĩ, chuyên gia tâm lý hoặc người thân ngay.',
        cta: { label: 'Tập một khoảng thở với thiền hơi thở', slug: 'breath-meditation' },
      },
      en: {
        category: 'Emotions',
        title: 'Staying with a strong emotion',
        description: 'Anger, worry and sadness can arrive like a wave. Four small steps to pause, name, allow and care for yourself, so that the wave does not decide for you.',
        imageAlt: 'A woman in a crocheted hat sits cross-legged on the sand with her eyes closed.',
        introduction: 'Do you remember the last time you said something and regretted it at once? Strong emotions are not bad; they are deeply human. What hurts us is often not the feeling itself but what we do while it carries us away.',
        sections: [
          { title: 'Emotions arrive like weather', paragraphs: [
            'Feelings come when conditions are present and change when conditions change. Lack of sleep, hunger or a word that touches an old wound can make the storm bigger. Remembering this spares us a second layer of suffering: “What is wrong with me?”',
            'Try whispering: “This is a storm. It is passing.” You are the sky, not only the cloud.',
          ] },
          { title: 'The pause, and the name', paragraphs: [
            'Between a rising feeling and our reaction there is always a small gap. Mindfulness widens it, one breath at a time: put the phone down instead of pressing send, or say “Give me a few minutes.”',
            'Naming makes a feeling concrete: “This is anger.” “This is fear of being left.” Beneath anger there may be hurt; beneath irritation, tiredness. If words do not come, describe the body: a hot chest, a tight stomach.',
          ] },
          { title: 'Allow without following', paragraphs: [
            'Allowing a feeling is different from acting on it. Imagine a crying child: shouting makes it louder, ignoring it makes it lonely, sitting beside it lets it settle. Many people find a sequence such as RAIN, popularised by the meditation teacher Tara Brach, helpful. The spirit matters more than the name: stay with yourself kindly.',
            'Afterwards, care for the body with water, fresh air or rest. Later, look back with curiosity, and apologise sincerely if you hurt someone.',
          ] },
          { title: 'When you need more than a breath', paragraphs: [
            'If you often feel panic, sadness that lasts for weeks, sleeplessness or thoughts of harming yourself, please seek professional support. Meditation can accompany that care but should not be your only support. After every storm, the sky is still there.',
          ] },
        ],
        practice: { title: 'Four steps when a feeling rises', steps: [
          'Pause: set down what you are doing, feel your feet and breathe out slowly.',
          'Name: whisper “This is…” or describe the sensation in your body.',
          'Allow: rest a hand where you feel tense and say “It’s all right for this to be here.”',
          'Care: ask what you need now and do one small thing.',
          'Return to the problem or the conversation only once you have settled.',
        ] },
        note: 'This practice is for everyday emotions. If feelings bring panic, last for weeks or include thoughts of harming yourself or others, contact a doctor, a mental health professional or someone you trust right away.',
        cta: { label: 'Practise a pause with breath meditation', slug: 'breath-meditation' },
      },
    },
  }),

  healingArticle({
    slug: 'gentle-boundaries',
    viSlug: 'ranh-gioi-mem',
    image: '/media/journey/hug-closeup.webp',
    publishedAt: '2026-11-24',
    level: 'beginner',
    keywords: { vi: 'ranh giới, từ chối, quan hệ, kiệt sức, thương mình, thương người', en: 'boundaries, saying no, relationships, burnout, self-care, kindness' },
    relatedSlugs: ['loving-kindness-meditation', 'staying-with-strong-emotions', 'everyday-mindfulness'],
    translations: {
      vi: {
        category: 'Yêu thương & quan hệ',
        title: 'Ranh giới mềm: thương người mà không đánh mất mình',
        description: 'Người tử tế thường là người dễ kiệt sức nhất. Ranh giới không phải bức tường, mà là cách giữ cho tình thương của mình đủ lâu dài.',
        imageAlt: 'Hai người ôm nhau thân mật, nở nụ cười.',
        introduction: 'Có những người luôn có mặt khi ai đó cần. Họ nghe điện thoại lúc nửa đêm, nhận thêm việc dù đã quá tải, gật đầu trước khi kịp hỏi lòng mình. Họ được yêu quý, nhưng cũng thường là những người lặng lẽ kiệt sức nhất. Nếu bạn thấy mình trong những dòng này, bài viết này dành cho bạn. Không phải để bạn bớt thương người, mà để tình thương của bạn có thể đi được đường dài.',
        sections: [
          { title: 'Vì sao người tử tế hay kiệt sức', paragraphs: [
            'Nhiều người trong chúng ta lớn lên với niềm tin rằng mình chỉ đáng quý khi có ích. Từ chối ai đó giống như tự làm mình kém đi. Thế là mình nhận lời, nhận lời, nhận lời, cho đến khi cơ thể lên tiếng bằng những cơn đau đầu, mất ngủ, hoặc một sự cáu kỉnh mà chính mình cũng không hiểu.',
            'Kiệt sức không phải là dấu hiệu bạn chưa đủ tốt. Đó là dấu hiệu bạn đã cho đi nhiều hơn mức mình được nạp lại. Giống như một ngọn đèn dầu: muốn sáng lâu thì phải có dầu, và người châm dầu đầu tiên là chính bạn.',
            'Nhận ra điều này đôi khi khiến mình thấy có lỗi. Không sao. Cảm giác có lỗi ấy thường chỉ là thói quen cũ đang lên tiếng, không phải sự thật về con người bạn.',
          ] },
          { title: 'Ranh giới không phải bức tường', paragraphs: [
            'Khi nghe chữ “ranh giới”, nhiều người hình dung một bức tường lạnh lùng, cắt đứt. Nhưng ranh giới mềm giống một hàng rào thấp trong vườn hơn: nó cho người khác biết đâu là chỗ của mình, và vẫn có cổng để mời người thân vào.',
            'Ranh giới có thể rất nhỏ: “Sau chín giờ tối mình không trả lời tin nhắn công việc.” “Mình nghe được, nhưng hôm nay mình chỉ có hai mươi phút.” “Mình không muốn bàn về cân nặng của mình.” Những câu như vậy không làm ai tổn thương; chúng chỉ giúp mối quan hệ rõ ràng hơn.',
            'Một mối quan hệ lành mạnh có chỗ cho cả hai người. Khi bạn giữ ranh giới, bạn cũng đang ngầm cho người kia quyền được giữ ranh giới của họ.',
          ] },
          { title: 'Nhận ra ranh giới qua cơ thể', paragraphs: [
            'Làm sao biết mình đã đi quá ranh giới của mình? Cơ thể thường biết trước cả lý trí. Đó có thể là một cái thở dài khi thấy tên ai đó hiện trên màn hình, một cái bụng thắt lại trước một cuộc hẹn, hay cảm giác nặng trĩu sau khi nói “được”.',
            'Bạn có thể tập dừng lại một nhịp trước khi trả lời. Hít vào, hỏi khẽ: “Mình có thật sự muốn và có thể làm điều này không?” Nếu câu trả lời là chưa chắc, bạn hoàn toàn có thể nói: “Cho mình suy nghĩ rồi trả lời bạn sau nhé.”',
            'Khoảng dừng ấy là thực hành chánh niệm trong quan hệ. Nó không làm bạn trở nên ích kỷ; nó giúp lời “có” của bạn trở nên thật lòng hơn.',
          ] },
          { title: 'Nói “không” bằng giọng dịu', paragraphs: [
            'Từ chối không cần gay gắt. Một lời từ chối tử tế thường có ba phần: ghi nhận người kia, nói rõ giới hạn của mình, và nếu được thì gợi ý một cách khác. Chẳng hạn: “Mình biết chuyện này quan trọng với bạn. Tuần này mình không đủ sức nhận thêm. Tuần sau mình có thể giúp một phần, bạn thấy sao?”',
            'Bạn không nợ ai một lời giải thích dài. Càng giải thích nhiều, mình càng dễ bị thuyết phục ngược lại. Một câu ngắn, bình tĩnh, lặp lại nếu cần, thường đủ.',
            'Lúc đầu, nói “không” có thể làm tim bạn đập nhanh. Đó là cơ thể đang tập một điều mới. Hãy thở, và cho mình thời gian.',
            'Bạn có thể tập trước với những tình huống nhẹ nhàng, chẳng hạn từ chối một lời mời không quá quan trọng, hay xin dời một cuộc hẹn khi đang mệt. Giống như tập một bài thể dục mới, bắt đầu từ mức tạ nhẹ sẽ giúp bạn có thêm tự tin cho những lần khó hơn về sau.',
          ] },
          { title: 'Khi người khác không vui với ranh giới của bạn', paragraphs: [
            'Không phải ai cũng vui khi bạn bắt đầu giữ ranh giới, nhất là những người đã quen với việc bạn luôn có mặt. Họ có thể buồn, trách, hoặc im lặng. Điều đó không có nghĩa là bạn sai. Nó chỉ có nghĩa là mối quan hệ đang điều chỉnh.',
            'Bạn có thể thương cảm với cảm xúc của họ mà không cần rút lại ranh giới. “Mình hiểu bạn thất vọng. Mình vẫn quý bạn, và mình vẫn cần giữ điều này.” Thương và vững có thể đi cùng nhau.',
            'Cũng có những người, sau một thời gian bỡ ngỡ, lại bắt đầu tôn trọng bạn hơn. Họ biết rằng khi bạn nói “được”, đó là thật lòng, và khi bạn nói “không”, đó không phải là sự xa cách. Sự rõ ràng, theo thời gian, thường làm mối quan hệ an toàn hơn cho cả hai người.',
            'Nếu một mối quan hệ chỉ tồn tại được khi bạn liên tục bỏ quên mình, có lẽ đó là lúc nhìn lại nó bằng sự trung thực, và nếu cần, tìm thêm sự hỗ trợ từ người bạn tin cậy hoặc chuyên gia.',
          ] },
          { title: 'Ranh giới với chính mình', paragraphs: [
            'Ranh giới không chỉ dành cho người khác. Có những ranh giới mình cần giữ với chính mình: không lướt điện thoại sau một giờ nhất định, không tự hứa thêm việc khi đã quá tải, không để giọng nói tự chê bai kéo dài cả buổi tối. Những ranh giới ấy bảo vệ năng lượng của bạn khỏi những thói quen làm mình hao mòn.',
            'Giữ ranh giới với mình cũng cần sự mềm mỏng. Nếu bạn lỡ thức khuya, hãy nhẹ nhàng bắt đầu lại vào tối hôm sau, thay vì kết luận rằng mình không có kỷ luật. Mỗi lần quay lại là một lần luyện tập, giống như trong thiền, khi tâm đi lang thang và mình đưa nó về.',
            'Bạn có thể tự hỏi mỗi tối: “Hôm nay có lúc nào mình đã bỏ quên nhu cầu của mình không? Lần tới, mình muốn làm khác đi một chút thế nào?” Câu trả lời không cần lớn. Một thay đổi nhỏ, được lặp lại, sẽ dần trở thành một nơi an toàn bên trong.',
          ] },
          { title: 'Thương mình cũng là thương người', paragraphs: [
            'Trong thiền tâm từ, người ta thường bắt đầu bằng việc gửi lời chúc lành đến chính mình trước, rồi mới đến người khác. Không phải vì mình quan trọng hơn ai, mà vì tình thương cần có gốc. Một cái cây không có rễ thì không thể che bóng cho ai lâu.',
            'Khi bạn nghỉ ngơi đủ, bạn nghe người khác kiên nhẫn hơn. Khi bạn không oán giận ngầm, lời giúp đỡ của bạn nhẹ nhàng hơn. Ranh giới, nhìn kỹ, chính là một món quà cho cả hai phía.',
            'Hôm nay, bạn có thể bắt đầu bằng một ranh giới thật nhỏ. Rồi quan sát xem điều gì thay đổi, bên trong mình và trong mối quan hệ.',
          ] },
        ],
        practice: { title: 'Tập một ranh giới nhỏ trong tuần này', steps: [
          'Nhớ lại một tình huống gần đây khiến bạn thấy nặng nề sau khi nói “được”.',
          'Để ý cảm giác trong cơ thể khi nhớ lại, và gọi tên nó bằng một chữ.',
          'Viết ra một ranh giới nhỏ bạn muốn thử, bằng một câu ngắn và dịu.',
          'Lần tới tình huống ấy đến, dừng một hơi thở trước khi trả lời.',
          'Nói câu bạn đã chuẩn bị; nếu chưa làm được, ghi nhận mà không tự trách.',
          'Cuối ngày, viết một dòng về điều bạn nhận thấy.',
        ] },
        note: 'Bài viết dành cho những mối quan hệ thường ngày. Nếu bạn đang ở trong một mối quan hệ có bạo lực, đe dọa hoặc kiểm soát, hãy ưu tiên an toàn của mình và tìm đến người tin cậy, cơ quan chức năng hoặc chuyên gia hỗ trợ.',
        cta: { label: 'Bắt đầu thiền tâm từ với chính mình', slug: 'loving-kindness-meditation' },
      },
      en: {
        category: 'Kindness & relationships',
        title: 'Gentle boundaries: caring for others without losing yourself',
        description: 'Kind people are often the most exhausted. A boundary is not a wall; it is a way to make your care last.',
        imageAlt: 'Two people share a warm hug and smile.',
        introduction: 'Some people are always there when someone needs them. They are loved, and they are often the most quietly exhausted. This reflection is not about caring less, but about letting your care last.',
        sections: [
          { title: 'Why kind people burn out', paragraphs: [
            'Many of us learned that we are valuable only when useful, so we say yes until the body answers with headaches, sleeplessness or irritability. Burnout is not proof you are not good enough; it shows you gave more than you received back.',
            'A boundary is more like a low garden fence than a wall: it shows where your space is and still has a gate. “I don’t answer work messages after 9 pm.” “I can listen, but I only have twenty minutes today.”',
          ] },
          { title: 'Noticing boundaries through the body', paragraphs: [
            'A sigh when a name appears on your screen, a tight stomach before a meeting, heaviness after saying yes: the body often knows first. Pause for one breath before answering and ask, “Do I truly want and have the capacity to do this?” You may say, “Let me get back to you.”',
          ] },
          { title: 'Saying no softly', paragraphs: [
            'A kind refusal acknowledges the other person, states your limit and, if possible, offers an alternative. You do not owe a long explanation. If someone is disappointed, you can care about their feelings without withdrawing the boundary: “I understand you are disappointed. I still care about you, and I still need this.”',
          ] },
          { title: 'Caring for yourself is caring for others', paragraphs: [
            'Loving-kindness practice often begins with ourselves, not because we matter more but because care needs roots. When you are rested, you listen more patiently; when you are not quietly resentful, your help is lighter. Start with one small boundary this week and notice what changes.',
          ] },
        ],
        practice: { title: 'Practise one small boundary this week', steps: [
          'Recall a recent situation where saying yes left you feeling heavy.',
          'Notice and name the sensation in your body.',
          'Write one short, gentle sentence for the boundary you want to try.',
          'Next time, pause for one breath before answering, then use your sentence.',
          'At the end of the day, write one line about what you noticed.',
        ] },
        note: 'This reflection is for everyday relationships. If you are in a relationship with violence, threats or control, put your safety first and contact someone you trust, the authorities or a support professional.',
        cta: { label: 'Begin loving-kindness with yourself', slug: 'loving-kindness-meditation' },
      },
    },
  }),

  healingArticle({
    slug: 'walking-through-loss',
    viSlug: 'di-qua-mat-mat',
    image: '/media/journey/veggie-sunset.webp',
    publishedAt: '2026-11-24',
    level: 'beginner',
    keywords: { vi: 'mất mát, thương nhớ, đau buồn, chia tay, tưởng nhớ, chữa lành', en: 'loss, grief, missing someone, separation, remembrance, healing' },
    relatedSlugs: ['healing-as-coming-home', 'staying-with-strong-emotions', 'listening-to-nature'],
    translations: {
      vi: {
        category: 'Chữa lành',
        title: 'Đi qua mất mát: khi thương nhớ cũng là một cách yêu',
        description: 'Không có lịch trình nào cho nỗi buồn. Vài suy ngẫm và những nghi thức nhỏ để ở cùng nỗi nhớ, và tiếp tục sống mà không phải quên.',
        imageAlt: 'Khu vườn rau lúc hoàng hôn, ánh nắng cuối ngày chiếu qua những luống rau.',
        introduction: 'Có những ngày, chỉ một mùi cơm nấu, một chiếc áo cũ, hay một con đường quen cũng đủ làm lòng mình chùng xuống. Mất mát có thể là sự ra đi của một người thân, một mối quan hệ khép lại, một công việc gắn bó nhiều năm, một ngôi nhà, hay một phiên bản của chính mình mà mình từng mong trở thành. Bài viết này không có lời giải. Nó chỉ mong ngồi cạnh bạn một lát, nếu bạn đang mang một nỗi nhớ.',
        sections: [
          { title: 'Mất mát có nhiều hình dạng', paragraphs: [
            'Chúng ta thường chỉ cho phép mình buồn khi có một sự ra đi rõ ràng. Nhưng có những mất mát không ai làm lễ: một tình bạn phai dần, một giấc mơ phải gác lại, sức khỏe không còn như trước, một đứa con lớn lên và rời nhà. Những nỗi buồn ấy cũng thật, và cũng xứng đáng được thừa nhận.',
            'Khi bạn nói với mình “Mình đang buồn vì đã mất điều này”, bạn không làm quá lên. Bạn chỉ đang thành thật. Sự thành thật ấy là bước đầu tiên để nỗi buồn có chỗ đặt xuống, thay vì bị dồn vào một góc rồi bất chợt trào ra.',
          ] },
          { title: 'Không có lịch trình cho nỗi buồn', paragraphs: [
            'Đôi khi người xung quanh, với tất cả thiện ý, sẽ nói: “Thôi, chuyện đã qua rồi.” “Phải mạnh mẽ lên.” Nhưng nỗi buồn không đi theo lịch. Có người khóc nhiều trong tuần đầu rồi dần lặng. Có người tưởng ổn, rồi nhiều tháng sau mới vỡ òa. Không có cách buồn nào là đúng hay sai.',
            'Nỗi buồn cũng không đi theo từng bước gọn gàng. Có ngày bạn thấy bình yên, có ngày giận, có ngày trống rỗng, có ngày lại cười vì một kỷ niệm. Tất cả đều có thể đến trong cùng một tuần, thậm chí cùng một buổi chiều.',
            'Nếu được, hãy cho mình quyền đi chậm. Bạn không cần phải “vượt qua” cho kịp ai. Bạn chỉ cần đi qua, theo nhịp của mình.',
          ] },
          { title: 'Ở lại với những ngày khó', paragraphs: [
            'Những ngày kỷ niệm, ngày giỗ, ngày sinh nhật, hay một mùa trong năm thường mang nỗi nhớ về đậm hơn. Bạn có thể chuẩn bị trước cho những ngày ấy: báo với một người bạn rằng hôm đó mình có thể cần ai đó hỏi han, hoặc dành ra một khoảng thời gian yên tĩnh cho riêng mình.',
            'Khi nỗi nhớ dâng lên, thử đặt tay lên ngực, thở chậm và nói thầm: “Mình nhớ. Nhớ là vì mình đã thương.” Câu nói ấy không làm nỗi đau biến mất, nhưng nó nhắc rằng nỗi đau và tình thương là hai mặt của cùng một điều.',
            'Có thể bạn muốn khóc. Hãy để mình khóc, nếu được ở nơi an toàn. Nước mắt không phải dấu hiệu yếu đuối; với nhiều người, đó là cách cơ thể nhẹ bớt.',
          ] },
          { title: 'Khi người xung quanh không biết nói gì', paragraphs: [
            'Người đang buồn đôi khi thấy cô đơn không chỉ vì mất mát, mà vì những người xung quanh không biết phải làm gì. Có người tránh nhắc đến, có người nói những câu an ủi vụng về, có người vội khuyên mình mạnh mẽ. Phần lớn họ không vô tâm; họ chỉ lúng túng trước nỗi đau của người khác.',
            'Nếu được, bạn có thể nói rõ điều mình cần: “Mình không cần lời khuyên, chỉ cần bạn ngồi với mình một lát.” “Mình muốn kể về người ấy, bạn nghe mình nhé.” Một lời đề nghị cụ thể giúp người thương bạn biết cách ở bên bạn.',
            'Và nếu bạn là người đang ở cạnh một ai đó vừa mất mát, đôi khi điều quý nhất không phải câu nói hay, mà là sự có mặt. Một bữa cơm mang sang, một tin nhắn hỏi han vào ngày giỗ, một cái nắm tay. Những điều nhỏ ấy được nhớ rất lâu.',
          ] },
          { title: 'Những nghi thức nhỏ để tưởng nhớ', paragraphs: [
            'Con người ở mọi nền văn hóa đều tìm đến nghi thức để đi qua mất mát: thắp một nén nhang, thả một ngọn đèn, nấu một món ăn người ấy từng thích. Nghi thức giúp nỗi nhớ có hình dạng, có một nơi để đặt vào, thay vì lơ lửng khắp ngày.',
            'Bạn có thể tạo nghi thức của riêng mình: viết một lá thư không gửi, kể cho người ấy nghe về một ngày của bạn, trồng một cái cây, giữ một góc nhỏ có tấm ảnh và một bình hoa. Không cần đúng hay đẹp. Chỉ cần nó có ý nghĩa với bạn.',
            'Với những mất mát không phải là sự ra đi, nghi thức cũng có thể giúp: một buổi đi bộ cuối cùng qua ngôi nhà cũ, một lời cảm ơn gửi đến công việc đã gắn bó, một trang nhật ký khép lại một giai đoạn.',
            'Nếu bạn thực hành thiền, một vài phút ngồi yên mỗi ngày cũng có thể là một nghi thức. Không phải để quên, mà để có một khoảng an toàn cho nỗi nhớ được có mặt. Bạn ngồi xuống, thở, và cho phép mọi cảm xúc đến rồi đi như những đợt sóng. Khi đứng dậy, bạn mang theo một chút bình yên vào phần còn lại của ngày.',
          ] },
          { title: 'Thương nhớ và tiếp tục sống', paragraphs: [
            'Đôi khi mình sợ rằng nếu mình vui trở lại, nghĩa là mình đã quên. Nhưng tiếp tục sống không phải là phản bội điều đã mất. Nhiều người thấy rằng nỗi nhớ không nhỏ đi, mà là cuộc sống xung quanh nó lớn dần lên, đủ rộng để chứa cả nỗi nhớ lẫn những niềm vui mới.',
            'Bạn có thể mang theo người mình thương theo những cách khác: sống một thói quen tốt mà họ từng dạy, kể chuyện về họ cho người khác, làm một việc tử tế nhân danh họ. Tình thương không mất đi; nó đổi hình dạng.',
            'Và nếu điều bạn mất là một phiên bản của chính mình, hãy nhẹ nhàng với người bạn đang là. Người ấy cũng đang học cách sống tiếp.',
          ] },
          { title: 'Khi nỗi buồn quá nặng', paragraphs: [
            'Có những nỗi buồn đè nặng đến mức mình không ăn, không ngủ, không làm được những việc thường ngày trong một thời gian dài, hoặc có lúc mình không muốn sống tiếp. Nếu bạn đang như vậy, xin hãy tìm đến sự hỗ trợ ngay: người thân, bác sĩ, chuyên gia tâm lý. Bạn không cần phải mang nó một mình.',
            'Thiền và những khoảnh khắc lặng có thể là chỗ nghỉ, nhưng không thay thế được sự chăm sóc của con người dành cho con người. Một bàn tay nắm lấy tay mình, một người ngồi cạnh trong im lặng, đôi khi là điều chữa lành nhất.',
            'Nếu hôm nay bạn chỉ làm được một điều, hãy để đó là một điều nhỏ cho chính mình: ăn một bữa, uống một ly nước ấm, nhắn một tin cho người bạn tin cậy. Đi qua mất mát không phải một cuộc đua. Mỗi ngày bạn còn ở đây và còn thương, đã là đủ.',
          ] },
        ],
        practice: { title: 'Một nghi thức nhỏ cho nỗi nhớ', steps: [
          'Chọn một thời điểm yên tĩnh và một góc nhỏ an toàn.',
          'Đặt trước mặt một vật gợi nhớ: một tấm ảnh, một món đồ, hay chỉ là một ngọn nến.',
          'Thở chậm vài hơi, cảm nhận hai bàn tay và nơi mình đang ngồi.',
          'Nói thầm hoặc viết vài dòng cho điều mình đã mất: một lời cảm ơn, một điều chưa kịp nói, một kỷ niệm.',
          'Kết thúc bằng câu: “Mình nhớ, vì mình đã thương.” Rồi làm một việc nhẹ nhàng để chăm sóc mình.',
        ] },
        note: 'Nếu nỗi buồn kéo dài, ảnh hưởng nặng đến sinh hoạt hoặc bạn có ý nghĩ không muốn sống, hãy liên hệ ngay với người thân, bác sĩ hoặc chuyên gia sức khỏe tâm thần. Bạn không cần phải đi qua điều này một mình.',
        cta: { label: 'Tìm hiểu cách ở lại với cảm xúc mạnh', slug: 'staying-with-strong-emotions' },
      },
      en: {
        category: 'Healing',
        title: 'Walking through loss: when missing someone is also a way of loving',
        description: 'There is no timetable for grief. Some reflections and small rituals for staying with longing, and for living on without forgetting.',
        imageAlt: 'A vegetable garden at sunset, the last light falling across the beds.',
        introduction: 'Sometimes the smell of rice cooking, an old shirt or a familiar road is enough to make the heart sink. Loss may be the death of someone dear, the end of a relationship, a job, a home, or a version of ourselves we hoped to become. This piece has no solution. It only hopes to sit beside you for a while.',
        sections: [
          { title: 'Loss takes many shapes', paragraphs: [
            'We often only allow ourselves to grieve a clear departure. Yet a fading friendship, a postponed dream or changed health are real losses too. Saying “I am sad because I lost this” is not exaggerating; it is honesty, and it gives grief somewhere to rest.',
          ] },
          { title: 'No timetable for grief', paragraphs: [
            'Well-meant words like “It’s in the past” or “Be strong” do not match how grief moves. Some people cry in the first week; others seem fine and break down months later. Peace, anger, emptiness and laughter can arrive in the same afternoon. You do not need to “get over it” on anyone’s schedule.',
            'On anniversaries, prepare: tell a friend you may need a call, or keep quiet time for yourself. When longing rises, rest a hand on your chest and whisper: “I miss you because I loved you.”',
          ] },
          { title: 'Small rituals of remembrance', paragraphs: [
            'Across cultures people use rituals to pass through loss: lighting incense, floating a lantern, cooking a favourite dish. You can create your own: an unsent letter, a tree, a small corner with a photo and flowers. Living on is not betrayal. Many people find that grief does not shrink, but life grows around it, wide enough for both longing and new joy.',
          ] },
          { title: 'When grief is too heavy', paragraphs: [
            'If for a long time you cannot eat, sleep or manage daily life, or you sometimes do not want to go on living, please reach out now to family, a doctor or a mental health professional. Quiet moments can be a resting place, but they do not replace human care. A hand to hold is sometimes the most healing thing of all.',
          ] },
        ],
        practice: { title: 'A small ritual for longing', steps: [
          'Choose a quiet time and a small, safe corner.',
          'Place something in front of you: a photo, an object or a candle.',
          'Breathe slowly and feel your hands and where you sit.',
          'Say or write a few lines: a thank-you, something left unsaid, a memory.',
          'Close with “I miss you because I loved you,” then do something gentle for yourself.',
        ] },
        note: 'If grief lasts a long time, seriously affects daily life or you have thoughts of not wanting to live, contact family, a doctor or a mental health professional right away. You do not have to go through this alone.',
        cta: { label: 'Staying with a strong emotion', slug: 'staying-with-strong-emotions' },
      },
    },
  }),

  healingArticle({
    slug: 'small-joys-gratitude',
    viSlug: 'niem-vui-nho-va-long-biet-on',
    image: '/media/journey/smile-papaya-garden.webp',
    publishedAt: '2026-11-24',
    level: 'beginner',
    keywords: { vi: 'biết ơn, niềm vui, tích cực, sống tỉnh thức, đời sống, hạnh phúc', en: 'gratitude, joy, positivity, mindful living, everyday life, happiness' },
    relatedSlugs: ['everyday-mindfulness', 'healing-as-coming-home', 'mindful-gardening'],
    translations: {
      vi: {
        category: 'Đời sống tỉnh thức',
        title: 'Niềm vui nhỏ và lòng biết ơn, không cần gượng ép',
        description: 'Sống tích cực không có nghĩa là lúc nào cũng phải thấy ổn. Cách tập nhận ra điều tốt đẹp nhỏ bé mỗi ngày, kể cả vào những ngày không dễ dàng.',
        imageAlt: 'Một người mỉm cười giữa vườn đu đủ xanh.',
        introduction: 'Bạn đã bao giờ nghe ai đó nói “Hãy suy nghĩ tích cực lên” đúng lúc mình đang rất buồn chưa? Lời khuyên ấy thường đến từ thiện ý, nhưng đôi khi lại khiến mình thấy cô đơn hơn, như thể cảm xúc thật của mình là một lỗi cần sửa. Bài viết này nói về một kiểu tích cực khác: không phủ nhận nỗi buồn, nhưng cũng không để nó che hết những điều tốt đẹp nhỏ bé vẫn đang có mặt.',
        sections: [
          { title: 'Tích cực gượng ép và tích cực thật', paragraphs: [
            'Tích cực gượng ép là khi mình bắt bản thân, hoặc người khác, phải vui, phải lạc quan, phải biết ơn, dù bên trong đang đau. Nó giống như sơn một lớp màu tươi lên bức tường đang thấm nước. Nhìn thì đẹp, nhưng ẩm mốc vẫn còn đó.',
            'Tích cực thật bắt đầu từ sự trung thực. “Hôm nay mình mệt, và mình cũng thấy ly trà ấm này thật dễ chịu.” Cả hai điều đều đúng cùng lúc. Tâm mình đủ rộng để chứa cả hai, nếu mình cho phép.',
            'Vì vậy, nếu hôm nay bạn không thấy biết ơn, không sao cả. Lòng biết ơn không phải một nghĩa vụ đạo đức. Nó là một khả năng có thể nuôi dưỡng dần, như một mầm cây.',
          ] },
          { title: 'Vì sao điều không vui dễ nhớ hơn', paragraphs: [
            'Nhiều nhà tâm lý học đã mô tả một xu hướng tự nhiên của con người: chú ý đến điều tiêu cực nhiều hơn điều tích cực. Một lời chê có thể ở lại trong đầu cả tuần, trong khi mười lời khen trôi đi rất nhanh. Xu hướng này từng giúp tổ tiên chúng ta cảnh giác với nguy hiểm.',
            'Hiểu điều đó giúp mình bớt trách mình vì “sao cứ nghĩ đến chuyện buồn”. Nó cũng gợi ý rằng điều tốt đẹp cần được chú ý thêm một chút, ở lại lâu hơn một chút, thì mới có cơ hội đọng lại.',
            'Không có gì sai khi tâm mình chú ý đến điều chưa ổn; đó là cách nó cố bảo vệ mình. Mình chỉ cần thêm vào bức tranh những mảng sáng đang bị bỏ qua, để cái nhìn về cuộc sống trở nên đầy đủ và công bằng hơn, thay vì chỉ toàn những vùng tối.',
          ] },
          { title: 'Dừng lại mười giây với điều tốt', paragraphs: [
            'Một thực hành rất nhỏ: khi gặp một điều dễ chịu, dù bé đến đâu, hãy dừng lại khoảng mười giây để thật sự cảm nhận nó. Ánh nắng chiếu lên bàn tay. Tiếng cười của một đứa trẻ. Vị ngọt của một múi bưởi. Mùi đất sau cơn mưa.',
            'Trong mười giây ấy, để ý xem cơ thể phản ứng thế nào: vai có nhẹ đi không, hơi thở có dài hơn không, khóe miệng có muốn cười không. Bạn không cần làm gì thêm, chỉ để trải nghiệm ấy thấm vào.',
            'Lặp lại vài lần mỗi ngày, bạn có thể nhận thấy mình bắt đầu “bắt gặp” những điều tốt đẹp dễ hơn, như mắt dần quen với ánh sáng trong một căn phòng tối.',
            'Bạn không cần ghi nhớ hay đếm. Chỉ cần mỗi lần bắt gặp, bạn nói thầm: “À, điều này dễ chịu.” Một câu đơn giản như vậy cũng đủ để tâm dừng lại thêm một nhịp, thay vì vội lướt sang chuyện tiếp theo.',
          ] },
          { title: 'Biết ơn khác với phải thấy ổn', paragraphs: [
            'Lòng biết ơn không đòi hỏi hoàn cảnh phải hoàn hảo. Một người đang ốm vẫn có thể biết ơn bàn tay người chăm sóc. Một người vừa mất việc vẫn có thể biết ơn bữa cơm tối với gia đình. Biết ơn không xóa đi khó khăn; nó chỉ nhắc rằng khó khăn không phải là tất cả.',
            'Nếu viết nhật ký biết ơn, hãy cụ thể. Thay vì “biết ơn gia đình”, thử viết “biết ơn mẹ đã gọi hỏi hôm nay mình ăn gì”. Điều cụ thể chạm vào lòng mình sâu hơn điều chung chung.',
            'Và vào những ngày thật khó, chỉ một dòng cũng đủ: “Hôm nay mình đã cố gắng.” Đó cũng là một điều đáng biết ơn.',
          ] },
          { title: 'Khi biết ơn trở nên khó', paragraphs: [
            'Có những giai đoạn, nghe đến chữ biết ơn thôi đã thấy mệt. Khi đang mất mát, bệnh tật hay bị đối xử bất công, việc ai đó bảo mình hãy biết ơn có thể nghe như một lời phủ nhận. Nếu bạn đang ở giai đoạn ấy, hãy đặt lòng biết ơn sang một bên một thời gian. Nỗi đau cần được thừa nhận trước.',
            'Lúc ấy, thay vì tìm điều để biết ơn, bạn có thể chỉ tìm một điều giúp mình dễ thở hơn một chút: một bài hát, một chỗ ngồi có nắng, một người chịu nghe. Không cần đặt tên là biết ơn. Chỉ cần cho mình được nghỉ.',
            'Khi bạn sẵn sàng, lòng biết ơn thường tự quay lại, nhẹ nhàng hơn, thật hơn, vì nó đã đi qua cả những ngày tối.',
          ] },
          { title: 'Niềm vui trong những việc bình thường', paragraphs: [
            'Niềm vui không chỉ nằm ở những chuyến đi xa hay những dịp đặc biệt. Nó có thể nằm trong việc tưới một luống rau, rửa một cái bát, gấp một chiếc áo còn thơm nắng. Khi mình làm những việc ấy với sự có mặt, chúng trở nên khác hẳn.',
            'Bạn có thể chọn một việc thường ngày và làm nó chậm hơn một chút hôm nay. Cảm nhận nhiệt độ của nước, độ nặng của chiếc bát, âm thanh xung quanh. Không cần cố tạo ra niềm vui, chỉ cần mở lòng để niềm vui có chỗ đến.',
            'Ở khu vườn, người làm vườn hay nói rằng không ai kéo cây lớn nhanh được. Mình chỉ tưới nước, làm cỏ, che nắng, rồi chờ. Niềm vui cũng vậy: mình không ép nó nở, mình chỉ chăm cho đất trong lòng đủ mềm để nó có thể nảy mầm.',
          ] },
          { title: 'Chia sẻ niềm vui', paragraphs: [
            'Niềm vui thường lớn lên khi được chia sẻ. Kể cho ai đó về một điều nhỏ làm bạn mỉm cười hôm nay. Gửi một lời cảm ơn cụ thể đến một người đã giúp bạn. Khen thật lòng một điều bạn thấy đẹp ở người khác.',
            'Những hành động nhỏ ấy không chỉ làm người kia vui, mà còn giúp bạn nhìn thế giới qua lăng kính của sự trân trọng. Theo thời gian, nó có thể trở thành một cách sống: không phải vì mình phải thấy ổn, mà vì mình biết điều tốt đẹp luôn có mặt, dù đôi khi rất nhỏ.',
            'Bạn cũng có thể đón nhận niềm vui của người khác một cách trọn vẹn. Khi một người bạn kể chuyện vui, hãy thật sự lắng nghe, hỏi thêm, mừng cùng họ, thay vì vội so sánh với mình. Trong đạo Phật, niềm vui khi thấy người khác hạnh phúc được gọi là tâm hỷ, một trong bốn tâm vô lượng. Nó là món quà mình có thể tặng cho người khác bất cứ lúc nào, và cũng là món quà mình nhận lại.',
            'Hôm nay, hãy thử chọn một người và gửi cho họ một lời cảm ơn cụ thể. Rồi để ý xem trong lòng mình có gì thay đổi.',
          ] },
        ],
        practice: { title: 'Ba điều tốt nhỏ mỗi tối', steps: [
          'Trước khi ngủ, ngồi hoặc nằm thả lỏng, thở chậm vài hơi.',
          'Nhớ lại ba điều nhỏ đã làm bạn dễ chịu trong ngày, càng cụ thể càng tốt.',
          'Với mỗi điều, dừng lại khoảng mười giây để cảm nhận lại nó trong cơ thể.',
          'Nếu hôm nay khó, chỉ cần một điều, hoặc viết: “Hôm nay mình đã cố gắng.”',
          'Kết thúc bằng một lời cảm ơn thầm, gửi đến ai đó hoặc đến chính mình.',
        ] },
        note: 'Lòng biết ơn là một thực hành nhẹ nhàng, không phải cách để phủ nhận khó khăn. Nếu bạn thấy buồn kéo dài, mất hứng thú với mọi việc trong nhiều tuần, hãy chia sẻ với người thân hoặc tìm đến chuyên gia sức khỏe tâm thần.',
        cta: { label: 'Mang chánh niệm vào việc thường ngày', slug: 'everyday-mindfulness' },
      },
      en: {
        category: 'Mindful living',
        title: 'Small joys and gratitude, without forcing it',
        description: 'Living positively does not mean always feeling fine. A way to notice small good things each day, even on days that are not easy.',
        imageAlt: 'A person smiles among green papaya trees in a garden.',
        introduction: 'Have you ever been told to “think positive” at the very moment you felt sad? It is usually kindly meant, yet it can make us lonelier, as if our real feelings were a mistake. This is about another kind of positivity: one that does not deny sadness but does not let it hide the small good things still present.',
        sections: [
          { title: 'Forced and honest positivity', paragraphs: [
            'Forced positivity paints bright colour over a damp wall. Honest positivity starts with truth: “I am tired today, and this warm tea feels lovely.” Both are true at once. If you do not feel grateful today, that is all right; gratitude is a capacity that grows, not a duty.',
            'Psychologists have long described our tendency to notice the negative more than the positive. Good moments need a little more attention to stay.',
          ] },
          { title: 'Ten seconds with something good', paragraphs: [
            'When something pleasant happens, however small, pause for about ten seconds: sunlight on your hand, a child laughing, the scent of soil after rain. Notice how your body responds. Repeated, this helps you find good things more easily, like eyes adjusting to light.',
          ] },
          { title: 'Gratitude is not pretending to be fine', paragraphs: [
            'Gratitude does not require perfect circumstances. Someone who is ill can still be grateful for a caring hand. Be specific: not “my family” but “Mum calling to ask what I ate today.” On hard days one line is enough: “Today I tried.”',
          ] },
          { title: 'Joy in ordinary things, shared', paragraphs: [
            'Joy lives in watering a vegetable bed, washing a bowl, folding a sun-warmed shirt. Do one ordinary task a little more slowly today. Then share: tell someone what made you smile, or send a specific thank-you. Over time this becomes a way of living, not because we must feel fine, but because we know good things are always present, even when small.',
          ] },
        ],
        practice: { title: 'Three small good things each evening', steps: [
          'Before sleep, settle and take a few slow breaths.',
          'Recall three small pleasant moments from the day, as specifically as you can.',
          'Stay with each for about ten seconds and feel it in your body.',
          'On hard days, one is enough, or write “Today I tried.”',
          'Close with a silent thank-you to someone, or to yourself.',
        ] },
        note: 'Gratitude is a gentle practice, not a way to deny difficulty. If sadness lasts or you lose interest in everything for several weeks, talk with someone close or a mental health professional.',
        cta: { label: 'Bring mindfulness into daily tasks', slug: 'everyday-mindfulness' },
      },
    },
  }),
];
