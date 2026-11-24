import type { Article, ArticleTranslation } from './articles';

// "Mặt Trời, Mặt Trăng và nhịp sống của chúng ta" (2.19.0). Topic: Thiên nhiên (see journal-topics.ts).
// Three layers are kept apart on purpose: what studies have measured, what is not supported, and what is contemplative reflection.
// Studies named in the text are listed in `sources` with their own note (see `sourcesNote` and the article page).
// The five animated illustrations are in article-figures.ts (scripts/illustrations/sky-rhythm.py draws them).

const vi: ArticleTranslation = {
  category: 'Thiên nhiên',
  title: 'Mặt Trời, Mặt Trăng và nhịp sống của chúng ta',
  description: 'Ánh sáng ban ngày, vầng trăng rằm, ngày ba mươi và mồng một chạm vào thân tâm mình ra sao: điều khoa học đã đo được, điều còn chưa chắc, và cách sống hòa nhịp với trời đất.',
  imageAlt: 'Hoàng hôn vàng cam ở bên trái và vầng trăng tròn trên nền trời tím ở bên phải, cùng soi xuống mặt hồ phẳng lặng.',
  introduction: 'Có những buổi sáng mình thức dậy khi nắng đã xiên qua cửa sổ, và cơ thể nhẹ hẳn đi mà chưa kịp hiểu vì sao. Cũng có những đêm rằm mình trằn trọc, ngước nhìn vầng trăng tròn sáng quá mức và tự hỏi: có phải trăng đang làm lòng mình xao động? Từ xưa, con người đã nhìn lên Mặt Trời và Mặt Trăng để định ngày giờ, mùa vụ, cả những nhịp sâu kín bên trong. Bài viết này đi chậm từng bước: điều gì khoa học đã đo được, điều gì còn chưa chắc, và điều gì là chiêm nghiệm của người thực hành. Ba tầng ấy khác nhau, nên mình sẽ giữ chúng tách bạch để bạn tự chọn điều hợp với mình.',
  sections: [
    {
      title: 'Mặt Trời: chiếc đồng hồ đầu tiên của thân thể',
      paragraphs: [
        'Cơ thể mình không chỉ có một loại thời gian. Sâu trong não có một “đồng hồ sinh học” chạy theo chu kỳ khoảng một ngày, quyết định lúc nào mình tỉnh, lúc nào buồn ngủ, lúc nào đói, lúc nào thân nhiệt dịu xuống. Chiếc đồng hồ ấy không tự chạy đúng mãi. Mỗi ngày nó cần được lên dây lại, và tín hiệu mạnh nhất để lên dây chính là ánh sáng đi vào mắt, trước hết là ánh sáng của Mặt Trời.',
        'Ánh sáng buổi sáng nhắc cơ thể rằng ngày đã bắt đầu: melatonin, hormone gắn với giấc ngủ, hạ xuống và sự tỉnh táo dâng lên. Ánh sáng mạnh vào lúc khuya lại đẩy đồng hồ trượt muộn, nên đêm đến khó ngủ hơn. Năm 2013, nhóm của Kenneth Wright cho tám người cắm trại một tuần chỉ với ánh sáng tự nhiên. Sau tuần ấy, nhịp melatonin của họ sớm hơn khoảng hai giờ so với nhịp thường ngày ở nhà, khớp hơn với giờ mặt trời mọc và lặn. Nhóm rất nhỏ, nhưng hình ảnh dễ hiểu: sống gần ánh sáng tự nhiên hơn, đồng hồ trong người cũng chạy gần nhịp trời hơn.',
        'Với người làm việc cả ngày trong phòng, điều này gợi một việc rất nhỏ: cho mắt mình gặp ánh sáng ngoài trời sớm trong ngày, và dịu bớt ánh sáng mạnh khi đêm xuống. Không cần dụng cụ hay nghi thức, chỉ cần một ô cửa, một ban công, một đoạn đường đi bộ.',
      ],
    },
    {
      title: 'Mặt Trời và tâm trạng: khi ánh sáng ít đi, lòng dễ chùng xuống',
      paragraphs: [
        'Nhiều người thấy lòng nhẹ hơn vào ngày nắng và nặng hơn trong chuỗi ngày u ám. Đó không chỉ là cảm giác. Y học biết đến một dạng trầm cảm theo mùa, thường rõ hơn vào mùa đông ở những nơi ngày ngắn. Dịch vụ y tế công của Anh (NHS) cho rằng nó có liên quan đến việc ánh sáng ban ngày ít đi, có thể làm đồng hồ sinh học và một số chất hóa học trong não thay đổi. Cách chăm sóc gồm cả những điều giản dị như ra ngoài ánh sáng tự nhiên, lẫn các hướng điều trị như liệu pháp ánh sáng, trị liệu bằng trò chuyện, đôi khi cả thuốc, do thầy thuốc hướng dẫn. Ở xứ nhiệt đới như Việt Nam, ngày dài ngắn ít chênh nhau, nhưng những tuần mưa dầm hay những tháng ngồi trong phòng từ sáng đến tối cũng đủ khiến mình xa nắng.',
        'Mặt Trời còn giúp da tạo vitamin D nhờ tia cực tím. Tổ chức Y tế Thế giới (WHO) nói một lượng tia cực tím nhất định là có lợi, nhưng cũng nhấn mạnh tia này là nguyên nhân chính gây ung thư da. Lời khuyên của họ khá rõ: hạn chế đứng nắng giữa ngày, khoảng từ 10 giờ đến 16 giờ, nhất là khi chỉ số UV cao; tìm bóng râm, mặc áo, đội mũ; và đừng dùng kem chống nắng như cái cớ để ở dưới nắng lâu hơn.',
        'Vậy “tắm nắng” đúng nghĩa với mình là ánh sáng buổi sáng, vừa phải, có che chắn, không phải phơi mình dưới trưa gắt. Nếu bạn có làn da rất sáng, từng gặp vấn đề về da, hoặc đang chăm trẻ nhỏ, hãy thận trọng hơn và hỏi bác sĩ da liễu.',
      ],
    },
    {
      title: 'Mặt Trăng: một vòng tròn gần ba mươi ngày',
      paragraphs: [
        'Mặt Trăng không tự phát sáng; nó phản chiếu ánh sáng của Mặt Trời. Một nửa Mặt Trăng luôn được chiếu sáng, còn từ Trái Đất, tùy vị trí của ba thiên thể, ta thấy phần sáng ấy đầy hay vơi. Một vòng như vậy kéo dài khoảng 29,5 ngày, nên tháng âm lịch lúc có 29 ngày, lúc có 30 ngày.',
        'Ngày mồng một, Mặt Trăng nằm giữa Trái Đất và Mặt Trời. Phần được chiếu sáng quay đi hướng khác, nên đêm gần như không có trăng. Quanh ngày rằm, mười lăm âm lịch, Trái Đất nằm giữa; ta thấy trọn vầng sáng, trăng mọc lúc hoàng hôn và lặn lúc bình minh, nên cả đêm có ánh trăng. Đến ngày ba mươi hay hai mươi chín, cuối tháng, chỉ còn một đường trăng khuyết rất mảnh mọc gần sáng, rồi mất hẳn, và một vòng mới bắt đầu.',
        'Hình dưới đây gom ba điểm nhớ ấy trên cùng một vòng: mồng một ở đỉnh, rằm ở đáy, ngày ba mươi ngay trước khi vòng khép lại. Vòng sáng chạy quanh là thời gian đang trôi.',
      ],
    },
    {
      title: 'Điều có thật và điều chưa chắc: Mặt Trăng chạm vào ta như thế nào?',
      paragraphs: [
        'Có một điều chắc chắn: Mặt Trăng và Mặt Trời kéo nước biển, tạo ra thủy triều. Nước dâng nhiều nhất khi ba thiên thể gần thẳng hàng, tức quanh ngày mồng một và ngày rằm, và dâng ít hơn ở hai kỳ trăng bán nguyệt ở giữa. Vì thế mới có câu “trăng kéo cả nước trong người”. Nhưng lực ấy chỉ thể hiện trên những khối nước khổng lồ như đại dương. Trên một cơ thể người, nó nhỏ đến mức không đủ để giải thích tâm trạng hay hành vi. Và vì nó giống nhau ở trăng non và trăng tròn, nó cũng không giải thích được vì sao riêng đêm rằm lại khác.',
        'Vậy khoa học có tìm thấy gì không? Có, nhưng ở một chỗ khác và khiêm tốn hơn: giấc ngủ. Năm 2013, nhóm của Christian Cajochen ở Thụy Sĩ xem lại dữ liệu của 33 tình nguyện viên từng ngủ trong phòng thí nghiệm kín, không nhìn thấy trăng và không biết pha trăng. Quanh ngày rằm, hoạt động não của giấc ngủ sâu giảm khoảng 30%, mọi người ngủ thiếp chậm hơn chừng năm phút, ngủ ngắn đi khoảng hai mươi phút, melatonin thấp hơn và họ tự thấy mình ngủ kém hơn. Năm 2021, nhóm của Leandro Casiraghi theo dõi giấc ngủ bằng vòng đeo tay ở các cộng đồng người Toba/Qom tại Argentina (có nơi không có điện) và ở sinh viên tại Seattle. Trong những đêm trước rằm, người ta đi ngủ muộn hơn và ngủ ngắn hơn, rõ nhất ở nơi không có điện, nhưng vẫn thấy ở cả nơi có điện. Các tác giả cho rằng ánh trăng đầu đêm có thể là một phần lý do.',
        'Hai nghiên cứu ấy khá nhỏ, và chúng nói về nhịp ngủ chứ không nói trăng làm ta buồn hơn hay dễ giận hơn. Chính tác giả đầu tiên cũng thừa nhận có thể còn những cách giải thích khác. Cần thêm những nghiên cứu lặp lại trước khi nói chắc.',
        'Còn niềm tin quen thuộc rằng rằm làm người ta “điên”, phòng cấp cứu đông hơn, tội phạm nhiều hơn, em bé chào đời nhiều hơn thì sao? Năm 1985, James Rotton và Ivan Kelly tổng hợp 37 nghiên cứu và không tìm thấy mối liên hệ đáng tin; pha trăng giải thích không quá khoảng 1% sự biến thiên của những hành vi ấy. Năm 2015, Jean-Luc Margot phân tích dữ liệu nhập viện và sinh nở và cũng không thấy mối liên hệ. Phần lớn điều ta “thấy” có lẽ đến từ thiên kiến chú ý: đêm rằm mà bận rộn thì nhớ, đêm thường bận rộn thì quên.',
      ],
    },
    {
      title: 'Ngày rằm, ngày ba mươi, mồng một: ba ngưỡng cửa trong một tháng',
      paragraphs: [
        'Từ đây, mình rời khỏi những điều đo đếm được để bước vào truyền thống và chiêm nghiệm. Nhiều thế hệ người Việt dùng mồng một và rằm làm hai cái mốc để dừng lại: thắp hương, ăn chay, đi chùa, thăm người thân. Bạn không cần theo một đạo nào để thấy giá trị của những mốc đều đặn như thế. Chúng cho tâm trí một nhịp, giữa những ngày cứ trôi tuột.',
        'Rằm là đỉnh của sự đầy. Đêm sáng, nhìn thấy đường đi, thấy cả trời đất; nhiều người kể rằng mình tỉnh hơn, xao động hơn, và những điều trong lòng hiện rõ hơn. Với người thực hành, đó là lúc hợp để soi lại: một tháng qua mình đã sống thế nào, điều gì trong mình đang đầy, điều gì đang tràn.',
        'Ngày ba mươi, cuối tháng, trăng mảnh dần rồi tắt. Truyền thống thường gắn ngày này với việc khép lại: dọn nhà, trả những món nợ nhỏ, xin lỗi, tha thứ, buông bớt điều đã cũ. Ý nghĩa ấy không đến từ thiên văn, mà từ một hình ảnh hữu ích để cho phép mình chậm lại và gói ghém một tháng.',
        'Mồng một là trăng non, bầu trời tối nhất, như một cánh cửa im lặng. Ở nhiều gia đình, đó là ngày thắp nén hương đầu tháng và gieo một ý định nhỏ. Bóng tối ở đây không đáng sợ; nó giống như đất vừa xới, còn trống, đang chờ một hạt giống.',
      ],
    },
    {
      title: 'Vì sao Mặt Trăng dường như phóng đại điều ẩn sâu trong ta?',
      paragraphs: [
        'Nhiều người kể rằng quanh rằm, hay trong những đêm trăng sáng, nỗi buồn cũ, nỗi lo, cả niềm vui và sự sáng tạo đều rõ nét hơn. Mình không có bằng chứng rằng Mặt Trăng “bơm” điều gì vào ta. Nhưng mình nghĩ có vài cách hiểu hợp lý, và chúng đều nằm trong những điều con người đã biết về chính mình.',
        'Thứ nhất, giấc ngủ. Nếu vài đêm quanh rằm ta ngủ muộn và nông hơn, như các nghiên cứu gợi ý, thì mệt mỏi vốn làm cảm xúc dễ dậy sóng và sức chịu đựng mỏng đi. Một nỗi buồn nhỏ lúc mệt thường trông lớn hơn lúc đã nghỉ ngơi.',
        'Thứ hai, sự chú ý. Đêm trăng sáng mời ta ngước lên, đi chậm lại, ngồi ngoài hiên. Khi tiếng ồn bên ngoài lắng xuống, tiếng nói bên trong nghe rõ hơn. Không phải Mặt Trăng làm chúng to lên; chúng vốn ở đó, chỉ là lúc ấy ta có mặt để nghe.',
        'Thứ ba, kỳ vọng và câu chuyện. Nếu từ nhỏ ta nghe rằng rằm là ngày dễ cáu, ta sẽ để ý hơn đến những lần mình cáu vào rằm và quên đi những lần không. Câu chuyện văn hóa trở thành chiếc kính mà ta nhìn tháng của mình qua đó. Đó là thiên kiến xác nhận, một thói quen rất người.',
        'Thứ tư, một hình ảnh mà người tu tập quý: Mặt Trăng không tự phát sáng, nó chỉ phản chiếu một ánh sáng khác, như tấm gương. Mặt Trăng không gieo vào ta điều gì mới; ánh trăng chỉ làm sáng những gì đã có sẵn. Cách nhìn này lấy đi cả nỗi sợ lẫn sự đổ lỗi: nếu đêm rằm lòng mình xáo động, đó không phải trăng làm hại mình, mà là một cơ hội thấy rõ điều đang chờ được nhìn.',
      ],
    },
    {
      title: 'Nửa còn lại của câu chuyện: điều thuận lợi cho tu tập và chữa lành',
      paragraphs: [
        'Nếu trăng giống chiếc đèn, thì đèn cũng có thể dùng để soi đường. Mình thấy có ít nhất bốn điều thuận đáng lưu tâm.',
        'Một là nhịp. Tu tập hay chữa lành đều cần sự đều đặn, mà đều đặn lại là điều khó nhất. Chu kỳ trăng cho ta sẵn một cuốn lịch tự nhiên, ai ngẩng lên cũng thấy, không cần ghi chú. Gắn một thói quen nhỏ vào mồng một và rằm dễ nhớ hơn một lịch tự đặt. Hai là ánh sáng dịu cho một buổi ngồi. Đêm rằm đủ sáng để ngồi ngoài sân hay bên cửa sổ mà không cần bật đèn. Bạn có thể thử để vầng trăng làm điểm tựa cho sự chú ý, như hơi thở hay âm thanh, với đôi mắt mở nhẹ. Nếu thấy khó chịu, hãy khép mắt hoặc đổi điểm tựa, không cần cố.',
        'Ba là ngưỡng cửa cho sự thành thật. Khi mọi thứ lộ rõ hơn, ta dễ nhận ra cảm xúc nào đang có mặt. Việc cần làm không phải là sửa ngay, mà là gọi tên: “mình đang buồn”, “mình đang lo”. Gọi tên rồi ở cạnh nó một lúc, nhẹ nhàng, là một thực hành chữa lành quen thuộc. Bốn là cơ hội lập một cuốn sổ theo dõi riêng. Thay vì tin hay không tin lời người khác, bạn có thể tự đo: ghi vài dòng mỗi ngày về giấc ngủ, tâm trạng và pha trăng trong ba tháng. Nếu một quy luật hiện ra, bạn hiểu mình hơn. Nếu không, bạn được giải phóng khỏi một nỗi lo vô cớ. Cả hai kết quả đều có ích.',
      ],
    },
    {
      title: 'Kết hợp nhịp trời vào một ngày và một tháng',
      paragraphs: [
        'Dưới đây là cách đặt hai nhịp ấy cạnh nhau, như những gợi ý chứ không phải quy tắc. Bạn hãy giữ lại điều hợp với mình.',
        'Trong một ngày: buổi sáng ra nơi có ánh sáng tự nhiên vài phút, uống một ly nước, hít thở. Giữa trưa tránh nắng gắt, nhất là khi chỉ số UV cao. Chiều tối giảm ánh sáng mạnh và màn hình, thắp đèn vàng dịu để cơ thể biết ngày đang khép lại.',
        'Trong một tháng, hãy nghĩ đến bốn mùa nhỏ. Mồng một, gieo: ngồi yên vài phút, viết một ý định nhỏ, cụ thể và hiền, thứ bạn có thể làm trong tuần tới. Khoảng mồng tám, nuôi: xem ý định ấy đang ở đâu và làm một việc rất nhỏ để nuôi nó. Ngày rằm, soi: ngồi dưới ánh trăng hoặc bên cửa sổ, ghi ba điều biết ơn và một điều bạn thấy rõ hơn về bản thân. Khoảng hai mươi hai, buông: nhìn lại những gì thừa thãi, một việc, một thói quen, một lời tự trách, và chọn một điều để nhẹ tay. Ngày ba mươi, khép: dọn gọn bàn làm việc, viết một lời cảm ơn hay xin lỗi, rồi đi ngủ sớm.',
        'Điều quan trọng nhất của vòng này là sự nhẹ nhàng. Nếu một tháng bạn bỏ lỡ, chỉ cần đón lại ở mồng một hay ngày rằm kế tiếp. Trăng rồi sẽ lại tròn.',
      ],
    },
    {
      title: 'Vài lưu ý để đi cùng trời đất một cách tử tế',
      paragraphs: [
        'Bài viết này là sự kết hợp giữa vài nghiên cứu đã công bố và chiêm nghiệm cá nhân; nó không phải lời khuyên y khoa. Mặt Trăng không nên trở thành lời giải thích cho mọi thứ. Nếu nỗi buồn kéo dài, nếu bạn mất ngủ nhiều đêm liền, lo âu nặng nề, hay có ý nghĩ làm hại bản thân, đó không phải việc của trăng. Hãy nói với người thân và tìm sự giúp đỡ từ bác sĩ hoặc nhà trị liệu tâm lý.',
        'Nếu bạn đang điều trị một bệnh, nhất là về giấc ngủ hay sức khỏe tinh thần, đừng thay đổi thuốc hay giờ giấc chỉ vì lịch trăng; hãy trao đổi với thầy thuốc của bạn. Với nắng, người da sáng, người từng có bệnh về da và trẻ nhỏ cần thận trọng hơn.',
        'Cuối cùng, nếu có đêm rằm nào bạn chỉ muốn đi ngủ sớm và để trăng tự sáng ngoài kia, thế là đủ. Trời đất vốn không đòi hỏi ta phải làm gì. Ta chỉ đang học cách đi chậm lại, cùng nhịp của nơi mình đang sống.',
      ],
    },
  ],
  practice: {
    title: 'Một vòng trăng nhỏ cho riêng bạn',
    steps: [
      'Sáng nay, dành vài phút ở nơi có ánh sáng tự nhiên, như ban công, sân hay bên cửa sổ rộng. Đừng nhìn thẳng vào Mặt Trời; chỉ cần để ánh sáng chạm lên mặt và để mắt nhìn xa.',
      'Tối nay, xem hôm nay là ngày mấy âm lịch và trăng đang ở pha nào. Nếu trời quang, bước ra nhìn trăng một lúc, không cần làm gì thêm.',
      'Viết ba dòng ngắn: thân thể mình đang thế nào, cảm xúc nào đang có mặt, điều gì mình đang lặp đi lặp lại trong đầu.',
      'Vào mồng một, ngày rằm và cuối tháng, viết thêm một dòng: một ý định nhỏ, một lời biết ơn, một điều muốn buông.',
      'Sau ba vòng trăng, đọc lại ghi chép và chỉ hỏi: mình thấy quy luật nào của riêng mình? Nếu không thấy gì, đó cũng là một câu trả lời.',
    ],
  },
  note: 'Bài viết kết hợp vài nghiên cứu đã công bố với chiêm nghiệm cá nhân; phần nói về tâm linh là một cách nhìn để suy ngẫm, không phải y khoa hay điều đã được kiểm chứng. Nếu bạn gặp khó khăn về giấc ngủ hoặc tinh thần, hãy tìm sự hỗ trợ của bác sĩ hoặc chuyên viên tâm lý, và nhớ bảo vệ làn da khi ra nắng.',
  cta: { label: 'Đọc tiếp: Lắng nghe thiên nhiên', slug: 'listening-to-nature' },
};

