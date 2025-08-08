import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AdminPage() {
  const [cameras, setCameras] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    console.log('useEffect triggered, isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      console.log('Authenticated, calling fetchCameras...');
      fetchCameras();
    }
  }, [isAuthenticated]);

  const authenticate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        console.log('Authentication successful, setting authenticated to true');
        setIsAuthenticated(true);
        setPassword(''); // Clear password from memory
      } else {
        alert('Invalid password');
      }
    } catch (error) {
      alert('Authentication failed');
    }
    setLoading(false);
  };

  const fetchCameras = async () => {
    try {
      console.log('Fetching cameras...');
      const response = await fetch('/api/cameras');
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Cameras data:', data);
      setCameras(data);
    } catch (error) {
      console.error('Error fetching cameras:', error);
      alert('Error loading cameras: ' + error.message);
    }
  };

  const updateCamera = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/update-camera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedData })
      });

      if (response.ok) {
        await fetchCameras();
        alert('Camera updated successfully!');
      } else {
        alert('Failed to update camera');
      }
    } catch (error) {
      alert('Error updating camera');
    }
    setLoading(false);
  };

  const addCamera = async (cameraData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/add-camera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cameraData)
      });

      if (response.ok) {
        await fetchCameras();
        setShowAddForm(false);
        alert('Camera added successfully!');
      } else {
        alert('Failed to add camera');
      }
    } catch (error) {
      alert('Error adding camera');
    }
    setLoading(false);
  };

  const deleteCamera = async (id) => {
    if (!confirm('Are you sure you want to delete this camera?')) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/delete-camera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        await fetchCameras();
        alert('Camera deleted successfully!');
      } else {
        alert('Failed to delete camera');
      }
    } catch (error) {
      alert('Error deleting camera');
    }
    setLoading(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCameras([]);
    setShowAddForm(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login - CamRent Pro</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        
        <div className="login-page">
          <div className="login-container">
            <div className="login-form">
              <div className="logo">
                <img src="/assets/logoclick.jpg" alt="Click & Capture Rentals" className="logo-image" />
              </div>
              <h2>Admin Login</h2>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && authenticate()}
                className="password-input"
              />
              <button onClick={authenticate} disabled={loading} className="login-btn">
                {loading ? 'Authenticating...' : 'Login'}
              </button>
            </div>
          </div>

          <style jsx>{`
            .login-page {
              min-height: 100vh;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }

            .login-container {
              width: 100%;
              max-width: 400px;
            }

            .login-form {
              background: white;
              padding: 40px;
              border-radius: 20px;
              box-shadow: 0 15px 40px rgba(0,0,0,0.2);
              text-align: center;
            }

            .logo {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 15px;
              margin-bottom: 30px;
            }

            .logo-image {
              height: 60px;
              width: auto;
              max-width: 200px;
              object-fit: contain;
            }

            .login-form h2 {
              margin-bottom: 30px;
              color: #333;
              font-size: 1.5rem;
            }

            .password-input {
              width: 100%;
              padding: 15px;
              border: 2px solid #e1e5e9;
              border-radius: 10px;
              margin-bottom: 25px;
              font-size: 16px;
              transition: border-color 0.3s;
            }

            .password-input:focus {
              outline: none;
              border-color: #667eea;
            }

            .login-btn {
              width: 100%;
              padding: 15px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              border: none;
              border-radius: 10px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.3s;
            }

            .login-btn:hover:not(:disabled) {
              transform: translateY(-2px);
              box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            }

            .login-btn:disabled {
              opacity: 0.7;
              cursor: not-allowed;
              transform: none;
            }
          `}</style>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Panel - CamRent Pro</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="admin-page">
        {/* Admin Header */}
        <div className="admin-header">
          <div className="header-content">
            <div className="logo">
              <img src="/assets/logoclick.jpg" alt="Click & Capture Rentals" className="logo-image" />
              <span className="admin-text">Admin</span>
            </div>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* Admin Content */}
        <div className="admin-container">
          <h1>Camera Inventory Management</h1>
          <p className="subtitle">Manage your camera rental inventory ({cameras.length} cameras loaded)</p>
          
          <div className="admin-actions">
            <button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="add-camera-btn"
              disabled={loading}
            >
              {showAddForm ? '❌ Cancel' : '➕ Add New Camera'}
            </button>
          </div>

          {showAddForm && (
            <AddCameraForm 
              onAdd={addCamera} 
              onCancel={() => setShowAddForm(false)}
              loading={loading}
            />
          )}
          
          <div className="cameras-list">
            {cameras.map(camera => (
              <CameraAdminForm 
                key={camera.id} 
                camera={camera} 
                onUpdate={updateCamera}
                onDelete={deleteCamera}
                loading={loading}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          .admin-page {
            min-height: 100vh;
            background-color: #f8f9fa;
          }

          .admin-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .logo {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .logo-image {
            height: 45px;
            width: auto;
            max-width: 180px;
            object-fit: contain;
          }

          .admin-text {
            font-size: 1.2rem;
            font-weight: bold;
            color: white;
            margin-left: 10px;
          }

          .logout-btn {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 2px solid white;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
          }

          .logout-btn:hover {
            background: white;
            color: #667eea;
          }

          .admin-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
          }

          .admin-container h1 {
            text-align: center;
            margin-bottom: 10px;
            color: #333;
            font-size: 2.5rem;
          }

          .subtitle {
            text-align: center;
            margin-bottom: 40px;
            color: #666;
            font-size: 1.1rem;
          }

          .admin-actions {
            text-align: center;
            margin-bottom: 40px;
          }

          .add-camera-btn {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.2);
          }

          .add-camera-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
          }

          .add-camera-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
          }

          .cameras-list {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
        `}</style>
      </div>
    </>
  );
}

function AddCameraForm({ onAdd, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    type: '',
    image: '📷',
    pricing: {
      '1-2 days': 0,
      '3-5 days': 0,
      '6+ days': 0
    },
    inclusions: '',
    description: '',
    available: true,
    availableDate: 'Available Today'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  const handleChange = (field, value) => {
    if (field.startsWith('pricing.')) {
      const pricingField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        pricing: { ...prev.pricing, [pricingField]: parseInt(value) || 0 }
      }));
    } else if (field === 'available') {
      setFormData(prev => ({ ...prev, [field]: value === 'true' }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show loading state
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.imageUrl }));
        alert('Image uploaded successfully!');
      } else {
        alert('Image upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Image upload failed. Please try again.');
    }
  };

  return (
    <div className="add-camera-form">
      <h2>Add New Camera</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Camera Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Canon EOS R5"
              required
            />
          </div>

          <div className="form-group">
            <label>Brand *</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              placeholder="e.g., Canon"
              required
            />
          </div>

          <div className="form-group">
            <label>Type *</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="DSLR">DSLR</option>
              <option value="Mirrorless">Mirrorless</option>
              <option value="Compact">Compact</option>
              <option value="Action Camera">Action Camera</option>
              <option value="Gimbal Camera">Gimbal Camera</option>
              <option value="Film Camera">Film Camera</option>
            </select>
          </div>

          <div className="form-group">
            <label>Camera Image</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="image-upload"
                className="file-input"
              />
              <label htmlFor="image-upload" className="file-label">
                {formData.image && formData.image.startsWith('/assets') ? 
                  `📸 ${formData.image.split('/').pop()}` : 
                  formData.image && formData.image.length > 2 ? `${formData.image} Choose Image` : 
                  '📷 Choose Image'}
              </label>
              <input
                type="text"
                value={formData.image.startsWith('/assets') ? '' : formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="Or enter emoji (📷, 📸, 📹)"
                className="emoji-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>1-2 Days Rate (PHP) *</label>
            <input
              type="number"
              value={formData.pricing['1-2 days']}
              onChange={(e) => handleChange('pricing.1-2 days', e.target.value)}
              min="0"
              step="50"
              required
            />
          </div>

          <div className="form-group">
            <label>3-5 Days Rate (PHP) *</label>
            <input
              type="number"
              value={formData.pricing['3-5 days']}
              onChange={(e) => handleChange('pricing.3-5 days', e.target.value)}
              min="0"
              step="50"
              required
            />
          </div>

          <div className="form-group">
            <label>6+ Days Rate (PHP) *</label>
            <input
              type="number"
              value={formData.pricing['6+ days']}
              onChange={(e) => handleChange('pricing.6+ days', e.target.value)}
              min="0"
              step="50"
              required
            />
          </div>

          <div className="form-group">
            <label>Availability Status</label>
            <select
              value={formData.available}
              onChange={(e) => handleChange('available', e.target.value)}
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Availability Date *</label>
            <input
              type="text"
              value={formData.availableDate}
              onChange={(e) => handleChange('availableDate', e.target.value)}
              placeholder="e.g., Available Today or Available by August 15, 2025"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Inclusions *</label>
            <textarea
              value={formData.inclusions}
              onChange={(e) => handleChange('inclusions', e.target.value)}
              rows="3"
              placeholder="List what's included with the camera rental (e.g., lens, battery, charger, memory card)"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows="3"
              placeholder="Describe the camera and its best use cases"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="add-btn">
            {loading ? 'Adding...' : '✅ Add Camera'}
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            ❌ Cancel
          </button>
        </div>
      </form>

      <style jsx>{`
        .add-camera-form {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 40px;
          border: 2px solid #28a745;
        }

        .add-camera-form h2 {
          text-align: center;
          color: #28a745;
          margin-bottom: 30px;
          font-size: 1.8rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-weight: bold;
          color: #333;
          font-size: 0.9rem;
        }

        .form-group input, .form-group select, .form-group textarea {
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none;
          border-color: #28a745;
        }

        .image-upload {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .file-input {
          display: none;
        }

        .file-label {
          background: #f8f9fa;
          border: 2px dashed #28a745;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: background 0.3s;
        }

        .file-label:hover {
          background: #e8f5e8;
        }

        .emoji-input {
          margin-top: 5px;
        }


        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .add-btn, .cancel-btn {
          padding: 15px 30px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.3s;
        }

        .add-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
        }

        .cancel-btn {
          background: #6c757d;
          color: white;
        }

        .add-btn:hover:not(:disabled), .cancel-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .add-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

function CameraAdminForm({ camera, onUpdate, onDelete, loading }) {
  const [formData, setFormData] = useState(camera);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: uploadFormData
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.imageUrl }));
        alert('Image uploaded successfully!');
      } else {
        alert('Image upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Image upload failed. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(camera.id, formData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    if (field.startsWith('pricing.')) {
      const pricingField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        pricing: { ...prev.pricing, [pricingField]: parseInt(value) || 0 }
      }));
    } else if (field === 'available') {
      setFormData(prev => ({ ...prev, [field]: value === 'true' }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const resetForm = () => {
    setFormData(camera);
    setIsEditing(false);
  };

  return (
    <div className="camera-admin-card">
      <div className="card-header">
        <div className="camera-info">
          <h3>{camera.title}</h3>
          <span className={`status-badge ${camera.available ? 'available' : 'unavailable'}`}>
            {camera.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <div className="card-actions">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                ✏️ Edit
              </button>
              <button onClick={() => onDelete(camera.id)} className="delete-btn" disabled={loading}>
                🗑️ Delete
              </button>
            </>
          ) : (
            <button onClick={resetForm} className="cancel-btn">
              ❌ Cancel
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Camera Image</label>
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id={`image-upload-${camera.id}`}
                  className="file-input"
                />
                <label htmlFor={`image-upload-${camera.id}`} className="file-label">
                  {formData.image && formData.image.startsWith('/assets') ? 
                    `📸 ${formData.image.split('/').pop()}` : 
                    formData.image && formData.image.length > 2 ? `${formData.image} Choose Image` : 
                    '📷 Choose Image'}
                </label>
                <input
                  type="text"
                  value={formData.image.startsWith('/assets') ? '' : formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  placeholder="Or enter emoji (📷, 📸, 📹)"
                  className="emoji-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>1-2 Days Rate (PHP)</label>
              <input
                type="number"
                value={formData.pricing['1-2 days']}
                onChange={(e) => handleChange('pricing.1-2 days', e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>3-5 Days Rate (PHP)</label>
              <input
                type="number"
                value={formData.pricing['3-5 days']}
                onChange={(e) => handleChange('pricing.3-5 days', e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>6+ Days Rate (PHP)</label>
              <input
                type="number"
                value={formData.pricing['6+ days']}
                onChange={(e) => handleChange('pricing.6+ days', e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Available</label>
              <select
                value={formData.available}
                onChange={(e) => handleChange('available', e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Available Date</label>
              <input
                type="text"
                value={formData.availableDate}
                onChange={(e) => handleChange('availableDate', e.target.value)}
                placeholder="e.g., Available Today or Available by August 15, 2025"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Inclusions</label>
              <textarea
                value={formData.inclusions}
                onChange={(e) => handleChange('inclusions', e.target.value)}
                rows="3"
                placeholder="List what's included with the camera rental"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows="3"
                placeholder="Describe the camera and its best use cases"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="update-btn">
              {loading ? 'Updating...' : '💾 Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <div className="camera-preview">
          <div className="preview-grid">
            <div className="preview-item">
              <strong>Brand:</strong> {camera.brand}
            </div>
            <div className="preview-item">
              <strong>Type:</strong> {camera.type}
            </div>
            <div className="preview-item">
              <strong>1-2 Days:</strong> ₱{camera.pricing['1-2 days'].toLocaleString()}
            </div>
            <div className="preview-item">
              <strong>3-5 Days:</strong> ₱{camera.pricing['3-5 days'].toLocaleString()}
            </div>
            <div className="preview-item">
              <strong>6+ Days:</strong> ₱{camera.pricing['6+ days'].toLocaleString()}
            </div>
            <div className="preview-item">
              <strong>Status:</strong> {camera.availableDate}
            </div>
          </div>
          <div className="preview-description">
            <strong>Description:</strong> {camera.description}
          </div>
          <div className="preview-inclusions">
            <strong>Inclusions:</strong> {camera.inclusions}
          </div>
        </div>
      )}

      <style jsx>{`
        .camera-admin-card {
          background: white;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: all 0.3s;
        }

        .camera-admin-card:hover {
          box-shadow: 0 12px 35px rgba(0,0,0,0.15);
        }

        .card-header {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #dee2e6;
        }

        .camera-info h3 {
          margin: 0 0 8px 0;
          color: #333;
          font-size: 1.3rem;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .status-badge.available {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-badge.unavailable {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .card-actions {
          display: flex;
          gap: 10px;
        }

        .edit-btn, .cancel-btn, .delete-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
        }

        .edit-btn {
          background: #007bff;
          color: white;
        }

        .cancel-btn {
          background: #6c757d;
          color: white;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }

        .edit-btn:hover, .cancel-btn:hover, .delete-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .delete-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .edit-form {
          padding: 30px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-weight: bold;
          color: #333;
          font-size: 0.9rem;
        }

        .form-group input, .form-group select, .form-group textarea {
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-actions {
          text-align: center;
        }

        .update-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.3s;
        }

        .update-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
        }

        .update-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .camera-preview {
          padding: 30px;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .preview-item {
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .preview-description, .preview-inclusions {
          margin-bottom: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .card-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .preview-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}