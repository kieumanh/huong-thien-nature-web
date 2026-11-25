"""Living Zen icon set: 24 × 24 grid, 2 px live area padding, 1.75 stroke, round caps and joins.

Brand icons carry the identity; functional icons follow the same rules so the two sets mix.
"""

BRAND = {
    'thien': ('Thiền', '<circle cx="12" cy="5.5" r="2"/><path d="M12 8.5v5"/><path d="M7.5 12.5 12 10l4.5 2.5"/><path d="M4.5 18.5c2.5-2.6 4.8-3.5 7.5-3.5s5 .9 7.5 3.5"/><path d="M6.5 20h11"/>'),
    'yoga': ('Yoga', '<circle cx="12" cy="4.5" r="2"/><path d="M12 7v7"/><path d="M5 9.5h14"/><path d="M12 14l-3.5 6"/><path d="M12 14l3.5 6"/>'),
    'hoi-tho': ('Hơi thở', '<path d="M3.5 9c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 1.5 1 2 1"/><path d="M3.5 13c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 1.5 1 2 1"/><path d="M3.5 17c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 1.5 1 2 1"/>'),
    'hoa-sen': ('Hoa sen', '<path d="M12 18c-2.4-2-2.6-6.6 0-10 2.6 3.4 2.4 8 0 10Z"/><path d="M11 18.2c-3.6-.3-5.6-3-5.5-6.7 2.8.9 4.9 3.4 5.5 6.7Z"/><path d="M13 18.2c3.6-.3 5.6-3 5.5-6.7-2.8.9-4.9 3.4-5.5 6.7Z"/><path d="M5 20.5h14"/>'),
    'trai-tim': ('Trái tim', '<path d="M12 19.5s-7.5-4.4-7.5-9.6A4 4 0 0 1 12 7.6a4 4 0 0 1 7.5 2.3c0 5.2-7.5 9.6-7.5 9.6Z"/>'),
    'tri-tue': ('Trí tuệ', '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3Z"/><path d="M12 7v3"/>'),
    'hat-giong': ('Hạt giống', '<path d="M12 20c-3.3 0-5.5-2.6-5.5-6S9 6.5 12 4c3 2.5 5.5 6.6 5.5 10S15.3 20 12 20Z"/><path d="M12 9.5c-1 2.3-1 5.2 0 7.5"/>'),
    'dat': ('Đất', '<path d="M3 13.5c3-3.2 6-4.8 9-4.8s6 1.6 9 4.8"/><path d="M3 17h18"/><path d="M6 20.5h12"/><path d="M12 4.5v2"/>'),
    'cay': ('Cây', '<path d="M12 21v-8"/><path d="M12 13c-4.4 0-7-2.7-7-6.3C5 4.6 7.2 3 9.2 3c1.2 0 2.2.5 2.8 1.3.6-.8 1.6-1.3 2.8-1.3 2 0 4.2 1.6 4.2 3.7 0 3.6-2.6 6.3-7 6.3Z"/><path d="M8.5 21h7"/>'),
    'nuoc': ('Nước', '<path d="M12 3.5s-6 6.6-6 10.5a6 6 0 0 0 12 0c0-3.9-6-10.5-6-10.5Z"/><path d="M9.2 14.5a2.8 2.8 0 0 0 2.8 2.8"/>'),
    'anh-sang': ('Ánh sáng', '<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>'),
    'mat-trang': ('Mặt trăng', '<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.3 6.3 0 0 0 10 10Z"/>'),
    'mat-troi': ('Mặt trời', '<path d="M3 17.5h18"/><path d="M6.5 17.5a5.5 5.5 0 0 1 11 0"/><path d="M12 6v2.2M5.2 10.2l1.6 1.2M18.8 10.2l-1.6 1.2"/><path d="M7 20.5h10"/>'),
    'sach': ('Sách', '<path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5"/><path d="M12 6.5C14 5 17 4.5 20 5v13c-3-.5-6 0-8 1.5"/><path d="M12 6.5v13"/>'),
    'nhat-ky': ('Nhật ký', '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 3.5v17"/><path d="M12 8.5h4M12 12h4"/>'),
    'an-chay': ('Ẩm thực chay', '<path d="M3.5 12h17a8.5 8.5 0 0 1-17 0Z"/><path d="M12 12c0-3 1.5-5.5 4.5-6.5"/><path d="M12 12c-.5-2.4-2-4-4.5-4.5"/>'),
    'tarot': ('Tarot', '<rect x="6.5" y="3.5" width="11" height="17" rx="2"/><path d="M12 8.5l1.2 2.3 2.3 1.2-2.3 1.2L12 15.5l-1.2-2.3L8.5 12l2.3-1.2Z"/>'),
    'cong-dong': ('Cộng đồng', '<circle cx="12" cy="7" r="2.5"/><circle cx="5.5" cy="10" r="2"/><circle cx="18.5" cy="10" r="2"/><path d="M7.5 19a4.5 4.5 0 0 1 9 0"/><path d="M2.5 18a3.2 3.2 0 0 1 4.2-3M21.5 18a3.2 3.2 0 0 0-4.2-3"/>'),
    'phung-su': ('Phụng sự', '<path d="M3.5 14.5 7 13c1.2-.5 2.4-.5 3.5 0l3 1.4a1.4 1.4 0 0 1-1.2 2.6L9.5 16"/><path d="M3.5 20l3.5-1.5 5 1.5 7-3.6a1.5 1.5 0 0 0-1.5-2.6L14 16"/><path d="M15 9.5s-3-1.8-3-4A1.8 1.8 0 0 1 15 4.4a1.8 1.8 0 0 1 3 1.1c0 2.2-3 4-3 4Z"/>'),
    'than-tam-tri': ('Thân – Tâm – Trí', '<path d="M12 3.5 20.5 19H3.5Z"/><circle cx="12" cy="9.5" r="1.3"/><circle cx="8" cy="16" r="1.3"/><circle cx="16" cy="16" r="1.3"/>'),
}

