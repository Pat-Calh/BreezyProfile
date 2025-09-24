# Personal Profile — Music & Photography

A modern, responsive single-page site to showcase your music, photography, and social links.

## Quick Start

1. Open `index.html` directly in your browser to preview.
2. Add your photos to `assets/img/` and update the gallery links in `#photos`.
3. Update your social links in the header and the email in the Contact section.
4. Replace the Spotify/SoundCloud iframes under the `#music` section with your own embeds.

## Customize

- Title/name: edit the `<title>` and the `logo`/Hero heading in `index.html`.
- Colors: tweak CSS variables at the top of `assets/css/styles.css`.
- Fonts: update the Google Fonts link in `index.html` if desired.
- Social icons: the SVGs are inline so you can change color via CSS (`currentColor`).
- Gallery: replace the `assets/img/sampleX.jpg` paths with your images. Add/remove `<a>` items as needed.
- Open Graph preview: set `assets/img/og-image.jpg` and update meta tags in `<head>`.

## Recommended Image Sizes

- Gallery thumbnails: Use at least 1200px on the long edge (JPG or WebP). They will auto-crop in a square via `aspect-ratio`.
- Open Graph image: 1200x630px.

## Deploy

- Netlify: Drag-and-drop the folder into Netlify, or connect your repo. No build step required.
- GitHub Pages: Push to a repo, then enable Pages to serve from the root (main branch).

## Optional Enhancements

- Add more music providers (Apple Music, Bandcamp) by copying an `.embed` block and a `.switch-btn`.
- Add a dedicated `about` section with a portrait and bio.
- Add a contact form using Netlify Forms.

## License

MIT. Feel free to modify.
