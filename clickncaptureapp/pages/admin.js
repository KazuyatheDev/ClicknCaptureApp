import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AdminPage() {
  const [cameras, setCameras] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
        const result = await response.json();
        await fetchCameras();
        setSuccessMessage(`✅ Camera updated successfully! Status: ${response.status} OK - Changes saved to GitHub`);
        setTimeout(() => setSuccessMessage(''), 5000);
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
        const result = await response.json();
        await fetchCameras();
        setShowAddForm(false);
        setSuccessMessage(`✅ Camera added successfully! Status: ${response.status} OK - Changes saved to GitHub`);
        setTimeout(() => setSuccessMessage(''), 5000);
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
        const result = await response.json();
        await fetchCameras();
        setSuccessMessage(`✅ Camera deleted successfully! Status: ${response.status} OK - Changes saved to GitHub`);
        setTimeout(() => setSuccessMessage(''), 5000);
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
              background: white;
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
              border: 1px solid #e1e5e9;
              border-radius: 8px;
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
              border-color: #3d2e1f;
            }

            .login-btn {
              width: 100%;
              padding: 15px;
              background: #3d2e1f;
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.3s;
            }

            .login-btn:hover:not(:disabled) {
              background: #5a4a3a;
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
          <p className="subtitle">Manage your camera rental inventory ({cameras.length} cameras loaded)</p>
          
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
          
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
            background-color: white;
          }

          .admin-header {
            background: white;
            color: #3d2e1f;
            padding: 20px 0;
            border-bottom: 1px solid #e1e5e9;
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
            color: #3d2e1f;
            margin-left: 10px;
          }

          .logout-btn {
            background: white;
            color: #3d2e1f;
            border: 1px solid #3d2e1f;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
          }

          .logout-btn:hover {
            background: #3d2e1f;
            color: white;
          }

          .admin-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px 15px;
          }

          .admin-container h1 {
            text-align: center;
            margin-bottom: 10px;
            color: #333;
            font-size: 2.5rem;
          }

          .subtitle {
            text-align: center;
            margin-bottom: 20px;
            color: #666;
            font-size: 1.1rem;
          }

          .admin-actions {
            text-align: center;
            margin-bottom: 20px;
          }

          .add-camera-btn {
            background: #3d2e1f;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            transition: all 0.3s;
          }

          .add-camera-btn:hover:not(:disabled) {
            background: #5a4a3a;
          }

          .add-camera-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
          }

          .cameras-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .success-message {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            padding: 15px 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            font-weight: 500;
            animation: slideDown 0.3s ease-out;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
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

          <div className="form-group full-width">
            <label>Pricing Information *</label>
            <textarea
              value={`1-2 days: ${formData.pricing['1-2 days']}\n3-5 days: ${formData.pricing['3-5 days']}\n6+ days: ${formData.pricing['6+ days']}`}
              onChange={(e) => {
                const lines = e.target.value.split('\n');
                const newPricing = {};
                lines.forEach(line => {
                  const [key, value] = line.split(':').map(s => s.trim());
                  if (key && value) {
                    newPricing[key] = parseInt(value) || 0;
                  }
                });
                setFormData(prev => ({ ...prev, pricing: { ...prev.pricing, ...newPricing } }));
              }}
              rows="3"
              placeholder="1-2 days: 500\n3-5 days: 450\n6+ days: 400"
              required
            />
            <small style={{color: '#666', fontSize: '0.8rem', marginTop: '5px', display: 'block'}}>
              Format: "1-2 days: 500" (one per line)
            </small>
          </div>

          <div className="form-group availability-row">
            <div className="availability-today">
              <label>Available Today?</label>
              <select
                value={formData.available}
                onChange={(e) => {
                  handleChange('available', e.target.value);
                  // Auto-set date based on availability choice
                  if (e.target.value === 'true') {
                    handleChange('availableDate', 'Available Today');
                  } else {
                    handleChange('availableDate', '');
                  }
                }}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            
            <div className="availability-date">
              <label>Available Date {formData.available === 'false' ? '*' : ''}</label>
              <input
                type="date"
                value={(() => {
                  if (formData.availableDate === 'Available Today') return '';
                  if (formData.availableDate.includes('Available by')) {
                    const dateStr = formData.availableDate.replace('Available by ', '');
                    const dateObj = new Date(dateStr);
                    return isNaN(dateObj.getTime()) ? '' : dateObj.toISOString().split('T')[0];
                  }
                  return formData.availableDate;
                })()}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const formattedDate = `Available by ${selectedDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}`;
                  handleChange('availableDate', formattedDate);
                }}
                min={new Date().toISOString().split('T')[0]}
                disabled={formData.available === 'true'}
                required={formData.available === 'false'}
                style={{ 
                  backgroundColor: formData.available === 'true' ? '#f8f9fa' : 'white',
                  color: formData.available === 'true' ? '#6c757d' : '#333'
                }}
              />
            </div>
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
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          border: 2px solid #e1e5e9;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .add-camera-form h2 {
          text-align: center;
          color: #3d2e1f;
          margin-bottom: 20px;
          font-size: 1.6rem;
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
          border-color: #3d2e1f;
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
          border: 1px dashed #3d2e1f;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: background 0.3s;
        }

        .file-label:hover {
          background: #f0f0f0;
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
          background: #3d2e1f;
          color: white;
        }

        .cancel-btn {
          background: #6c757d;
          color: white;
        }

        .add-btn:hover:not(:disabled) {
          background: #5a4a3a;
        }

        .cancel-btn:hover {
          background: #868e96;
        }

        .add-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .form-group.availability-row {
          grid-column: 1 / -1;
          display: flex;
          gap: 20px;
          align-items: end;
        }

        .availability-today {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .availability-date {
          flex: 2;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }

          .form-group.availability-row {
            flex-direction: column;
            gap: 15px;
          }
          
          .availability-today,
          .availability-date {
            flex: 1;
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

            <div className="form-group full-width">
              <label>Pricing Information</label>
              <textarea
                value={`1-2 days: ${formData.pricing['1-2 days']}\n3-5 days: ${formData.pricing['3-5 days']}\n6+ days: ${formData.pricing['6+ days']}`}
                onChange={(e) => {
                  const lines = e.target.value.split('\n');
                  const newPricing = {};
                  lines.forEach(line => {
                    const [key, value] = line.split(':').map(s => s.trim());
                    if (key && value) {
                      newPricing[key] = parseInt(value) || 0;
                    }
                  });
                  setFormData(prev => ({ ...prev, pricing: { ...prev.pricing, ...newPricing } }));
                }}
                rows="3"
                placeholder="1-2 days: 500\n3-5 days: 450\n6+ days: 400"
                required
              />
              <small style={{color: '#666', fontSize: '0.8rem', marginTop: '5px', display: 'block'}}>
                Format: "1-2 days: 500" (one per line)
              </small>
            </div>

            <div className="form-group availability-row">
              <div className="availability-today">
                <label>Available Today?</label>
                <select
                  value={formData.available}
                  onChange={(e) => {
                    handleChange('available', e.target.value);
                    // Auto-set date based on availability choice
                    if (e.target.value === 'true') {
                      handleChange('availableDate', 'Available Today');
                    } else if (formData.availableDate === 'Available Today') {
                      handleChange('availableDate', '');
                    }
                  }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              
              <div className="availability-date">
                <label>Available Date {formData.available === 'false' ? '*' : ''}</label>
                <input
                  type="date"
                  value={(() => {
                    if (formData.availableDate === 'Available Today') return '';
                    if (formData.availableDate.includes('Available by')) {
                      const dateStr = formData.availableDate.replace('Available by ', '');
                      const dateObj = new Date(dateStr);
                      return isNaN(dateObj.getTime()) ? '' : dateObj.toISOString().split('T')[0];
                    }
                    return formData.availableDate;
                  })()}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const formattedDate = `Available by ${selectedDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}`;
                    handleChange('availableDate', formattedDate);
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  disabled={formData.available === 'true'}
                  required={formData.available === 'false'}
                  style={{ 
                    backgroundColor: formData.available === 'true' ? '#f8f9fa' : 'white',
                    color: formData.available === 'true' ? '#6c757d' : '#333'
                  }}
                />
              </div>
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
          border-radius: 12px;
          border: 2px solid #e1e5e9;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 10px;
        }

        .camera-admin-card:hover {
          border-color: #3d2e1f;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .card-header {
          background: #f8f9fa;
          padding: 15px 20px;
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

        .edit-btn:hover {
          background: #0056b3;
        }

        .cancel-btn:hover {
          background: #5a6268;
        }

        .delete-btn:hover:not(:disabled) {
          background: #c82333;
        }

        .delete-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .edit-form {
          padding: 20px;
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
          border-color: #3d2e1f;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-actions {
          text-align: center;
        }

        .update-btn {
          background: #3d2e1f;
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.3s;
        }

        .update-btn:hover:not(:disabled) {
          background: #5a4a3a;
        }

        .update-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .camera-preview {
          padding: 20px;
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

        .form-group.availability-row {
          grid-column: 1 / -1;
          display: flex;
          gap: 20px;
          align-items: end;
        }

        .availability-today {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .availability-date {
          flex: 2;
          display: flex;
          flex-direction: column;
          gap: 8px;
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

          .form-group.availability-row {
            flex-direction: column;
            gap: 15px;
          }
          
          .availability-today,
          .availability-date {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}