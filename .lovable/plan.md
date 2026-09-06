# Fix Two States responsive composition

## Changes
- Replace the abrupt `66%` to `30%` artwork width jump with fluid `clamp()` sizing that stays compact around 700px, grows appropriately for tablet, and becomes more substantial again on wide desktop.
- Separate mobile, tablet, and wide-desktop connector paths so each aspect ratio keeps a clearly visible curved arc instead of being flattened by the wide container.
- Keep both state blocks aligned to their existing corners and preserve the synchronized reveal and scroll drawing behavior.

## Verification
- Check the live section at approximately 375px, 700px, 900px, and 1440px.
- At each width, confirm Gujarat and Uttar Pradesh do not overlap and both dotted connectors remain visibly curved and meet toward the center.

## Technical details
- Limit the change to `src/components/TwoStatesUnion.tsx` unless verification exposes a directly related global styling issue.
- Use responsive Tailwind arbitrary `clamp()` widths and breakpoint-specific SVG paths/masks.
