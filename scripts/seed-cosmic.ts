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
    const lunaImage = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1494354145959-25cb82edf23d?w=400&h=400&fit=crop",
      "luna-moon.jpg"
    );
    const novaImage = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?w=400&h=400&fit=crop",
      "nova-star.jpg"
    );

    // Create sample artists
    const { object: artist1 } = await cosmic.objects.insertOne({
      title: "Luna Moon",
      slug: "luna-moon",
      type: "artists",
      thumbnail: lunaImage.name,
      metadata: {
        name: "Luna Moon",
        bio: "Luna Moon is a cosmic pop sensation known for her ethereal vocals and space-themed music. Her unique blend of electronic and acoustic elements has created a new genre called 'astro-pop'.",
        image: lunaImage.name,
      },
    });

    const { object: artist2 } = await cosmic.objects.insertOne({
      title: "Nova Star",
      slug: "nova-star",
      type: "artists",
      thumbnail: novaImage.name,
      metadata: {
        name: "Nova Star",
        bio: "Nova Star is an indie rock phenomenon who writes songs about quantum physics and parallel universes. His experimental sound has earned him the nickname 'The Einstein of Rock'.",
        image: novaImage.name,
      },
    });

    // Upload album covers
    const starlightCover = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=400&fit=crop",
      "starlight.jpg"
    );
    const quantumCover = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1557264337-e8a93017fe92?w=400&h=400&fit=crop",
      "quantum.jpg"
    );

    // Create sample albums
    const { object: album1 } = await cosmic.objects.insertOne({
      title: "Starlight Symphony",
      slug: "starlight-symphony",
      type: "albums",
      thumbnail: starlightCover.name,
      metadata: {
        title: "Starlight Symphony",
        release_date: "2023-06-15",
        artist: artist1.id,
        cover: starlightCover.name,
      },
    });

    const { object: album2 } = await cosmic.objects.insertOne({
      title: "Quantum Dreams",
      slug: "quantum-dreams",
      type: "albums",
      thumbnail: quantumCover.name,
      metadata: {
        title: "Quantum Dreams",
        release_date: "2023-08-22",
        artist: artist2.id,
        cover: quantumCover.name,
      },
    });

    // Create sample tracks
    const cosmicDanceAudio = await uploadAudioFromUrl(
      "https://cdn.cosmicjs.com/1474f620-05be-11f0-993b-3bd041905fff-relaxing-jazz-saxophone-music-saxophone-instruments-music-303093.mp3",
      "cosmic-dance.mp3"
    );

    const parallelWorldsAudio = await uploadAudioFromUrl(
      "https://cdn.cosmicjs.com/147e44f0-05be-11f0-993b-3bd041905fff-iced-coffee-jazz-309947.mp3",
      "parallel-worlds.mp3"
    );

    const { object: track1 } = await cosmic.objects.insertOne({
      title: "Cosmic Dance",
      slug: "cosmic-dance",
      type: "tracks",
      metadata: {
        title: "Cosmic Dance",
        duration: 245,
        album: album1.id,
        audio: cosmicDanceAudio.name,
      },
    });

    const { object: track2 } = await cosmic.objects.insertOne({
      title: "Parallel Worlds",
      slug: "parallel-worlds",
      type: "tracks",
      metadata: {
        title: "Parallel Worlds",
        duration: 312,
        album: album2.id,
        audio: parallelWorldsAudio.name,
      },
    });

    // Upload playlist cover
    const playlistCover = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      "cosmic-hits.jpg"
    );

    // Create sample playlist
    await cosmic.objects.insertOne({
      title: "Cosmic Hits 2023",
      slug: "cosmic-hits-2023",
      type: "playlists",
      thumbnail: playlistCover.name,
      metadata: {
        title: "Cosmic Hits 2023",
        description:
          "A stellar collection of the year's most out-of-this-world tracks",
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
