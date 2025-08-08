import { getCameras, saveCameras } from '../../lib/storage';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const cameraData = req.body;
      
      const cameras = await getCameras();
      
      // Generate new ID
      const maxId = cameras.length > 0 ? Math.max(...cameras.map(c => c.id)) : 0;
      const newCamera = {
        ...cameraData,
        id: maxId + 1,
        pricing: {
          '1-2 days': parseInt(cameraData.pricing['1-2 days']) || 0,
          '3-5 days': parseInt(cameraData.pricing['3-5 days']) || 0,
          '6+ days': parseInt(cameraData.pricing['6+ days']) || 0
        }
      };
      
      cameras.push(newCamera);
      await saveCameras(cameras);
      
      res.status(200).json({ 
        success: true, 
        camera: newCamera,
        message: 'Camera added successfully'
      });
    } catch (error) {
      console.error('Error adding camera:', error);
      res.status(500).json({ error: 'Failed to add camera: ' + error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}