import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable Next.js body parsing so formidable can handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'assets');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    });

    // Use promise-based API for formidable v3+
    const [fields, files] = await form.parse(req);
    
    const file = files.image ? files.image[0] : null;
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.originalFilename || 'upload';
    const extension = path.extname(originalName);
    const filename = `camera_${timestamp}${extension}`;
    const newPath = path.join(uploadsDir, filename);

    // Move file to final location
    try {
      fs.renameSync(file.filepath, newPath);
      
      // Return the public URL path
      const imageUrl = `/assets/${filename}`;
      res.status(200).json({ 
        success: true, 
        imageUrl,
        message: 'Image uploaded successfully' 
      });
    } catch (moveError) {
      console.error('File move error:', moveError);
      console.error('Source path:', file.filepath);
      console.error('Destination path:', newPath);
      res.status(500).json({ error: 'Failed to save image: ' + moveError.message });
    }

  } catch (error) {
    console.error('Upload handler error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}