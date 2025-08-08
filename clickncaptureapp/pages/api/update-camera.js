import { getCameras, saveCameras } from '../../lib/storage';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id, ...updateData } = req.body;
      
      const cameras = await getCameras();
      
      const cameraIndex = cameras.findIndex(c => c.id === parseInt(id));
      if (cameraIndex === -1) {
        return res.status(404).json({ error: 'Camera not found' });
      }
      
      // Update camera with new data
      cameras[cameraIndex] = { 
        ...cameras[cameraIndex], 
        ...updateData,
        id: parseInt(id) // Ensure ID remains as number
      };
      
      await saveCameras(cameras);
      
      res.status(200).json({ 
        success: true, 
        camera: cameras[cameraIndex],
        message: 'Camera updated successfully'
      });
    } catch (error) {
      console.error('Error updating camera:', error);
      res.status(500).json({ error: 'Failed to update camera: ' + error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}