"use client";
import React, { useState, useEffect, useRef } from 'react';
import { getNotice, updateNotice } from '@/app/actions/notice';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function AdminNotices() {
  const [notice, setNotice] = useState({
    content: "",
    isActive: false,
    image: null as string | null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotice() {
      const res = await getNotice();
      if (res.success && res.data) {
        setNotice({
          content: res.data.content,
          isActive: res.data.isActive,
          // @ts-ignore
          image: res.data.image
        });
      }
      setLoading(false);
    }
    loadNotice();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const url = URL.createObjectURL(file);
          setPreviewImage(url);
      }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData();
    formData.append('content', notice.content);
    formData.append('isActive', String(notice.isActive));
    
    if (fileInputRef.current?.files?.[0]) {
        formData.append('image', fileInputRef.current.files[0]);
    }

    const res = await updateNotice(formData);
    
    if (res.success) {
      toast.success('Notice updated successfully!');
      // Refresh image if new one uploaded
      if (previewImage) {
          const refresh = await getNotice();
          if (refresh.success && refresh.data) {
              // @ts-ignore
              setNotice(prev => ({ ...prev, image: refresh.data.image }));
          }
      }
    } else {
      toast.error(res.error || 'Failed to update notice');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Notice Management</h1>
      </div>

      <div className="content-wrapper">
          <div className="card notice-card">
            <form onSubmit={handleSave}>
              <div className="form-group toggle-group">
                <label>Notice Status</label>
                <div 
                  className={`toggle-switch ${notice.isActive ? 'active' : ''}`}
                  onClick={() => setNotice({ ...notice, isActive: !notice.isActive })}
                >
                  <div className="slider"></div>
                </div>
                <span className="status-text">{notice.isActive ? 'Enabled' : 'Disabled'}</span>
              </div>

              <div className="form-group">
                <label>Notice Content</label>
                <textarea 
                  rows={4} 
                  value={notice.content} 
                  onChange={(e) => setNotice({ ...notice, content: e.target.value })}
                  placeholder="Enter the text that will appear in the popup..."
                />
              </div>

              <div className="form-group">
                  <label>Popup Image (Optional)</label>
                  <div className="image-upload-box" onClick={() => fileInputRef.current?.click()}>
                      <input 
                          type="file" 
                          hidden 
                          ref={fileInputRef} 
                          onChange={handleImageChange} 
                          accept="image/*"
                      />
                      {(previewImage || notice.image) ? (
                          <div className="preview-container">
                              <Image 
                                  src={previewImage || notice.image || ''} 
                                  alt="Preview" 
                                  fill 
                                  className="preview-img"
                                  unoptimized
                              />
                              <div className="overlay">
                                  <span>Change Image</span>
                              </div>
                          </div>
                      ) : (
                          <div className="placeholder">
                              <i className="fas fa-cloud-upload-alt"></i>
                              <span>Click to upload image</span>
                          </div>
                      )}
                  </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} 
                  {saving ? ' Saving...' : ' Save Changes'}
                </button>
              </div>
            </form>
          </div>

          <div className="preview-section">
            <h3>Live Preview</h3>
            <p className="preview-desc">This is how the notice will appear on the website (Black & White Theme):</p>
            
            <div className={`preview-popup ${notice.isActive ? 'show' : ''}`}>
               <div className="popup-inner">
                  <div className="popup-header">
                      <span>NOTICE</span>
                      <button className="close-preview" type="button">×</button>
                  </div>
                  <div className="popup-body">
                      {(previewImage || notice.image) && (
                          <div className="popup-img-container">
                              <Image 
                                  src={previewImage || notice.image || ''} 
                                  alt="Notice" 
                                  width={400} 
                                  height={200}
                                  className="popup-main-image"
                                  unoptimized
                              />
                          </div>
                      )}
                      <p className="popup-message">{notice.content}</p>
                  </div>
               </div>
            </div>
          </div>
      </div>

      <style jsx>{`
        .page-container {
            max-width: 1200px;
        }

        .page-header { margin-bottom: 30px; }
        .page-header h1 { font-size: 24px; font-weight: 700; color: #000; }

        .content-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: start;
        }

        @media (max-width: 900px) {
            .content-wrapper { grid-template-columns: 1fr; }
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0px 4px 20px rgba(0,0,0,0.05);
          border: 1px solid #eee;
        }

        .form-group { margin-bottom: 24px; }
        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #000;
          font-size: 14px;
        }

        textarea {
          width: 100%;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.2s;
        }
        textarea:focus { border-color: #000; outline: none; }

        .toggle-group {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .toggle-group label { margin: 0; }

        .toggle-switch {
          width: 50px;
          height: 26px;
          background: #ccc;
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s;
        }
        .toggle-switch.active { background: #000; }
        .slider {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: left 0.3s;
        }
        .toggle-switch.active .slider { left: 27px; }
        .status-text { font-weight: 500; font-size: 14px; }

        /* Image Upload */
        .image-upload-box {
            width: 100%;
            height: 200px;
            border: 2px dashed #ccc;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            background: #fafafa;
            transition: all 0.2s;
        }
        .image-upload-box:hover { border-color: #000; background: #f0f0f0; }

        .placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            color: #888;
        }
        .placeholder i { font-size: 24px; }

        .preview-container {
            width: 100%;
            height: 100%;
            position: relative;
        }
        .preview-img { object-fit: cover; }
        .overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            opacity: 0;
            transition: opacity 0.2s;
        }
        .preview-container:hover .overlay { opacity: 1; }

        .save-btn {
          background: #000;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: opacity 0.2s;
        }
        .save-btn:hover { opacity: 0.8; }
        .save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Preview Section */
        .preview-section h3 { margin: 0 0 10px; font-size: 18px; }
        .preview-desc { color: #666; font-size: 13px; margin-bottom: 20px; }

        .preview-popup {
            background: rgba(0,0,0,0.5); /* Backdrop simulation */
            padding: 20px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            opacity: 0.5;
            pointer-events: none;
        }
        .preview-popup.show { opacity: 1; }

        .popup-inner {
            background: white;
            width: 100%;
            max-width: 400px;
            border: 1px solid #eee;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .popup-header {
            background: linear-gradient(90deg, #01ffff, #63f101);
            color: #000;
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 700;
            letter-spacing: 1px;
            font-size: 12px;
        }

        .close-preview {
            background: none;
            border: none;
            color: #000;
            font-size: 20px;
            line-height: 1;
        }

        .popup-body {
            padding: 20px;
        }

        .popup-img-container {
            width: 100%;
            height: 180px;
            position: relative;
            margin-bottom: 15px;
            border: 1px solid #eee;
        }
        .popup-main-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .popup-message {
            font-size: 14px;
            line-height: 1.5;
            color: #000;
            margin: 0;
            font-weight: 500;
        }
      `}</style>
    </div>
  );
}

