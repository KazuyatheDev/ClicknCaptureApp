import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

// Fallback for local development - use local file system
const dataFilePath = path.join(process.cwd(), 'data', 'cameras.json');

// Ensure data directory exists (for local development)
function ensureDataDirectory() {
  const dataDir = path.dirname(dataFilePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Sample data for initialization
const sampleCameras = [
  {
    id: 1,
    title: "Lumix ZS99",
    brand: "Panasonic",
    type: "Digital Camera",
    image: "/assets/cameras/Lumix ZS99.png",
    pricing: {
      "1-2 days": 500,
      "3-5 days": 450,
      "6+ days": 400
    },
    inclusions: "128GB Memory card, Camera charger, Card reader, Silicne case, Carrying nag, Wrist strap",
    available: true,
    availableDate: "Available Today",
    description: "Perfect camera for vlogging and travel photography with excellent zoom capabilities."
  },
  {
    id: 2,
    title: "Canon g7x Mark III",
    brand: "Canon",
    type: "Digital Camera",
    image: "/assets/cameras/Canong7xMark3.png",
    pricing: {
      "1-2 days": 600,
      "3-5 days": 550,
      "6+ days": 500
    },
    inclusions: "128GB Mermory card, Card Reader, Camera Charger, Silicone Case, Carrying bag, Wrist Strap, Mini Tripod, 1 Extra Battery",
    available: false,
    availableDate: "Available by August 15, 2025",
    description: "Professional digital camera ideal for wedding photography, travel blog and video production."
  },
  {
    id: 3,
    title: "Sony ZV-E10",
    brand: "Sony",
    type: "Mirrorless",
    image: "/assets/cameras/SonyZvE10.png",
    pricing: {
      "1-2 days": 600,
      "3-5 days": 550,
      "6+ days": 500
    },
    inclusions: "128GB Mermory card, Card Reader, Camera Charger, 16-50mm Kit Lens, Godox IM30 Mini Flash, Camera Bag. Addition on extra battery and Tripod",
    available: true,
    availableDate: "Available Today",
    description: "Perfect for content creators, vloggers, and travelers who need cinematic results without the bulk."
  },
  {
    id: 4,
    title: "DJI Osmo Pocket 3",
    brand: "GoPro",
    type: "Action/Vlogging Camera",
    image: "/assets/cameras/DJIOSMOPocket.png",
    pricing: {
      "1-2 days": 550,
      "3-5 days": 500,
      "6+ days": 450
    },
    inclusions: "128GB Mermory card, Card Reader, Camera Charger, Magnetic Mount Protective Cover, Wrist Strap, DJI Mic 2 windscreen and Clip magnet handle with 1/4 thread , Mini Tripod, Battery handleClientScriptLoad, Wide Angle Lens",
    available: true,
    availableDate: "Available Today",
    description: "Ultimate action camera for extreme sports, underwater shooting, and adventure vlogs."
  },
  {
    id: 5,
    title: "Kodak Pixpro FZ55",
    brand: "Kodak",
    type: "Digital Camera",
    image: "/assets/cameras/KodakPixProFZ55.png",
    pricing: {
      "1-2 days": 330,
      "3-5 days": 300,
      "6+ days": 250
    },
    inclusions: "32GB Memory Card, Camera Charger, Camera Case, Wrist Strap",
    available: false,
    availableDate: "Available by August 20, 2025",
    description: "Perfect beginner camera for capturing life's moments with ease."
  },
  {
    id: 6,
    title: "INSTA360 X5",
    brand: "INSTAX",
    type: "Action Camera",
    image: "/assets/cameras/Insta360x5.png",
    pricing: {
      "1-2 days": 650,
      "3-5 days": 600,
      "6+ days": 550
    },
    inclusions: "3256GB Memory Card, Camera Charger, Card Reader, Lens cap, Dive Case 114cm invisible Stick, Bullet Time Handle, Carrying Bag, Mini Tripod, 2 Extra battery - Utility Fash Carger Case.",
    available: true,
    availableDate: "Available Today",
    description: "Perfect for adventure vlogs, unique content creation, and immersive experiences that regular cameras can't deliver."
  },
  
];

// Storage functions
export async function getCameras() {
  try {
    // Use Vercel KV in production, local file system in development
    if (process.env.NODE_ENV === 'production') {
      console.log('Loading cameras from Vercel KV...');
      
      try {
        const cameras = await kv.get('cameras');
        
        if (cameras && Array.isArray(cameras) && cameras.length > 0) {
          console.log(`✅ Loaded ${cameras.length} cameras from Vercel KV`);
          return cameras;
        } else {
          // Initialize KV with sample data
          console.log('🔄 Initializing Vercel KV with sample cameras data');
          await kv.set('cameras', sampleCameras);
          console.log('✅ KV initialized successfully');
          return sampleCameras;
        }
      } catch (kvError) {
        console.error('❌ KV Error:', kvError.message);
        console.log('🔄 Falling back to sample data');
        return sampleCameras;
      }
    } else {
      // Local development - use file system
      ensureDataDirectory();
      
      if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const cameras = JSON.parse(data);
        console.log(`Loaded ${cameras.length} cameras from ${dataFilePath}`);
        return cameras;
      } else {
        console.log('Creating initial cameras data file');
        fs.writeFileSync(dataFilePath, JSON.stringify(sampleCameras, null, 2));
        return sampleCameras;
      }
    }
  } catch (error) {
    console.error('Error reading cameras data:', error.message);
    console.log('Falling back to sample data');
    return sampleCameras;
  }
}

export async function saveCameras(cameras) {
  try {
    // Use Vercel KV in production, local file system in development
    if (process.env.NODE_ENV === 'production') {
      console.log('💾 Saving cameras to Vercel KV...');
      
      try {
        await kv.set('cameras', cameras);
        console.log(`✅ Cameras data saved successfully to Vercel KV (${cameras.length} cameras)`);
      } catch (kvError) {
        console.error('❌ KV Save Error:', kvError.message);
        throw new Error('Failed to save to KV: ' + kvError.message);
      }
    } else {
      // Local development - use file system
      ensureDataDirectory();
      fs.writeFileSync(dataFilePath, JSON.stringify(cameras, null, 2));
      console.log(`Cameras data saved successfully to ${dataFilePath}`);
    }
  } catch (error) {
    console.error('Error saving cameras data:', error.message);
    throw new Error('Failed to save cameras data: ' + error.message);
  }
}