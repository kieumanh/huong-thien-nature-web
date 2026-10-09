# Hương Thiền Nature 2.0.3 — Circular ecosystem

Reference: the “Có thể đồng hành cùng bạn” section of https://kieumanh.github.io/Portfolio/.

Each of the three ecosystem pyramids anchors a circular path. Two related values travel around each centre while their text stays upright. The centre remains stationary. One shared pause/resume control applies to the diagram, which stops off screen and in hidden tabs. Reduced motion, data saver and unavailable IntersectionObserver keep it static. CSS handles rotation without a frame-by-frame JavaScript loop.

Desktop uses three columns; tablet uses horizontal image/text pairs; mobile stacks three centres. Vietnamese and English browser checks passed at 1440, 820, 390 and 320 px: active rotation, manual pause/resume, reduced-motion change, no horizontal overflow, and labels inside the viewport sampled throughout a full revolution. No page JavaScript errors occurred.

Astro check: no errors, warnings or hints. Build: 56 pages. Source and build audits passed. Existing ecosystem and hybrid tests passed, alongside new visibility/manual pause/reduced-motion/data-saver state tests.
