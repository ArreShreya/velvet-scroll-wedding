# Replace the Golden Scroll with a Sealed Envelope Reveal

## Goal
Remove the golden-rod framing and introduce a refined envelope invitation opening: visitors first see a sealed blush-and-ivory envelope with the existing P&S monogram on its seal, then tap anywhere to open it and reveal the wedding invitation at nearly full-screen width and height.

## Changes

1. **Create the sealed-envelope landing**
   - Keep the existing soft watercolor beach as the full-screen backdrop so the introduction remains visually connected to the current invitation.
   - Replace the closed scroll, rods, thread, and tassel with one centered landscape envelope sized responsively for mobile and desktop.
   - Build the envelope from textured ivory/blush paper layers with a folded front, triangular flap, subtle rose-gold edging, realistic depth, and the existing P&S monogram centered on a circular seal.
   - Keep the wedding title and a localized tap-to-open cue, positioned so neither overlaps the envelope.

2. **Animate the envelope opening**
   - On tap, rotate the flap upward around its fold, soften/release the seal, and lift the invitation sheet slightly from inside the envelope.
   - Transition the extracted sheet into the full invitation surface while the envelope and beach backdrop fade and move out cleanly.
   - Preserve the existing open-triggered kumkum/rice shower, shloka audio, and `ShellOpenContext` timing so downstream reveal animations still wait for the transition to finish.
   - Provide an immediate, stable open state for visitors who prefer reduced motion.

3. **Remove the golden-scroll frame**
   - Remove both rod elements and all rod-specific sizing, rotation, paper-wrap, tassel/thread, clipping, and z-index logic from the shell.
   - Remove the permanent velvet side masks and deckled-edge frame that currently reserve space for the rods.
   - Leave obsolete rod assets unreferenced rather than deleting shared uploaded assets from storage.

4. **Expand invitation content to the viewport**
   - After opening, make the handmade-paper invitation the main full-screen scrolling surface beneath the fixed header.
   - Replace the current rod-bounded fixed viewport and large `--paper-inset` margins with narrow responsive safe-area padding, maximizing image and body width on phones while retaining comfortable reading gutters on larger screens.
   - Keep every existing invitation section, scroll snapping, language toggle, monogram header, illustrations, translations, and page animations intact.
   - Ensure event artwork remains full and prominent with no horizontal overflow or clipping.

5. **Header and interaction behavior**
   - Keep the top header hidden during the sealed-envelope state and reveal it only after the invitation opens.
   - Restyle the opened header as a light translucent paper/blush strip so it belongs to the full-screen invitation rather than the removed velvet scroll frame.
   - Make the entire intro a keyboard-accessible open control with visible focus behavior and retain press feedback.

6. **Verification**
   - Verify closed, opening, and open states on the current mobile viewport and a desktop viewport.
   - Confirm the P&S seal is centered, the envelope flap reads clearly, the transition never flashes rods or underlying content, and the invitation uses substantially more screen area.
   - Confirm scrolling, section snapping, language switching, audio trigger, particle shower, reduced motion, and horizontal overflow behavior remain correct.

## Technical details

- Refactor `ScrollShell.tsx` from `closed → opening → open` rod geometry to the same phase model driving envelope layers and the invitation-sheet transition.
- Reuse `monogram-ps.png.asset.json`, `beach-watercolor.jpg`, existing paper texture utilities, translations, and reveal context.
- Add envelope-specific semantic colors, shadows, folds, and keyframes in `src/styles.css`; keep visual values tokenized and animations transform/opacity-based.
- Use responsive CSS geometry for the envelope so the seal and folds stay precisely aligned across aspect ratios without requiring a second asset set.
