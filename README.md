# Spotify Clone

A Spotify-like music streaming application built with Next.js and Cosmic CMS.

## Features

- Music library with artists, albums, and tracks
- Playlist creation and management
- A music player with playback controls
- Responsive design for all devices

## Prerequisites

- Node.js 18.x or later
- A Cosmic CMS account and bucket

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd spotify-clone
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Set up the Cosmic object types by running the seed script:

```bash
npx ts-node scripts/seed-cosmic.ts
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - React components
- `/lib` - Utility functions and configurations
- `/types` - TypeScript type definitions
- `/scripts` - Utility scripts

## Technologies Used

- Next.js 14
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
