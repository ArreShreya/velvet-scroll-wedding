# Single-Step Envelope Entry and Formal Invitation

## Goal
Make the wax-seal envelope the only entry gate, then replace the current couple-name section with the supplied formal invitation in English, Hindi, and Gujarati.

## Changes
1. **Collapse the entry flow**
   - Remove the separate beach/envelope landing stage from `ScrollShell`.
   - Keep the existing full-page wax-seal gate as the sole opening interaction.
   - When its flap/blur animation completes, set the invitation directly to its open state so the header, audio, reveal context, particles, and scrollable content activate without a second tap.
   - Preserve reduced-motion behavior with an immediate transition.

2. **Add localized formal invitation copy**
   - Add structured invitation fields for all three languages using the exact supplied wording.
   - Preserve separate headings, salutations, family relationships, invitation paragraphs, signatories, and complimentary closing so spacing can remain intentional rather than relying on embedded newline strings.

3. **Replace the couple-name page**
   - Remove the existing simple presence request, oversized bride/groom lockup, blessing, date, and hands illustration from that section.
   - Render the selected language’s formal invitation as a centered, readable ceremonial composition with hierarchy for the invocation, couple names, family lines, body copy, and signatories.
   - Allow the longer content to use natural page height while keeping the existing scroll and snap flow usable.

4. **Script rendering and responsive polish**
   - Extend the loaded font families to include Gujarati alongside the existing Devanagari support.
   - Use language-aware typography and mobile-safe line wrapping so Hindi and Gujarati conjuncts do not split or overflow.

5. **Verification**
   - Verify a single seal tap leads directly to open, scrollable invitation content.
   - Verify the formal section switches correctly among English, Hindi, and Gujarati and remains readable without horizontal overflow on mobile.