FUNCTIONAL = {
    'home': ('Trang chủ', '<path d="M4 11 12 4.5 20 11"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>'),
    'search': ('Tìm kiếm', '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>'),
    'menu': ('Menu', '<path d="M4 7h16M4 12h16M4 17h10"/>'),
    'account': ('Tài khoản', '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>'),
    'settings': ('Cài đặt', '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>'),
    'play': ('Phát nhạc', '<path d="M8 5.5v13l10-6.5Z"/>'),
    'volume': ('Âm lượng', '<path d="M4 10v4h3.5L12 18V6L7.5 10Z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>'),
    'bookmark': ('Đánh dấu', '<path d="M7 4h10v16l-5-3.5L7 20Z"/>'),
    'archive': ('Lưu trữ', '<rect x="3.5" y="4.5" width="17" height="4" rx="1"/><path d="M5 8.5V19h14V8.5"/><path d="M10 12h4"/>'),
    'share': ('Chia sẻ', '<circle cx="17" cy="6" r="2.5"/><circle cx="7" cy="12" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m9.2 10.8 5.6-3.4M9.2 13.2l5.6 3.4"/>'),
    'back': ('Quay lại', '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>'),
    'bell': ('Thông báo', '<path d="M6.5 16V11a5.5 5.5 0 0 1 11 0v5l1.5 2h-14Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
    'progress': ('Tiến trình', '<path d="M4 18.5h16"/><path d="M4 18.5V15M9.3 18.5v-6M14.7 18.5V9M20 18.5V5.5"/>'),
    'cart': ('Giỏ hàng', '<path d="M3.5 4.5h2.2l2 10.5h10l1.8-7.5H6.7"/><circle cx="9" cy="19" r="1.4"/><circle cx="16.5" cy="19" r="1.4"/>'),
    'calendar': ('Đặt lịch', '<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/><path d="m9.5 15 2 2 3.5-3.5"/>'),
    'help': ('Trợ giúp', '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .9-1 1.6v.5"/><path d="M12 17h.01"/>'),
}


def icon_svg(body: str, title: str, color: str = 'currentColor', size: int = 24) -> str:
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="{size}" height="{size}" fill="none" '
            f'stroke="{color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" role="img"><title>{title}</title>{body}</svg>\n')
