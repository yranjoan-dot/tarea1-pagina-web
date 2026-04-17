import * as tf from '@tensorflow/tfjs';
import { DetectionResult } from '../types';

let model: any = null;

// Enhanced team color signatures with RGB ranges for better matching
const teamColorSignatures: Record<string, { primary: string; mainColors: number[][]; colorNames: string[] }> = {
  // EASTERN - Atlantic
  CELTICS: { primary: '#007A33', mainColors: [[0, 122, 51], [255, 255, 255], [0, 100, 50]], colorNames: ['green', 'white'] },
  SIXERS: { primary: '#1D428A', mainColors: [[29, 66, 138], [237, 23, 76], [255, 255, 255]], colorNames: ['blue', 'red', 'white'] },
  NETS: { primary: '#000000', mainColors: [[0, 0, 0], [255, 255, 255], [100, 100, 100]], colorNames: ['black', 'white'] },
  KNICKS: { primary: '#0C2340', mainColors: [[12, 35, 64], [245, 132, 38], [255, 255, 255]], colorNames: ['blue', 'orange', 'white'] },
  RAPTORS: { primary: '#CE1141', mainColors: [[206, 17, 65], [0, 0, 0], [255, 255, 255]], colorNames: ['red', 'black', 'white'] },
  
  // EASTERN - Central
  BUCKS: { primary: '#12409D', mainColors: [[18, 64, 157], [238, 225, 198], [0, 0, 0]], colorNames: ['blue', 'cream', 'black'] },
  CAVALIERS: { primary: '#6F2DA8', mainColors: [[111, 45, 168], [255, 189, 31], [0, 0, 0]], colorNames: ['purple', 'gold', 'black'] },
  PISTONS: { primary: '#0063B1', mainColors: [[0, 99, 177], [200, 16, 46], [255, 255, 255]], colorNames: ['blue', 'red', 'white'] },
  PACERS: { primary: '#002D62', mainColors: [[0, 45, 98], [255, 198, 41], [255, 255, 255]], colorNames: ['blue', 'gold', 'white'] },
  BULLS: { primary: '#CE1141', mainColors: [[206, 17, 65], [0, 0, 0], [255, 255, 255]], colorNames: ['red', 'black', 'white'] },
  
  // EASTERN - Southeast
  HAWKS: { primary: '#E03C28', mainColors: [[224, 60, 40], [0, 0, 0], [255, 194, 61]], colorNames: ['red', 'black', 'gold'] },
  HORNETS: { primary: '#00778D', mainColors: [[0, 119, 141], [0, 0, 0], [255, 255, 255]], colorNames: ['teal', 'black', 'white'] },
  HEAT: { primary: '#98002E', mainColors: [[152, 0, 46], [249, 160, 27], [255, 255, 255]], colorNames: ['red', 'orange', 'white'] },
  MAGIC: { primary: '#0077B6', mainColors: [[0, 119, 182], [0, 0, 0], [255, 255, 255]], colorNames: ['blue', 'black', 'white'] },
  WIZARDS: { primary: '#002B5C', mainColors: [[0, 43, 92], [227, 24, 55], [255, 255, 255]], colorNames: ['blue', 'red', 'white'] },
  
  // WESTERN - Pacific
  WARRIORS: { primary: '#1D428A', mainColors: [[29, 66, 138], [255, 199, 44], [255, 255, 255]], colorNames: ['blue', 'gold', 'white'] },
  CLIPPERS: { primary: '#C60C30', mainColors: [[198, 12, 48], [0, 0, 0], [255, 255, 255]], colorNames: ['red', 'black', 'white'] },
  LAKERS: { primary: '#552583', mainColors: [[85, 37, 131], [253, 185, 39], [0, 0, 0]], colorNames: ['purple', 'gold', 'black'] },
  SUNS: { primary: '#E56021', mainColors: [[229, 96, 33], [90, 45, 129], [255, 255, 255]], colorNames: ['orange', 'purple', 'white'] },
  KINGS: { primary: '#6K2D3F', mainColors: [[91, 45, 46], [91, 45, 46], [255, 255, 255]], colorNames: ['burgundy', 'white'] },
  
  // WESTERN - Southwest
  GRIZZLIES: { primary: '#12173F', mainColors: [[18, 23, 63], [97, 137, 185], [0, 0, 0]], colorNames: ['navy', 'blue', 'black'] },
  MAVERICKS: { primary: '#00385D', mainColors: [[0, 56, 93], [184, 196, 202], [255, 255, 255]], colorNames: ['blue', 'silver', 'white'] },
  ROCKETS: { primary: '#CE1141', mainColors: [[206, 17, 65], [0, 0, 0], [200, 16, 46]], colorNames: ['red', 'black'] },
  SPURS: { primary: '#000000', mainColors: [[0, 0, 0], [192, 192, 192], [255, 255, 255]], colorNames: ['black', 'silver', 'white'] },
  PELICANS: { primary: '#0C2C56', mainColors: [[12, 44, 86], [176, 20, 48], [255, 255, 255]], colorNames: ['blue', 'red', 'white'] },
  
  // WESTERN - Northwest
  NUGGETS: { primary: '#0C2340', mainColors: [[12, 35, 64], [255, 118, 29], [255, 255, 255]], colorNames: ['blue', 'orange', 'white'] },
  TIMBERWOLVES: { primary: '#0F509E', mainColors: [[15, 80, 158], [0, 0, 0], [255, 255, 255]], colorNames: ['blue', 'black', 'white'] },
  TRAILBLAZERS: { primary: '#E03C28', mainColors: [[224, 60, 40], [0, 0, 0], [255, 255, 255]], colorNames: ['red', 'black', 'white'] },
  THUNDER: { primary: '#007AC1', mainColors: [[0, 122, 193], [240, 81, 51], [0, 0, 0]], colorNames: ['blue', 'orange', 'black'] },
  JAZZ: { primary: '#0C2340', mainColors: [[12, 35, 64], [255, 198, 41], [255, 255, 255]], colorNames: ['blue', 'gold', 'white'] },
};

