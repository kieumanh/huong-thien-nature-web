// Shared bilingual copy for the static Roots website.
export const languages = ["vi", "en"] as const;
export type Language = (typeof languages)[number];

export const copy = {
  "vi": {
    "title": "Bắt rễ trong hiện tại. Lớn lên cùng thiên nhiên.",
    "desc": "Một không gian nhẹ nhàng cho thiền định, chánh niệm và chăm sóc sức khỏe tự nhiên, do Hương Thiền và Kiều Mạnh khởi xướng.",
    "nav": [
      "Câu chuyện",
      "Thực hành",
      "Thiên nhiên",
      "Đội ngũ",
      "Tản văn",
      "Lộ trình"
    ],
    "eyebrow": "Thiền định · Thiên nhiên · Đời sống",
    "hero": "Bắt rễ trong hiện tại.<br/><em>Lớn lên cùng thiên nhiên.</em>",
    "lead": "Dừng lại một chút. Chạm vào hơi thở, lắng nghe thế giới sống và nuôi dưỡng những điều giản dị — để trở về với chính mình.",
    "explore": "Khám phá thực hành",
    "storyCta": "Câu chuyện của chúng tôi",
    "note": "Thực tập sống động, bắt đầu từ sự chăm sóc, chú tâm và tôn trọng thiên nhiên.",
    "introEyebrow": "Những gốc rễ",
    "introTitle": "Một đời sống tỉnh thức, từ những điều nhỏ.",
    "introCopy": "Hương Thiền Nature đưa thiền định, chánh niệm và chăm sóc sức khỏe gần thiên nhiên vào đời sống thường ngày. Chúng tôi chia sẻ thực hành và suy ngẫm với sự ấm áp, tò mò và tôn trọng trải nghiệm riêng của mỗi người.",
    "introMark": "“Bắt đầu từ nơi mình đang có mặt.”",
    "pillars": [
      [
        "01",
        "Thiền định",
        "Những thực tập giản dị, hiền hòa để nhận biết sự chú tâm và trở về hiện tại."
      ],
      [
        "02",
        "Chánh niệm",
        "Đưa sự tỉnh thức vào những khoảnh khắc bình thường, các mối quan hệ và công việc."
      ],
      [
        "03",
        "Chăm sóc tự nhiên",
        "Nuôi dưỡng thân tâm qua những nếp sống vững chãi, gần gũi với thiên nhiên."
      ]
    ],
    "practiceEye": "Thực tập",
    "practiceTitle": "Tâm đi xa.<br/>Ta nhẹ nhàng trở lại.",
    "practiceCopy": "Thiền không phải là ép tâm trí trống rỗng. Hãy nhận ra sự chú ý đã đi đâu, rồi nhẹ nhàng quay về điểm tựa. Chính sự quay về là thực tập.",
    "steps": [
      [
        "01",
        "Chọn một điểm tựa",
        "Hơi thở, cảm giác bàn chân hoặc một âm thanh gần bên."
      ],
      [
        "02",
        "Nhận ra tâm đã đi",
        "Khi chợt nhớ, hãy gọi tên dịu dàng: đang nghĩ, đang tính, đang nhớ."
      ],
      [
        "03",
        "Nhẹ nhàng quay lại",
        "Trở về điểm tựa mà không trách mình. Lặp lại bao nhiêu lần cũng được."
      ]
    ],
    "natureEye": "Học cùng thế giới sống",
    "natureTitle": "Chậm lại để nhìn sâu hơn.",
    "natureCopy": "Một bước đi, một thân cây, mùi đất sau mưa: thiên nhiên có thể mời ta chú tâm và cảm nhận sự kết nối. Đó là lời mời quan sát, chiêm nghiệm — không phải lời hứa về quyền năng bí ẩn.",
    "natureNote": "Một số tư liệu hình ảnh dùng ngôn ngữ tâm linh như “năng lượng” hay “cộng hưởng”. Chúng tôi trình bày đây là ẩn dụ chiêm nghiệm cá nhân, không phải phép đo khoa học đã được xác lập hay lời khuyên y khoa.",
    "natureCards": [
      [
        "Quan sát",
        "Nhận biết màu sắc, hình dáng, chuyển động và thay đổi. Để sự tò mò đến trước diễn giải."
      ],
      [
        "Lắng nghe",
        "Dừng lại để nghe tiếng gió, chim, nước và âm thanh nơi bạn đang có mặt."
      ],
      [
        "Chiêm nghiệm",
        "Viết lại điều đã nhận ra và cảm xúc khơi lên. Giữ mọi cách hiểu thật nhẹ nhàng."
      ]
    ],
    "peopleEye": "Những người khởi xướng",
    "peopleTitle": "Bắt rễ từ thực hành. Chia sẻ bằng sự chăm sóc.",
    "founderRole": "Người sáng lập · Tác giả · Người hướng dẫn",
    "founderCopy": "Hương Thiền là tác giả và Founder đã khởi xướng dự án Hương Thiền Nature. Cô mời mọi người khám phá thiền định, chánh niệm và mối quan hệ tỉnh thức hơn với thiên nhiên.",
    "coRole": "Đồng sáng lập · Người hướng dẫn",
    "coCopy": "Kiều Mạnh là Teacher kiêm Co-founder, cùng định hình hành trình học tập và những nền tảng thực hành của dự án.",
    "journalEye": "Tản văn trên hành trình",
    "phasesTitle": "Phát triển theo nhịp người thật",
    "phases": [
      [
        "01",
        "Mở cánh cửa",
        "Trang giới thiệu song ngữ, thư viện thực tập, câu chuyện người sáng lập và bài viết chọn lọc."
      ],
      [
        "02",
        "Cùng học và gặp gỡ",
        "Gửi yêu cầu retreat, đăng ký khóa học, không gian thành viên và tài nguyên học tập."
      ],
      [
        "03",
        "Nuôi dưỡng cộng đồng",
        "Thư viện khóa học sâu hơn, sự kiện và công cụ cộng đồng theo nhu cầu thực tế."
      ]
    ],
    "phaseLabels": [
      "Hiện tại",
      "Tiếp theo",
      "Tương lai"
    ],
    "contactEye": "Kết nối",
    "contactTitle": "Bạn muốn chia sẻ điều gì?",
    "contactCopy": "Một câu hỏi về thực tập, một điều muốn tìm hiểu, hay một lời chào giản dị. Hãy gửi lời nhắn để Hương Thiền Nature có thể phản hồi bạn.",
    "footer": "Thiền định · Chánh niệm · Chăm sóc tự nhiên",
    "disclaimer": "Website chia sẻ nội dung giáo dục và thực tập chiêm nghiệm, không thay thế chăm sóc y tế hay sức khỏe tâm thần. Mọi thực tập đều tùy chọn; hãy điều chỉnh theo nhu cầu của bạn.",
    "top": "Trở về đầu trang",
    "rootsNote": "Chậm lại. Chạm đất. Có mặt.",
    "journalLink": "Đọc tản văn",
    "practiceCaption": "Không cần một nơi hoàn hảo. Chỉ cần một khoảnh khắc có mặt.",
    "portraitCaption": "Hương Thiền · Người khởi xướng Hương Thiền Nature",
    "skip": "Đến nội dung chính",
    "journalHome": "Tản văn",
    "home": "Trang chủ",
    "related": "Tiếp tục hành trình",
    "readTime": "phút đọc"
  },
  "en": {
    "title": "Rooted in the present. Growing with nature.",
    "desc": "A gentle space for meditation, mindfulness and natural wellbeing, founded by Hương Thiền and Kiều Mạnh.",
    "nav": [
      "Our story",
      "Practice",
      "Nature",
      "People",
      "Journal",
      "Our path"
    ],
    "eyebrow": "Meditation · Nature · Everyday life",
    "hero": "Rooted in the present.<br/><em>Growing with nature.</em>",
    "lead": "Pause for a moment. Meet the breath, listen to the living world and care for the simple things — a gentle way to come home to yourself.",
    "explore": "Explore the practice",
    "storyCta": "Our story",
    "note": "A living practice rooted in care, attention and respect for nature.",
    "introEyebrow": "Our roots",
    "introTitle": "An attentive life begins with small things.",
    "introCopy": "Hương Thiền Nature brings meditation, mindfulness and nature-based wellbeing into everyday life. We share practices and reflections with warmth, curiosity and room for each person’s own experience.",
    "introMark": "“Begin where you are, as you are.”",
    "pillars": [
      [
        "01",
        "Meditation",
        "Simple, kind practices for meeting attention and returning to the present."
      ],
      [
        "02",
        "Mindfulness",
        "Bring awareness into ordinary moments, relationships and work."
      ],
      [
        "03",
        "Natural wellbeing",
        "Care for body and mind through grounded, nature-connected routines."
      ]
    ],
    "practiceEye": "The practice",
    "practiceTitle": "The mind travels.<br/>We gently return.",
    "practiceCopy": "Meditation is not about forcing the mind to become empty. Notice where attention has gone, then gently return to the anchor. The returning is the practice.",
    "steps": [
      [
        "01",
        "Choose an anchor",
        "The breath, the feeling of your feet, or a sound nearby."
      ],
      [
        "02",
        "Notice the drift",
        "When you remember, name it softly: thinking, planning, remembering."
      ],
      [
        "03",
        "Come back kindly",
        "Return to the anchor without scolding yourself. Repeat as often as needed."
      ]
    ],
    "natureEye": "Learning with the living world",
    "natureTitle": "Slow down enough to notice.",
    "natureCopy": "A walk, a tree, the smell after rain: nature can invite us to pay attention and feel connected. These are invitations to observe and reflect, not promises of hidden powers.",
    "natureNote": "Some of our visual materials use spiritual language such as “energy” or “resonance.” We present these as personal contemplative metaphors, not established scientific measurements or medical advice.",
    "natureCards": [
      [
        "Observe",
        "Notice color, shape, movement and change. Let curiosity lead before interpretation."
      ],
      [
        "Listen",
        "Pause for wind, birds, water and the sounds of the place you are in."
      ],
      [
        "Reflect",
        "Write what you noticed and what it brought up for you. Hold each meaning lightly."
      ]
    ],
    "peopleEye": "The people behind the practice",
    "peopleTitle": "Rooted in lived practice. Shared with care.",
    "founderRole": "Founder · Author · Teacher",
    "founderCopy": "Hương Thiền is the author and founder who initiated Hương Thiền Nature. Her work invites people to explore meditation, mindfulness and a more attentive relationship with nature.",
    "coRole": "Co-founder · Teacher",
    "coCopy": "Kiều Mạnh is a teacher and co-founder, helping shape the learning journey and the practical foundations of the project.",
    "journalEye": "Notes for the journey",
    "phasesTitle": "Growing at a human pace",
    "phases": [
      [
        "01",
        "Open the door",
        "A bilingual home, practice library, founder story and thoughtful articles."
      ],
      [
        "02",
        "Gather and learn",
        "Retreat enquiries, course registration, member space and learning resources."
      ],
      [
        "03",
        "Deepen the community",
        "A richer course library, events and community tools shaped by real needs."
      ]
    ],
    "phaseLabels": [
      "Now",
      "Next",
      "Later"
    ],
    "contactEye": "Get in touch",
    "contactTitle": "What would you like to share?",
    "contactCopy": "A question about practice, something you would like to explore or a simple hello. Send a note so Hương Thiền Nature can respond to you.",
    "footer": "Meditation · Mindfulness · Natural wellbeing",
    "disclaimer": "This site shares educational and contemplative practices. It does not replace medical or mental-health care. Every practice is optional; adapt it to your own needs.",
    "top": "Back to top",
    "rootsNote": "Slow down. Touch the earth. Be here.",
    "journalLink": "Read the reflection",
    "practiceCaption": "You do not need a perfect place. Just a moment of presence.",
    "portraitCaption": "Hương Thiền · Founder of Hương Thiền Nature",
    "skip": "Skip to main content",
    "journalHome": "Journal",
    "home": "Home",
    "related": "Continue the journey",
    "readTime": "min read"
  }
} as const;

export function getCopy(lang: Language) {
  return copy[lang];
}
