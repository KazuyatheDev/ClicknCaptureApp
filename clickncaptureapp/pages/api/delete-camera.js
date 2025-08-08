import { getCameras, saveCameras } from '../../lib/storage';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Camera ID is required' });
      }
      
      const cameras = await getCameras();
      
      const cameraIndex = cameras.findIndex(c => c.id === parseInt(id));
      if (cameraIndex === -1) {
        return res.status(404).json({ error: 'Camera not found' });
      }
      
      // Remove camera from array
      const deletedCamera = cameras.splice(cameraIndex, 1)[0];
      
      await saveCameras(cameras);
      
      res.status(200).json({ 
        success: true, 
        deletedCamera,
        message: 'Camera deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting camera:', error);
      res.status(500).json({ error: 'Failed to delete camera: ' + error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}