const en: ArticleTranslation = {
  category: 'Nature',
  title: 'The Sun, the Moon and the Rhythm of Our Days',
  description: 'How daylight, the full moon, the thirtieth and the first of the lunar month touch body and mind: what studies have measured, what is uncertain, and how to live in step with the sky.',
  imageAlt: 'A golden sunset on the left and a full moon in a violet sky on the right, both mirrored in a still lake.',
  introduction: 'Some mornings I wake when the sun has already slanted through the window, and my body feels lighter before I understand why. Some full-moon nights I toss and turn, look up at a moon far too bright, and wonder whether it is stirring my heart. For ages people have looked to the Sun and Moon to mark days, seasons and the quiet rhythms inside. This article goes slowly: what studies have measured, what remains uncertain, and what is a practitioner’s reflection. These are three different layers, and I will keep them apart so you can choose what suits you.',
  sections: [
    {
      title: 'The Sun: the body’s first clock',
      paragraphs: [
        'Your body keeps more than one kind of time. Deep in the brain a body clock runs on a cycle of about a day, shaping when you feel awake, sleepy or hungry. It needs resetting every day, and its strongest cue is light entering the eyes, above all sunlight.',
        'Morning light tells the body the day has begun; strong light late at night pushes the clock later and makes sleep harder. In a 2013 study by Kenneth Wright and colleagues, eight people camped for a week with only natural light, and the timing of their melatonin shifted about two hours earlier, closer to sunrise and sunset. It was a small group, but the picture is clear: living nearer natural light brings the inner clock nearer the sky’s. For people who work indoors all day, the lesson is modest: let your eyes meet outdoor light early, and soften bright light at night.',
      ],
    },
    {
      title: 'The Sun and mood: when light grows thin',
      paragraphs: [
        'Many people feel lighter on bright days and heavier in long grey spells. Medicine recognises seasonal depression, which the UK’s NHS links to reduced daylight that can disturb the body clock and brain chemistry. Care ranges from simple habits, such as time in natural light, to treatments like light therapy or talking therapy guided by a clinician. Vietnam has smaller seasonal swings in day length, but rainy weeks and months spent indoors can still keep us from the sun.',
        'Sunlight also helps the skin make vitamin D. The World Health Organization notes that some UV exposure is beneficial but that UV radiation is the main cause of skin cancer. Its advice: limit time in the midday sun (roughly 10 a.m. to 4 p.m.), seek shade, wear clothing and a hat, and do not use sunscreen to stay in the sun longer. “Sunbathing” here means gentle morning light with protection. People with very fair skin, a history of skin problems, and young children need extra care.',
      ],
    },
    {
      title: 'The Moon: a circle of nearly thirty days',
      paragraphs: [
        'The Moon makes no light of its own; it reflects the Sun’s. Half of it is always lit, and from Earth we see more or less of that lit half as the three bodies move. One cycle takes about 29.5 days, so a lunar month lasts 29 or 30 days.',
        'On the first of the lunar month the Moon lies between Earth and Sun and its lit side turns away: the night is dark. Around the fifteenth, Earth lies between them and we see the full disc, rising at dusk and setting at dawn. At the end of the month only a thin crescent rises shortly before dawn, then vanishes, and the cycle begins again. The figure below puts these three markers on one circle.',
      ],
    },
    {
      title: 'What is real, and what is uncertain',
      paragraphs: [
        'One thing is certain: the Moon and Sun pull on the oceans and make tides, strongest near new and full moon when the three bodies are nearly in line. But that pull acts on vast bodies of water. On a human body it is far too small to explain mood or behaviour, and it is the same at new moon as at full moon.',
        'Science has found something more modest: sleep. In 2013 Christian Cajochen’s team re-examined data from 33 volunteers who had slept in a closed laboratory, unaware of the moon phase. Around the full moon, deep-sleep brain activity fell by about 30%, falling asleep took about five minutes longer, sleep was about twenty minutes shorter and melatonin was lower. In 2021 Leandro Casiraghi’s team tracked sleep with wrist monitors in Toba/Qom communities in Argentina and among students in Seattle. In the nights before the full moon people went to bed later and slept less, most clearly where there was no electricity. Both studies are small and concern sleep, not temper; the first authors themselves allow other explanations.',
        'The popular belief that full moons bring madness, crime or crowded hospitals has not held up. A 1985 meta-analysis of 37 studies by James Rotton and Ivan Kelly found no reliable link, lunar phase explaining no more than about 1% of the variation, and a 2015 analysis by Jean-Luc Margot of hospital admissions and births found none either. Much of what we notice is selective memory: we remember the busy full-moon night and forget the busy ordinary one.',
      ],
    },
    {
      title: 'Full moon, the thirtieth, the first: three thresholds in a month',
      paragraphs: [
        'From here we leave measurement and enter tradition and reflection. Many Vietnamese families treat the first and fifteenth of the lunar month as pauses: lighting incense, eating vegetarian, visiting a temple. You need no creed to see the value of regular markers; they give the mind a beat among days that slip by.',
        'The full moon is fullness at its peak: a bright night, a world made visible, inner things appearing more clearly. It suits looking back: what is full in me, what is overflowing? The thirtieth, with its fading crescent, invites closing: tidying, small debts repaid, apologies, forgiveness. The first, the dark of the new moon, is like freshly turned soil: empty, quiet, waiting for a seed, a place for one small intention.',
      ],
    },
    {
      title: 'Why does the Moon seem to magnify what lies within?',
      paragraphs: [
        'Many people say that around the full moon old sadness, worry, joy and creativity all seem sharper. I have no evidence that the Moon pours anything into us, but several readings seem reasonable. First, sleep: if sleep is later and lighter for a few nights, tiredness makes feelings rise more easily. Second, attention: a bright night invites us outside and slows us down, and when outer noise settles, inner voices are easier to hear. Third, expectation: if we grew up hearing that the full moon makes people irritable, we notice the irritable full-moon days and forget the others. That is confirmation bias, a very human habit.',
        'Fourth, an image that contemplatives treasure: the Moon makes no light, it only reflects. The Moon plants nothing new in us; moonlight only lights up what was already there. This view takes away both fear and blame. If your heart is stirred on a full-moon night, the Moon has not harmed you; it has offered a chance to see what was waiting to be seen.',
      ],
    },
    {
      title: 'The other half of the story: what helps practice and healing',
      paragraphs: [
        'If the Moon is a lamp, a lamp can also light the way. First, rhythm: practice and healing need regularity, and the Moon offers a natural calendar anyone can see. Attach one small habit to the first and the fifteenth. Second, gentle light for a sitting: a full-moon night is bright enough to sit outside, and you can let the Moon be an anchor for attention, eyes softly open. If it feels uncomfortable, close your eyes or change anchor.',
        'Third, a threshold for honesty: when things show up more clearly, name what is there, “I am sad”, “I am worried”, and stay beside it for a while. Fourth, your own record. Rather than believing or doubting others, note sleep, mood and moon phase for three months. Either a pattern of your own appears, or you are freed from a needless worry. Both are useful.',
      ],
    },
    {
      title: 'Weaving the sky’s rhythms into a day and a month',
      paragraphs: [
        'These are suggestions, not rules. In a day: spend a few minutes in natural morning light, avoid harsh midday sun, and in the evening soften light and screens. In a month, think of four small seasons. On the first, sow: sit a few minutes and write one small, kind intention. Around the eighth, tend: see where it stands and do one tiny thing for it. At the full moon, reflect: write three gratitudes and one thing you see more clearly about yourself. Around the twenty-second, release: choose one thing to hold more lightly. On the thirtieth, close: tidy your desk, write a thank-you or an apology, and sleep early.',
        'What matters most is lightness. If you miss a month, rejoin at the next first or fifteenth. The Moon will be full again.',
      ],
    },
    {
      title: 'A few notes for walking kindly with heaven and earth',
      paragraphs: [
        'This article combines a few published studies with personal reflection; it is not medical advice. The Moon should not become an explanation for everything. If sadness lasts, sleep fails for many nights, anxiety is heavy or you have thoughts of harming yourself, that is not the Moon’s doing: tell someone close and seek help from a doctor or therapist.',
        'If you are under treatment, do not change medication or routines because of a lunar calendar; talk with your clinician. And if some full-moon night you only want to sleep early and let the Moon shine on without you, that is enough.',
      ],
    },
  ],
  practice: {
    title: 'A small moon cycle of your own',
    steps: [
      'This morning, spend a few minutes in natural light, on a balcony, in the yard or by a wide window. Do not look straight at the Sun; let the light rest on your face and let your eyes look far.',
      'Tonight, find out which day of the lunar month it is and what phase the Moon is in. If the sky is clear, step outside and look for a while.',
      'Write three short lines: how your body feels, which feeling is here, what you keep repeating in your mind.',
      'On the first, the fifteenth and the end of the month, add one line: a small intention, a thanks, something to release.',
      'After three moons, reread your notes and ask only: what pattern is mine? If you see none, that is also an answer.',
    ],
  },
  note: 'This article combines a few published studies with personal reflection; the spiritual part is a way of looking, not medicine or established fact. If you struggle with sleep or mood, please seek help from a doctor or mental-health professional, and protect your skin in the sun.',
  cta: { label: 'Read next: Listening to nature', slug: 'listening-to-nature' },
};

