# Shreya weds Prabhav — Velvet Scroll Wedding Site

A single continuous experience: a tied velvet scroll that unfurls on tap, then becomes the fixed frame for all content.

## 1. Opening mechanic

- On first load: full-screen blush/ivory backdrop with only the closed velvet roll centered — paper roll body, golden finial rods at each end, gold thread tied around the middle with a tassel. Subtle idle shimmer plus a "tap to open" cue.
- On tap: gold thread loosens and falls away, then the roll splits — the top rod travels up to the top of the viewport, the bottom rod travels down to the bottom, and the handmade-paper surface between them grows to fill the screen. Content fades in after the unfurl settles.
- After opening: both golden rods stay pinned (fixed) at the very top and very bottom of the viewport for the rest of the session. Only the paper area between them scrolls.
- Opened state is remembered for the session so it doesn't replay on internal navigation.

## 2. The scroll shell

- Fixed top rod + fixed bottom rod, with a single scrollable paper column between them.
- Paper surface: handmade-paper texture (deckled fibers, warm ivory), continuous behind every page — no seams between sections.
- Content pages stack vertically inside that column, each roughly one viewport tall, snapping gently as the reader scrolls.

## 3. Pages

1. **Ganesha invocation** — Ganesha murti illustration with the full Vakratunda Mahakaya shloka (Devanagari + transliteration) beneath it.
2. **Couple names** — "Shreya weds Prabhav" as the page's hero: large script names, small ornamental "weds" connector, centered.
3. **Timeline** — semi-circle arc timeline recreating the reference layout, re-skinned blush pink / ivory / rose-gold. Events placed along the arc, each with its own small illustrated icon, grouped by date:
   - 11 December — Mehandi 2PM, Engagement & Sangeet 6:30PM, Masquerade 10:30PM
   - 12 December — Haldi 10:30AM, Baarat 4PM, Varmala 5:30PM, Fera 11PM
4. **Event pages (7)** — one per event, in the order above, each with event name + time and a full-scene wide illustration (small figures, large venue backdrop). Themes: Mehandi (dark pink/orange lawn, palms), Engagement & Sangeet (royal blue/gold lawn stage with truss lighting), Masquerade (black/magenta indoor hall, disco ball), Haldi (lilac/yellow pool deck rain dance), Baarat (dhol players, dancing procession), Varmala (white/pink beach mandap), Fera (starry "taaron ki chhaon", red decor). No decorative paper element at the top of these pages.

Per your note, event-page illustrations are left as clearly-marked placeholder frames (correct size, palette-tinted, labeled) until the follow-up SVG/animation spec arrives; layout, typography and timing all ship now so the artwork drops straight in.

## 4. Look

- Base palette: blush pink, ivory, warm sand, muted rose-gold accents — the connective thread across all pages.
- Each event page carries its own accent colors as tints layered over the same paper base, so it never breaks the palette.
- Typography: an elegant display serif for names/headings with a clean humanist sans for details.

## Technical notes

- One route (`/`) rendering the scroll shell plus stacked page sections; route metadata set for the wedding.
- Palette, paper texture, and rod/gold treatments defined as semantic tokens in `src/styles.css`.
- Unfurl animation via CSS transforms on the two rod halves and the paper panel; respects reduced-motion (instant open).
- Ganesha art, timeline icons, paper and velvet/rod textures generated as assets now; event scenes deferred to the follow-up.
