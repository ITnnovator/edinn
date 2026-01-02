"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getGalleryImages, uploadGalleryImage, deleteGalleryImage, deleteBulkGalleryImages } from '@/app/actions/gallery';
import toast from 'react-hot-toast';

type GalleryImage = {
  id: string;
  url: string;
  title: string | null;
  category: string;
};

export default function AdminGallery() {
  const [activeTab, setActiveTab] = useState<'home' | 'main'>('home');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    setLoading(true);
    const res = await getGalleryImages(activeTab);
    if (res.success && res.data) {
      setImages(res.data);
    } else {
      toast.error('Failed to load images');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
    setSelectedImages([]); // Reset selection on tab change
  }, [activeTab]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    // Total Size Limit (30MB)
    const totalSize = Array.from(e.target.files).reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 30 * 1024 * 1024) { // 30MB
        toast.error('Total upload size exceeds 30MB limit.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
    }

    // Client-side limit check for 'home'
    if (activeTab === 'home') {
        if (images.length + e.target.files.length > 10) {
             toast.error(`Limit exceeded. You can add max ${10 - images.length} more images.`);
             if (fileInputRef.current) fileInputRef.current.value = '';
             return;
        }
    }

    setUploading(true);
    const formData = new FormData();
    
    // Append all selected files
    Array.from(e.target.files).forEach(file => {
        formData.append('image', file);
    });
    
    formData.append('category', activeTab);

    const res = await uploadGalleryImage(formData);
    if (res.success) {
      toast.success('Images uploaded successfully');
      fetchImages();
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      console.error(res.error);
      toast.error(res.error || 'Upload failed');
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    const res = await deleteGalleryImage(id);
    if (res.success) {
      toast.success('Image deleted');
      setImages(images.filter(img => img.id !== id));
      setSelectedImages(selectedImages.filter(sid => sid !== id));
    } else {
      toast.error(res.error || 'Delete failed');
    }
  };

  const handleBulkDelete = async () => {
      if (selectedImages.length === 0) return;
      if (!confirm(`Are you sure you want to delete ${selectedImages.length} images?`)) return;
      
      const res = await deleteBulkGalleryImages(selectedImages);
      if (res.success) {
          toast.success(`${selectedImages.length} images deleted`);
          setImages(images.filter(img => !selectedImages.includes(img.id)));
          setSelectedImages([]);
      } else {
          toast.error(res.error || 'Bulk delete failed');
      }
  };

  const toggleSelect = (id: string) => {
      setSelectedImages(prev => 
          prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
      );
  };

  const selectAll = () => {
      if (selectedImages.length === images.length) {
          setSelectedImages([]);
      } else {
          setSelectedImages(images.map(img => img.id));
      }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gallery Management</h1>
      </div>

      {/* Modern Arrow Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab-btn arrow ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
           Home Page Gallery ({activeTab === 'home' ? images.length : '?'}/10)
        </button>
        <button 
          className={`tab-btn arrow ${activeTab === 'main' ? 'active' : ''}`}
          onClick={() => setActiveTab('main')}
        >
           Main Gallery (Unlimited)
        </button>
      </div>

      <div className="content-area">
         <div className="info-bar">
            <h3>{activeTab === 'home' ? 'Home Page Slider' : 'Main Gallery Grid'}</h3>
            <p>
                {activeTab === 'home' 
                    ? 'Images shown on the home page banner. Max 10 images.' 
                    : 'Images shown on the dedicated gallery page. No limit.'}
            </p>
         </div>
         
         {/* Bulk Actions Toolbar */}
         <div className="actions-toolbar">
             <button onClick={selectAll} className="btn-secondary">
                {selectedImages.length === images.length && images.length > 0 ? 'Deselect All' : 'Select All'}
             </button>
             {selectedImages.length > 0 && (
                 <button onClick={handleBulkDelete} className="btn-danger">
                     Delete Selected ({selectedImages.length})
                 </button>
             )}
         </div>

         {/* Upload Zone */}
         <div 
            className={`upload-zone ${activeTab === 'home' && images.length >= 10 ? 'disabled' : ''}`}
            onClick={() => {
                if (activeTab !== 'home' || images.length < 10) {
                    fileInputRef.current?.click();
                } else {
                    toast.error('Limit reached (10). Delete images to add more.');
                }
            }}
         >
            <input 
                type="file" 
                hidden 
                multiple
                ref={fileInputRef} 
                onChange={handleUpload} 
                accept="image/*"
                disabled={uploading || (activeTab === 'home' && images.length >= 10)}
            />
            <div className="upload-content">
              {uploading ? (
                 <div className="spinner"><i className="fas fa-spinner fa-spin"></i> Uploading...</div>
              ) : (
                <>
                    <i className="fas fa-image icon-upload"></i>
                    <h3>
                        {activeTab === 'home' && images.length >= 10 
                           ? 'Limit Reached (10/10)' 
                           : 'Click to Upload Image'}
                    </h3>
                    <p>{activeTab === 'home' ? 'Maximum 10 images allowed' : 'Upload high quality images'}</p>
                </>
              )}
            </div>
         </div>

         {/* Grid */}
         {loading ? (
             <div className="loading-state">Loading gallery...</div>
         ) : (
             <div className="gallery-grid">
               {images.map((img) => (
                 <div 
                   className={`gallery-item ${selectedImages.includes(img.id) ? 'selected' : ''}`} 
                   key={img.id}
                   onClick={() => toggleSelect(img.id)}
                 >
                   <div className="img-wrapper">
                     <div className={`checkbox-overlay ${selectedImages.includes(img.id) ? 'visible' : ''}`}>
                         <div className="custom-checkbox">
                             {selectedImages.includes(img.id) && <i className="fas fa-check"></i>}
                         </div>
                     </div>
                     <Image src={img.url} alt={img.title || 'Gallery Image'} width={300} height={200} className="gallery-img" unoptimized />
                     <div className="overlay" onClick={(e) => e.stopPropagation()}>
                        <button className="del-btn" onClick={() => handleDelete(img.id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                     </div>
                   </div>
                 </div>
               ))}
               {!loading && images.length === 0 && (
                   <div className="empty-state">No images found in this gallery.</div>
               )}
             </div>
         )}
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 20px; }
        .page-header h1 { font-size: 24px; font-weight: 700; color: #000; }

        .tabs-container {
            display: flex;
            margin-bottom: 30px;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
            gap: 0; /* No gap for connected arrows */
        }

        .tab-btn {
            position: relative;
            background: #e0e0e0; /* Inactive Gray */
            color: #555;
            border: none;
            padding: 15px 30px 15px 40px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%);
            margin-right: -15px; /* Overlap to connect arrows */
            min-width: 200px;
            text-align: center;
            z-index: 1;
        }

        .tab-btn:first-child {
             /* First arrow: straight left edge */
             clip-path: polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%);
             padding-left: 20px;
             z-index: 2;
        }

        .tab-btn.active {
            background: #000000; /* Active Black */
            color: #ffffff;
            z-index: 3;
        }

        .tab-btn:hover:not(.active) {
            background: #cccccc;
        }

        .content-area {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .info-bar { margin-bottom: 25px; }
        .info-bar h3 { margin: 0 0 5px; font-size: 18px; font-weight: 600; }
        .info-bar p { margin: 0; color: #666; font-size: 14px; }

        .upload-zone {
          background: #fafafa;
          border: 2px dashed #ddd;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          margin-bottom: 30px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .upload-zone:hover:not(.disabled) {
          border-color: #000;
          background: #f0f0f0;
        }

        .upload-zone.disabled {
            opacity: 0.6;
            cursor: not-allowed;
            border-color: #eee;
        }

        .icon-upload { font-size: 32px; color: #000; margin-bottom: 12px; }
        .upload-content h3 { margin: 0 0 5px 0; color: #333; font-size: 16px; }
        .upload-content p { margin: 0; color: #888; font-size: 13px; }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border: 1px solid #eee;
        }

        .img-wrapper {
          position: relative;
          height: 160px;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .img-wrapper:hover .overlay { opacity: 1; }

        .del-btn {
          background: #ff3b3b;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: transform 0.2s;
        }
        
        .del-btn:hover { transform: scale(1.1); }
        
        .empty-state, .loading-state {
            text-align: center;
            padding: 40px;
            color: #888;
            font-style: italic;
        }

        .actions-toolbar {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            align-items: center;
        }

        .btn-secondary {
            background: #f0f0f0;
            border: 1px solid #ccc;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
        }

        .btn-danger {
            background: #ff3b3b;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
        }

        .gallery-item.selected {
            border: 2px solid #0070f3;
            transform: scale(0.98);
        }

        .checkbox-overlay {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 2;
            opacity: 0;
            transition: opacity 0.2s;
        }

        .gallery-item:hover .checkbox-overlay,
        .checkbox-overlay.visible {
            opacity: 1;
        }

        .custom-checkbox {
            width: 24px;
            height: 24px;
            background: rgba(255,255,255,0.9);
            border: 2px solid #ccc;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0070f3;
            font-size: 14px;
        }

        .gallery-item.selected .custom-checkbox {
            border-color: #0070f3;
            background: white;
        }
      `}</style>
    </div>
  );
}
