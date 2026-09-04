# Muhammad Adib Bowo Laksono Portfolio

Personal portfolio website for Muhammad Adib Bowo Laksono. The website presents professional experience, education, skills, certifications, contact information, and selected projects.

## Features

- Responsive layout for desktop, tablet, and mobile screens.
- Portfolio filtering by Web, Mobile, Game, Bot, IoT, and Desktop App.
- Clickable portfolio images with a full-size preview modal.
- Experience and certification modals with scrollable content.
- Ambient music player with playlist support through `assets/music/music.json`.
- Play, pause, previous, next, stop, and minimize controls for the music player.
- Light and dark theme switching.
- Custom accent color picker.
- Scroll reveal animations.

## Portfolio Projects

The portfolio includes web applications, mobile applications, games, automation bots, IoT systems, and desktop tools, including:

- Portal Bea Cukai Kuala Namu.
- PT Kalijaga Mandiri Sejahtera portfolio website.
- Customs Data Cleansing Tool.
- Import Manifest Processing Tool.
- IoT-based egg incubator monitoring system.
- News, cashier, automation, and game projects.

## Tools and Libraries

- **HTML5** for the website structure.
- **CSS3** for responsive styling, themes, layouts, and animations.
- **JavaScript** for interactions, modals, music playback, and portfolio filtering.
- **Boxicons** for interface icons.
- **MixItUp** for portfolio category filtering.
- **ScrollReveal** for scroll-based reveal animations.
- **Web Audio API** for ambient music generation.

## Project Structure

```text
index.html              Main portfolio page
assets/css/styles.css   Website styles
assets/js/main.js       Website interactions
assets/music/           Music files and playlist manifest
assets/img/             Profile and portfolio images
assets/pdf/             Downloadable CV files
```

## Running Locally

Open `index.html` in a browser, or serve the project with any local static web server. A local server is recommended because the music playlist is loaded from `assets/music/music.json` using `fetch`.
