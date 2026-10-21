# Bosco — personal portfolio

A SpaceX-inspired visual refresh of the existing Bosco personal website. Buildless HTML, CSS and JavaScript; deploy the repository root on GitHub Pages as before.

## Preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` in this directory, then open http://127.0.0.1:8765/ . The files also work when opening index.html directly.

## Experience

- Cinematic Earth hero with a lightweight animated Canvas starfield and scroll parallax.
- Four existing projects with individual visual treatments, including three accessible project-detail dialogs.
- Scroll reveals, animated workflow lines, breathing visual effects, progress indicator and button transitions.
- Responsive layouts at desktop, tablet and mobile widths.
- Animation pause button, system reduced-motion preference, keyboard-accessible navigation, modal Escape handling and focus restoration.
- Fonts and imagery are hosted locally. No npm dependencies or build step.

## Content and limitations

All profile, employment, project and contact facts come from the original website. The visuals accompanying projects are conceptual artwork, not screenshots of their interfaces. Unpublished projects open an explanatory dialog rather than a fabricated live demo. Social links and the public Aura repository retain their original destinations. No contact forms, tracking or server integrations have been added.

## Assets

- Earth photograph: https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4 (downloaded at 2000px; served locally).
- Barlow Condensed and DM Sans: Google Fonts. SIL Open Font License texts are included in assets/.
- Other illustrations: original CSS artwork.

## Publication

Production: https://boscoshubin-cpu.github.io/

GitHub Pages publishes the repository root from the main branch. A push to main triggers the Pages build and deployment. The previous design remains available in Git history.