const words = (t: ArticleTranslation) => [t.introduction, ...t.sections.flatMap(section => section.paragraphs), ...t.practice.steps].join(' ').trim().split(/\s+/).length;

export const skyRhythmArticle: Article = {
  slug: 'sun-moon-rhythms',
  viSlug: 'mat-troi-mat-trang-nhip-song-cua-ta',
  image: '/media/illustrations/sun-moon-cover.webp',
  minutes: Math.max(3, Math.ceil(words(en) / 200)),
  minutesVi: Math.ceil(words(vi) / 180),
  level: 'beginner',
  publishedAt: '2026-11-24',
  keywords: {
    vi: 'mặt trời, mặt trăng, trăng tròn, ngày rằm, mồng một, ngày ba mươi, chu kỳ trăng, nhịp sinh học, thiên nhiên, thiền, chữa lành',
    en: 'sun, moon, full moon, new moon, lunar cycle, body clock, circadian rhythm, nature, meditation, healing',
  },
  relatedSlugs: ['listening-to-nature', 'mindful-gardening', 'breath-meditation'],
  sources: [
    { title: 'Cajochen et al. (2013), Evidence that the lunar cycle influences human sleep. Current Biology', url: 'https://pubmed.ncbi.nlm.nih.gov/23891110/' },
    { title: 'Casiraghi et al. (2021), Moonstruck sleep: synchronization of human sleep with the moon cycle under field conditions. Science Advances', url: 'https://pubmed.ncbi.nlm.nih.gov/33571126/' },
    { title: 'Wright et al. (2013), Entrainment of the human circadian clock to the natural light-dark cycle. Current Biology', url: 'https://pubmed.ncbi.nlm.nih.gov/23910656/' },
    { title: 'Rotton & Kelly (1985), Much ado about the full moon: a meta-analysis of lunar-lunacy research. Psychological Bulletin', url: 'https://doi.org/10.1037/0033-2909.97.2.286' },
    { title: 'Margot (2015), No evidence of purported lunar effect on hospital admission rates or birth rates. Nursing Research', url: 'https://seti.ucla.edu/jlm/publications/Margot15.nres.NoLunarEffect.pdf' },
    { title: 'WHO, Ultraviolet radiation (fact sheet)', url: 'https://who.int/news-room/fact-sheets/detail/ultraviolet-radiation' },
    { title: 'NHS, Seasonal affective disorder (SAD)', url: 'https://www.nhs.uk/mental-health/conditions/seasonal-affective-disorder-sad/overview/' },
  ],
  sourcesNote: {
    vi: 'Những nghiên cứu và hướng dẫn được nhắc trong bài. Mình chỉ tóm tắt điều các nguồn ấy nói; phần chiêm nghiệm về tâm linh là của riêng người viết, không phải kết luận của các nghiên cứu.',
    en: 'The studies and guidance mentioned in the article. I only summarise what these sources say; the spiritual reflection is the writer’s own and not a conclusion of the research.',
  },
  translations: { vi, en },
};
