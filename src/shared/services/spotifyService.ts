import axios from 'axios';

interface SpotifyTrackInfo {
  title: string;
  artist: string;
  coverUrl: string;
  spotifyLink: string;
}

export const spotifyService = {
  async getTrackInfo(spotifyUrl: string): Promise<SpotifyTrackInfo | null> {
    try {
      const trackMatch = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
      const playlistMatch = spotifyUrl.match(/playlist\/([a-zA-Z0-9]+)/);
      const albumMatch = spotifyUrl.match(/album\/([a-zA-Z0-9]+)/);
      
      if (trackMatch) {
        return await this.getDataFromOEmbed('track', trackMatch[1], spotifyUrl);
      } else if (playlistMatch) {
        return await this.getDataFromOEmbed('playlist', playlistMatch[1], spotifyUrl);
      } else if (albumMatch) {
        return await this.getDataFromOEmbed('album', albumMatch[1], spotifyUrl);
      }
      
      throw new Error('لینک اسپاتیفای نامعتبر است');
    } catch (error: any) {
      console.error('Error fetching Spotify info:', error);
      throw error;
    }
  },

  async getDataFromOEmbed(type: string, id: string, url: string): Promise<SpotifyTrackInfo> {
    try {
      const response = await axios.get(
        `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`
      );

      const data = response.data;
      const titleMatch = data.title?.match(/^(.+?)(?:\s+[-–—]\s+(.+))?$/);
      
      let title = data.title || 'بدون عنوان';
      let artist = 'اسپاتیفای';
      
      if (titleMatch) {
        if (type === 'track' && titleMatch[2]) {
          title = titleMatch[1];
          artist = titleMatch[2];
        } else if (type === 'playlist') {
          title = data.title;
          artist = data.author_name || 'اسپاتیفای';
        } else if (type === 'album' && titleMatch[2]) {
          title = titleMatch[1];
          artist = titleMatch[2];
        }
      }

      let coverUrl = '';
      if (data.thumbnail_url) {
        coverUrl = data.thumbnail_url;
      }

      return {
        title: title.trim(),
        artist: artist.trim(),
        coverUrl,
        spotifyLink: url,
      };
    } catch (error) {
      console.error('Error with oEmbed API:', error);
      return this.getFallbackData(type, url);
    }
  },

  getFallbackData(type: string, url: string): SpotifyTrackInfo {
    return {
      title: type === 'track' ? 'آهنگ اسپاتیفای' : 
             type === 'album' ? 'آلبوم اسپاتیفای' : 
             'پلی‌لیست اسپاتیفای',
      artist: 'اسپاتیفای',
      coverUrl: '',
      spotifyLink: url,
    };
  },

  validateSpotifyUrl(url: string): boolean {
    const spotifyPattern = /^https?:\/\/(open\.spotify\.com|spotify\.com)\/(track|playlist|album)\/[a-zA-Z0-9]+/;
    return spotifyPattern.test(url);
  },
};