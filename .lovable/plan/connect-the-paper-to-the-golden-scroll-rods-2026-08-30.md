# Connect the Paper to the Golden Scroll Rods

## Goal
Make the opened invitation read as one physical scroll: the handmade paper visibly feeds into both golden rods, the rods remain layered above it, and no page content can bleed beyond the framed area.

## Changes
1. **Join paper and rods visually**
   - Extend the fixed handmade-paper surface underneath the inner portion of both rods instead of stopping short at their outer edges.
   - Keep both golden rod images above the paper so the paper appears wrapped into the cylinders, not painted over them.
   - Preserve the existing rod thickness, scale, position, and opening animation.

2. **Constrain the scrolling pages**
   - Turn the area bounded by the top and bottom rods into the visible scroll viewport.
   - Clip page artwork and text at the rod boundaries so content never appears above the top rod, inside the header, or below the bottom rod.
   - Keep vertical scrolling continuous and retain the current deckled side edges and responsive margins.

3. **Preserve the landing and header behavior**
   - Apply the connected-paper treatment only after/during unfurling; the closed beach landing remains unchanged.
   - Keep the monogram and language-toggle header above the top rod exactly as it is.

4. **Verify the result**
   - Check the closed, opening, and fully opened states on desktop and mobile.
   - Confirm the paper meets both rods with no gap, content stays clipped behind them while scrolling, and there is no horizontal overflow.

## Technical details
- Update the shell geometry in `ScrollShell.tsx` so the decorative paper backing overlaps beneath the rods while the content viewport uses strict top/bottom clipping.
- Maintain an explicit layer order: paper backing → scrolling content/deckled edges → rod masks/rod artwork → fixed header.
- Reuse the existing CSS variables for header and rod height so all boundaries remain synchronized at every responsive size.
