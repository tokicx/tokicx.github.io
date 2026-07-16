# KindMoment Website

Official static product, support and legal website for KindMoment.

## Pages

- `index.html` — product overview and support center
- `privacy.html` — privacy policy
- `terms.html` — terms of use
- `styles.css` — responsive light/dark design
- `assets/` — optimized KindMoment icon and app screenshots
- `robots.txt` — crawler instructions
- `SECURITY.md` — private vulnerability-reporting guidance
- `LICENSE.md` — explicit all-rights-reserved copyright notice

## GitHub Pages URLs

- Website and Support URL: `https://tokicx.github.io/`
- Privacy Policy URL: `https://tokicx.github.io/privacy.html`
- Terms of Use URL: `https://tokicx.github.io/terms.html`

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Maintenance notes

- The site intentionally avoids hardcoding the annual subscription price. Apple
  displays the authoritative localized price before purchase.
- Update the legal pages before introducing cloud AI, analytics, advertising,
  crash reporting or other services that process data outside the device.
- The public repository contains only website files. KindMoment application
  source code and private configuration must remain in the private app project.