const classToTeamMap: Record<number, string> = {
  0: 'CELTICS', 1: 'SIXERS', 2: 'NETS', 3: 'KNICKS', 4: 'RAPTORS',
  5: 'BUCKS', 6: 'CAVALIERS', 7: 'PISTONS', 8: 'PACERS', 9: 'BULLS',
  10: 'HAWKS', 11: 'HORNETS', 12: 'HEAT', 13: 'MAGIC', 14: 'WIZARDS',
  15: 'WARRIORS', 16: 'CLIPPERS', 17: 'LAKERS', 18: 'SUNS', 19: 'KINGS',
  20: 'GRIZZLIES', 21: 'MAVERICKS', 22: 'ROCKETS', 23: 'SPURS', 24: 'PELICANS',
  25: 'NUGGETS', 26: 'TIMBERWOLVES', 27: 'TRAILBLAZERS', 28: 'THUNDER', 29: 'JAZZ',
};

export async function loadModel(): Promise<void> {
  try {
    console.log('Enhanced color recognition system initialized');
  } catch (error) {
    console.error('Failed to initialize recognition system:', error);
    throw new Error('Could not initialize recognition system. Please try again.');
  }
}

export async function detectTeam(imageFile: File): Promise<DetectionResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.onload = async () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 224;
            canvas.height = 224;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Could not get canvas context');

            ctx.drawImage(img, 0, 0, 224, 224);
            const imageData = ctx.getImageData(0, 0, 224, 224);
            const data = imageData.data;

            // Extract features
            const dominantColors = extractDominantColors(data);
            const brightness = calculateBrightness(data);
            const contrast = calculateContrast(data);
            const colorDistribution = analyzeColorDistribution(data);

            // Calculate scores with improved weighting
            const scores = calculateTeamScores(dominantColors, brightness, contrast, colorDistribution);
            const topMatch = findTopMatch(scores);

            resolve({
              teamId: topMatch.teamId,
              confidence: topMatch.confidence,
              timestamp: Date.now(),
            });
          } catch (error) {
            reject(error);
          }
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        img.src = e.target?.result as string;
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(imageFile);
  });
}

