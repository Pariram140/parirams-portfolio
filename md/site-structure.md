# Site Structure

## Page Model

The site is a single-page layout wrapped in `#wrapper`, with section-to-section navigation using arrow links and the `scrolly` class.

## Ordered Section and Anchor Map

1. Intro (`.intro`): name, role, hero/banner image.
: next anchor points to `#publications`.
2. Publications (`#publications`): list of LinkedIn article links.
: previous points to `#wrapper`, next points to `#experience`.
3. Experience (`#experience`): work history with role blocks and detail bullets.
: previous points to `#publications`, next points to `#projects`.
4. Projects (`#projects`): personal/academic projects and technology summaries.
: previous points to `#experience`, next points to `#skills`.
5. Skills (`#skills`): categorized technical skills.
: previous points to `#projects`, next points to `#certifications`.
6. Certifications (`#certifications`): certification/learning credentials.
: previous points to `#skills`, next points to `#contact`.
7. Contact (`#contact`): email, phone, LinkedIn, GitHub.
: previous points to `#wrapper`.

## Navigation Behavior

- Arrow links use class `scrolly` and smooth-scroll behavior from `jquery.scrolly.min.js`.
- The site uses vertical progression and supports moving both forward and backward between adjacent sections.
- Initial load animation class `is-preload` is removed shortly after page load by `assets/js/main.js`.

## Update Guidance

- For content edits, update section text directly in `index.html`.
- Keep section IDs stable to avoid breaking anchor links.
- If a section order changes, verify all up/down anchor links in section headers.
