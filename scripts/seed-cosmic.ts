import { createBucketClient } from "@cosmicjs/sdk";

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG;
const WRITE_KEY = process.env.COSMIC_WRITE_KEY;
const READ_KEY = process.env.COSMIC_READ_KEY;

if (!BUCKET_SLUG || !WRITE_KEY || !READ_KEY) {
  throw new Error("Missing required environment variables");
}

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  writeKey: WRITE_KEY,
  readKey: READ_KEY,
});

async function uploadImageFromUrl(url: string, filename: string) {
  try {
    console.log(`Fetching image from ${url}...`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Converting to blob...");
    const blob = await response.blob();
    console.log(`Blob type: ${blob.type}, size: ${blob.size} bytes`);

    console.log("Converting to buffer...");
    const buffer = await blob.arrayBuffer();
    console.log(`Buffer length: ${buffer.byteLength} bytes`);

    console.log("Uploading to Cosmic...");
    const { media } = await cosmic.media.insertOne({
      media: {
        originalname: filename,
        buffer: Buffer.from(buffer),
      },
    });

    console.log(`Successfully uploaded ${filename} to Cosmic`);
    return media;
  } catch (error) {
    console.error(`Error uploading image from ${url}:`);
    console.error("Full error:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
}

async function uploadAudioFromUrl(url: string, filename: string) {
  try {
    console.log(`Fetching audio from ${url}...`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Converting to blob...");
    const blob = await response.blob();
    console.log(`Blob type: ${blob.type}, size: ${blob.size} bytes`);

    console.log("Converting to buffer...");
    const buffer = await blob.arrayBuffer();
    console.log(`Buffer length: ${buffer.byteLength} bytes`);

    console.log("Uploading to Cosmic...");
    const { media } = await cosmic.media.insertOne({
      media: {
        originalname: filename,
        buffer: Buffer.from(buffer),
      },
    });

    console.log(`Successfully uploaded ${filename} to Cosmic`);
    return media;
  } catch (error) {
    console.error(`Error uploading audio from ${url}:`);
    console.error("Full error:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
}

async function seedObjectTypes() {
  try {
    // Create Artists object type
    await cosmic.objectTypes.insertOne({
      title: "Artists",
      slug: "artists",
      singular: "Artist",
      emoji: "👤",
      metafields: [
        {
          title: "Name",
          key: "name",
          type: "text",
          required: true,
        },
        {
          title: "Image",
          key: "image",
          type: "file",
          required: true,
          media_validation_type: "image",
        },
        {
          title: "Bio",
          key: "bio",
          type: "textarea",
          required: true,
        },
      ],
    });

    // Create Albums object type
    await cosmic.objectTypes.insertOne({
      title: "Albums",
      slug: "albums",
      singular: "Album",
      emoji: "💿",
      metafields: [
        {
          title: "Title",
          key: "title",
          type: "text",
          required: true,
        },
        {
          title: "Cover",
          key: "cover",
          type: "file",
          required: true,
          media_validation_type: "image",
        },
        {
          title: "Release Date",
          key: "release_date",
          type: "date",
          required: true,
        },
        {
          title: "Artist",
          key: "artist",
          type: "object",
          object_type: "artists",
          required: true,
        },
      ],
    });

    // Create Tracks object type
    await cosmic.objectTypes.insertOne({
      title: "Tracks",
      slug: "tracks",
      singular: "Track",
      emoji: "🎵",
      metafields: [
        {
          title: "Title",
          key: "title",
          type: "text",
          required: true,
        },
        {
          title: "Audio File",
          key: "audio",
          type: "file",
          required: true,
          media_validation_type: "audio",
        },
        {
          title: "Duration",
          key: "duration",
          type: "number",
          required: true,
        },
        {
          title: "Album",
          key: "album",
          type: "object",
          object_type: "albums",
          required: true,
        },
      ],
    });

    // Create Playlists object type
    await cosmic.objectTypes.insertOne({
      title: "Playlists",
      slug: "playlists",
      singular: "Playlist",
      emoji: "📀",
      metafields: [
        {
          title: "Title",
          key: "title",
          type: "text",
          required: true,
        },
        {
          title: "Description",
          key: "description",
          type: "textarea",
          required: true,
        },
        {
          title: "Cover",
          key: "cover",
          type: "file",
          required: true,
          media_validation_type: "image",
        },
        {
          title: "Tracks",
          key: "tracks",
          type: "objects",
          object_type: "tracks",
          required: false,
        },
      ],
    });

    console.log("Successfully created all object types!");
  } catch (error) {
    console.error("Error creating object types:", error);
    process.exit(1);
  }
}

async function seedContent() {
  try {
    // Upload artist images
    const taylorImage = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1494354145959-25cb82edf23d?w=400&h=400&fit=crop",
      "taylor-swift.jpg"
    );
    const edImage = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?w=400&h=400&fit=crop",
      "ed-sheeran.jpg"
    );

    // Create sample artists
    const { object: artist1 } = await cosmic.objects.insertOne({
      title: "Taylor Swift",
      slug: "taylor-swift",
      type: "artists",
      thumbnail: taylorImage.name,
      metadata: {
        name: "Taylor Swift",
        bio: "Taylor Swift is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread media coverage and critical praise.",
        image: taylorImage.name,
      },
    });

    const { object: artist2 } = await cosmic.objects.insertOne({
      title: "Ed Sheeran",
      slug: "ed-sheeran",
      type: "artists",
      thumbnail: edImage.name,
      metadata: {
        name: "Ed Sheeran",
        bio: "Ed Sheeran is an English singer-songwriter. Known for his distinctive voice and acoustic guitar-driven songs, he has become one of the world's best-selling music artists.",
        image: edImage.name,
      },
    });

    // Upload album covers
    const midnightsCover = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=400&fit=crop",
      "midnights.jpg"
    );
    const divideCover = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1557264337-e8a93017fe92?w=400&h=400&fit=crop",
      "divide.jpg"
    );

    // Create sample albums
    const { object: album1 } = await cosmic.objects.insertOne({
      title: "Midnights",
      slug: "midnights",
      type: "albums",
      thumbnail: midnightsCover.name,
      metadata: {
        title: "Midnights",
        release_date: "2022-10-21",
        artist: artist1.id,
        cover: midnightsCover.name,
      },
    });

    const { object: album2 } = await cosmic.objects.insertOne({
      title: "÷ (Divide)",
      slug: "divide",
      type: "albums",
      thumbnail: divideCover.name,
      metadata: {
        title: "÷ (Divide)",
        release_date: "2017-03-03",
        artist: artist2.id,
        cover: divideCover.name,
      },
    });

    // Create sample tracks
    const antiHeroAudio = await uploadAudioFromUrl(
      "https://cdn.cosmicjs.com/1474f620-05be-11f0-993b-3bd041905fff-relaxing-jazz-saxophone-music-saxophone-instruments-music-303093.mp3",
      "anti-hero.mp3"
    );

    const shapeOfYouAudio = await uploadAudioFromUrl(
      "https://cdn.cosmicjs.com/147e44f0-05be-11f0-993b-3bd041905fff-iced-coffee-jazz-309947.mp3",
      "shape-of-you.mp3"
    );

    const { object: track1 } = await cosmic.objects.insertOne({
      title: "Anti-Hero",
      slug: "anti-hero",
      type: "tracks",
      metadata: {
        title: "Anti-Hero",
        duration: 300,
        album: album1.id,
        audio: antiHeroAudio.name,
      },
    });

    const { object: track2 } = await cosmic.objects.insertOne({
      title: "Shape of You",
      slug: "shape-of-you",
      type: "tracks",
      metadata: {
        title: "Shape of You",
        duration: 280,
        album: album2.id,
        audio: shapeOfYouAudio.name,
      },
    });

    // Upload playlist cover
    const playlistCover = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      "top-hits-2023.jpg"
    );

    // Create sample playlist
    await cosmic.objects.insertOne({
      title: "Top Hits 2023",
      slug: "top-hits-2023",
      type: "playlists",
      thumbnail: playlistCover.name,
      metadata: {
        title: "Top Hits 2023",
        description: "A collection of the biggest hits from 2023",
        tracks: [track1.id, track2.id],
        cover: playlistCover.name,
      },
    });

    console.log("Successfully seeded all content!");
  } catch (error) {
    console.error("Error seeding content:", error);
    process.exit(1);
  }
}

// Run both seeding functions
async function seed() {
  await seedObjectTypes();
  await seedContent();
}

seed();