// Extract up to 8 dominant colors
function extractDominantColors(data: Uint8ClampedArray): number[][] {
  const colorMap: Record<string, number> = {};

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;

    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;

    const key = `${r},${g},${b}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
  }

  const sorted = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return sorted.map(([key]) => {
    const [r, g, b] = key.split(',').map(Number);
    return [r, g, b];
  });
}

// Analyze overall color distribution (hue-like distribution)
function analyzeColorDistribution(data: Uint8ClampedArray): { warm: number; cool: number; neutral: number } {
  let warm = 0, cool = 0, neutral = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r > 150 || g > 150) {
      warm++; // Red, Yellow, Orange
    } else if (b > 150) {
      cool++; // Blue
    } else {
      neutral++; // Gray, Black, etc
    }
    count++;
  }

  return {
    warm: count > 0 ? warm / count : 0.33,
    cool: count > 0 ? cool / count : 0.33,
    neutral: count > 0 ? neutral / count : 0.34,
  };
}

function calculateBrightness(data: Uint8ClampedArray): number {
  let sum = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] >= 128) {
      sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
      count++;
    }
  }

  return count > 0 ? sum / count : 128;
}

function calculateContrast(data: Uint8ClampedArray): number {
  const brightness = calculateBrightness(data);
  let variance = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] >= 128) {
      const pixelBrightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      variance += Math.pow(pixelBrightness - brightness, 2);
      count++;
    }
  }

  return count > 0 ? Math.sqrt(variance / count) : 0;
}

function colorDistance(c1: number[], c2: number[]): number {
  const dr = c1[0] - c2[0];
  const dg = c1[1] - c2[1];
  const db = c1[2] - c2[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function calculateTeamScores(
  dominantColors: number[][],
  brightness: number,
  contrast: number,
  colorDist: { warm: number; cool: number; neutral: number }
): Record<string, number> {
  const scores: Record<string, number> = {};

  Object.entries(teamColorSignatures).forEach(([teamId, signature]) => {
    let colorScore = 0;
    const teamColors = signature.mainColors;

    // Match dominant colors
    dominantColors.forEach((dominantColor) => {
      let minDistance = Infinity;
      teamColors.forEach((teamColor) => {
        const distance = colorDistance(dominantColor, teamColor);
        minDistance = Math.min(minDistance, distance);
      });
      colorScore += Math.max(0, 100 - minDistance * 1.2) / dominantColors.length;
    });

    colorScore = Math.min(100, colorScore);

    // Brightness and contrast factors (more lenient)
    const brightnessScore = Math.max(0, 60 - Math.abs(brightness - 128) / 3);
    const contrastScore = Math.min(100, contrast * 1.2);

    // Add slight bonus if any dominant color is close to team color
    let colorMatchBonus = 0;
    dominantColors.forEach((dc) => {
      teamColors.forEach((tc) => {
        if (colorDistance(dc, tc) < 50) {
          colorMatchBonus += 10;
        }
      });
    });
    colorMatchBonus = Math.min(20, colorMatchBonus);

    scores[teamId] = (colorScore * 0.75 + brightnessScore * 0.1 + contrastScore * 0.1 + colorMatchBonus * 0.05) / 100;
  });

  return scores;
}

function findTopMatch(scores: Record<string, number>): { teamId: string; confidence: number } {
  let topTeamId = 'CELTICS';
  let topScore = 0;
  let secondScore = 0;

  Object.entries(scores).forEach(([teamId, score]) => {
    if (score > topScore) {
      secondScore = topScore;
      topScore = score;
      topTeamId = teamId;
    } else if (score > secondScore) {
      secondScore = score;
    }
  });

  // More lenient confidence calculation - lower threshold
  const gap = topScore - secondScore;
  const baseConfidence = Math.min(0.99, topScore * 1.1);
  const gapBonus = gap * 0.3;
  const confidence = Math.min(0.95, Math.max(0.50, baseConfidence + gapBonus));

  return {
    teamId: topTeamId,
    confidence: confidence,
  };
}

export function getTeamIdFromPrediction(prediction: number[]): string {
  const maxIndex = prediction.indexOf(Math.max(...prediction));
  return classToTeamMap[maxIndex] || 'CELTICS';
}
