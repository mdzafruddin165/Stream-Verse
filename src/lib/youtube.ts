export async function getYoutubeTrailer(query: string): Promise<string | null> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error('YouTube API key is missing.');
    return null;
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${apiKey}&type=video&maxResults=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch from YouTube API:', response.statusText);
      return null;
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId;
    }
    return null;
  } catch (error) {
    console.error('Error fetching YouTube trailer:', error);
    return null;
  }
}
