# Reinado RPG Brasil

Static landing page for the Brazilian Minecraft RPG server "ReinadoRPG Brasil", customized from a Turkish/multi-locale Minecraft server template.

## Architecture

- **Type**: Static HTML/CSS/JS site served by Vite
- **Artifact**: `artifacts/reinadorpg` (web), preview path `/`
- **Entry**: `artifacts/reinadorpg/index.html` (no React; static HTML)
- **Public assets**: `artifacts/reinadorpg/public/`
  - `assets/css/style.css` — global styles, purple theme
  - `assets/js/i18n.js` — multi-locale translations, defaults to `br`
  - `assets/js/main.js` — minor interactions (scroll, IP copy, etc.)
  - `background.png` — hero background image (user-supplied)
  - `favicon.png` / `logo.png` — ReinadoRPG logo (user-supplied)

## Customizations applied (vs. original template)

- Theme: green → purple (`#7c3aed`) on black; CSS var `--minecraft-green` reused for compatibility.
- Hero video iframe replaced with image background (`background.png`).
- Branding: TurkBlock/BlockCraft Network → ReinadoRPG Brasil everywhere.
- Server IP: `play.turkblock.net` → `reinadorpg.com.br`.
- Badge: "Minecraft 1.21.x • Paper" → "Minecraft 1.21.x/26.+ • Purpur".
- Removed: ToS first card ("Hizmet Kapsamı"/"Escopo do Serviço"), Imprint company-info card, Twitter/LinkedIn/GitHub social links.
- Added: TikTok social card and footer icon (https://www.tiktok.com/@reinadorpg).
- Discord widget iframe replaced with simple invite CTA (https://discord.com/invite/5jvwssAV9t).
- YouTube link → https://www.youtube.com/@ReinadoRPGBR
- Email: rpggamingbrasil@gmail.com
- Phone: +55 14 99819-9235
- Location: Brasil, São Paulo
- Copyright: © 2026 ReinadoRPGBrasil. Todos os direitos reservados.
- Made-with: Feito com 💜 no Brasil.
- Footer description: "O continente de Aeldrynn é dividido em 5 grandes regiões..."
- Default locale set to `br` (Brazilian Portuguese); user can switch via dropdown.

## Notes

- The original `src/` React shell from the scaffold was removed; Vite serves `index.html` directly.
- Backend not used; no database or API needed.
