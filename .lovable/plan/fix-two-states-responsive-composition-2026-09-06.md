# Fix Two States responsive composition

## Changes
- Replace the abrupt `66%` to `30%` artwork width jump with fluid `clamp()` sizing. The illustrations will remain large and clearly legible at every width; sizing will reduce only enough around the collision-prone middle range to prevent overlap, then grow again for tablet and wide desktop.
- Separate mobile, tablet, and wide-desktop connector paths so each aspect ratio keeps a clearly visible curved arc instead of being flattened by the wide container.
- Keep both state blocks aligned to their existing corners and preserve the synchronized reveal and scroll drawing behavior.

## Verification
- Check the live section at approximately 375px, 700px, 900px, and 1440px.
- At each width, confirm Gujarat and Uttar Pradesh do not overlap and both dotted connectors remain visibly curved and meet toward the center.
- Confirm the illustrations still occupy a prominent portion of the screen rather than becoming visually small.

## Technical details
- Limit the change to `src/components/TwoStatesUnion.tsx` unless verification exposes a directly related global styling issue.
- Use responsive Tailwind arbitrary `clamp()` widths and breakpoint-specific SVG paths/masks.
