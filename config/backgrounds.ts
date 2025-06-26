export interface Background {
  id: number;
  path: string;
}

// Add backgrounds here, just provide the Cloudinary URLs
export const backgrounds: Background[] = [
  { id: 1, path: 'https://res.cloudinary.com/dfjqqnv3x/image/upload/v1750919161/bg1.png' },
  { id: 2, path: 'https://res.cloudinary.com/dfjqqnv3x/image/upload/v1750919161/bg1.png' }
  // Add more backgrounds by adding more objects with id and path
];

// Keep track of recently used backgrounds to avoid repetition
let recentlyUsed: Set<number> = new Set();

export function getRandomBackground(): Background {
  // If all backgrounds have been used recently, reset the tracking
  if (recentlyUsed.size >= backgrounds.length - 1) {
    recentlyUsed.clear();
  }

  // Get available backgrounds (those not recently used)
  const availableBackgrounds = backgrounds.filter(bg => !recentlyUsed.has(bg.id));
  
  // Select a random background from available ones
  const randomIndex = Math.floor(Math.random() * availableBackgrounds.length);
  const selectedBackground = availableBackgrounds[randomIndex];
  
  // Add to recently used set
  recentlyUsed.add(selectedBackground.id);
  
  return selectedBackground;
}
