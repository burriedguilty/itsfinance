export interface SillyVideo {
  id: number;
  type: 'video' | 'gif';
  url: string;
  audioUrl: string;
  greenScreen?: boolean;  // If true, will apply chroma key effect
  duration?: number;      // Duration in ms, untuk GIF auto-switch
}

export const mainBackground: SillyVideo = {
  id: 0,
  type: 'video',
  url: '/videos/sillymain.webm',
  audioUrl: '/audio/silly1.mp3'
};

export const sillyVideos: SillyVideo[] = [
  {
    id: 1,
    type: 'video',
    url: '/videos/silly1.mp4',
    audioUrl: '/audio/silly1.mp3'
  },
  {
    id: 2,
    type: 'video',
    url: '/videos/silly1.webm',
    audioUrl: '/audio/silly1.mp3'
  },
  {
    id: 3,
    type: 'video',
    url: '/videos/silly2.webm',
    audioUrl: '/audio/silly1.mp3'
  }
];

// Random video with 50% chance for each type
export function getRandomVideo(): SillyVideo {
  // 50% chance for silly1 (mp4/webm) vs silly2
  if (Math.random() < 0.5) {
    // For silly1, randomly choose between mp4 and webm
    return sillyVideos[Math.floor(Math.random() * 2)];
  } else {
    // silly2.webm
    return sillyVideos[2];
  }
}
