export interface SillyBackground {
  type: 'video' | 'gif';
  src: string;
  audio?: string;
}

export const sillyBackgrounds: SillyBackground[] = [
  {
    type: 'video',
    src: '/videos/silly1.mp4',
    audio: '/audios/silly1.mp3'
  },
  {
    type: 'gif',
    src: '/images/silly1.gif',
    audio: '/audios/silly1.mp3'
  }
];
