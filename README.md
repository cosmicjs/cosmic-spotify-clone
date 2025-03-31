# Spotify Clone

A Spotify-like music streaming application built with Next.js and [Cosmic](https://www.cosmicjs.com) CMS.

[Live Demo](https://cosmic-spotify-clone.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcosmicjs%2Fcosmic-spotify-clone&env=COSMIC_BUCKET_SLUG,COSMIC_READ_KEY,COSMIC_WRITE_KEY&envDescription=Required%20API%20keys%20from%20Cosmic&envLink=https%3A%2F%2Fwww.cosmicjs.com%2Fdocs%2Fapi%2Fauthentication)

[![Spotify Clone Screenshot 2](https://imgix.cosmicjs.com/9d793800-05d7-11f0-993b-3bd041905fff-cosmic-spotify-2.png?w=1200&auto=format,compression)](https://cosmic-spotify-clone.vercel.app)

[![Spotify Clone Screenshot 1](https://imgix.cosmicjs.com/9d6784c0-05d7-11f0-993b-3bd041905fff-cosmic-spotify-1.png?w=1200&auto=format,compression)](https://cosmic-spotify-clone.vercel.app)

## Features

- Music library with artists, albums, and tracks
- Playlist creation and management
- A music player with playback controls
- Responsive design for all devices

## Prerequisites

- Node.js 18.x or later (if using npm)
- Bun runtime (if using bun)
- A Cosmic CMS account and bucket

## Getting Started

1. **Set up Cosmic:**

   - Sign up for a free account at [https://www.cosmicjs.com/signup](https://www.cosmicjs.com/signup)
   - After signing up, create a new project by clicking "Create Bucket"
   - Choose the "Empty Bucket" option and give your project a name
   - Once created, find your bucket credentials by going to Project Settings > API Access
   - Copy your bucket slug and API keys for the next steps

2. Clone the repository:

```bash
git clone https://github.com/cosmicjs/cosmic-spotify-clone
cd spotify-clone
```

3. Install dependencies:

Using bun (recommended):

```bash
bun install
```

Using npm:

```bash
npm install
```

4. Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Set up the Cosmic object types by running the seed script:

Using bun:

```bash
bun scripts/seed-cosmic.ts
```

Using npm:

```bash
npm run seed
```

6. Start the development server:

Using bun:

```bash
bun dev
```

Using npm:

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Converting from npm to bun

If you have an existing project using npm and want to convert to bun, follow these steps:

1. Install bun globally (if you haven't already):

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Remove the existing node_modules folder and package-lock.json:

```bash
rm -rf node_modules package-lock.json
```

3. Install dependencies using bun:

```bash
bun install
```

4. Update your scripts to use bun:

   - Replace `npm run` with `bun run`
   - For TypeScript scripts, you can run them directly with bun (e.g., `bun scripts/seed-cosmic.ts`)

5. Start the development server with bun:

```bash
bun dev
```

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - React components
- `/lib` - Utility functions and configurations
- `/types` - TypeScript type definitions
- `/scripts` - Utility scripts

## Technologies Used

- Next.js 15
- TypeScript
- Tailwind CSS
- Cosmic CMS
- React Audio Player

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
