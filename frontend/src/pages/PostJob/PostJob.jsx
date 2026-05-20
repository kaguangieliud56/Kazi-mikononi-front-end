import React, { useState } from 'react';
import { Camera, MapPin, DollarSign, Briefcase, FileText, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jobService from '../../services/jobService';

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    budget: '',
    urgency: 'Flexible - No rush',
    duration: 'Few hours',
    contactMethod: 'Platform Messages'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploading) {
      alert("Please wait for image upload to finish");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        contact_method: formData.contactMethod,
        image_url: imageUrl || null,
        budget: Number(formData.budget),
      };

      await jobService.createJob(payload);

      alert("Job posted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  setUploading(true);

  try {
    const response = await jobService.uploadJobImage(formData);
    setImageUrl(response.image_url);
    return response.image_url;
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Image upload failed");
    return null;
  } finally {
    setUploading(false);
  }
};


const handleFileChange = async (file) => {
  if (!file) return;

  // validate type
  if (!file.type.startsWith("image/")) {
    alert("Only image files allowed");
    return;
  }

  // validate size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert("Image must be less than 5MB");
    return;
  }

  setImageFile(file);
  const preview = URL.createObjectURL(file);
  setImagePreview(preview);

  await uploadImage(file);
};

  const handleDrop = async (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  await handleFileChange(file);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-outfit">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Post a Job</h1>
          <p className="text-slate-500">Describe the work you need done and find the perfect worker</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Job Details Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Job Details</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Fix Leaking Kitchen Sink"
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors appearance-none"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Tutoring">Tutoring</option>
                  <option value="Carpentry">Carpentry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none">
                    <FileText className="h-5 w-5 text-slate-400" />
                  </div>
                  <textarea
                    name="description"
                    required
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the job in detail. What needs to be done? Any specific requirements or preferences?"
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Photos of the Job Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Photos of the Job
            </h2>

            <p className="text-sm text-slate-500 mb-6">
              Upload or drag & drop a photo, or paste an image URL.
            </p>

            {/* DROP AREA */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("fileInput").click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition"
              >
                <Camera className="w-10 h-10 text-slate-400 mb-3" />

                <p className="font-semibold text-slate-700">
                  Drag & drop image here
                </p>

                <p className="text-sm text-slate-500">
                  or click anywhere to choose file
                </p>

                {/* HIDDEN FILE INPUT (IMPORTANT) */}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />

                {/* UPLOADING STATE */}
                {uploading && (
                  <p className="text-blue-600 mt-2 text-sm">
                    Uploading image...
                  </p>
                )}

                {/* SUCCESS MESSAGE */}
                {imageUrl && (
                  <p className="text-green-600 text-sm mt-2 font-medium">
                    ✓ Image uploaded successfully
                  </p>
                )}
              </div>

            {/* URL INPUT OPTION */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">
                Or paste image URL
              </label>

              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-2 w-full px-4 py-2 border rounded-xl bg-slate-50"
              />
            </div>

            {/* PREVIEW */}
            {imagePreview && (
              <div className="mt-6">
                <p className="text-sm text-slate-600 mb-2">Preview:</p>
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full max-h-64 object-cover rounded-xl border"
                />
              </div>
            )}
          </div>

          {/* Location & Budget Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Location & Budget</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Job Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Westlands, Nairobi"
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Budget (KSh) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="3000"
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                  />
                </div>
                <p className="mt-1.5 text-sm text-slate-500">Enter your maximum budget for this job</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Urgency
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors appearance-none"
                >
                  <option value="Flexible - No rush">Flexible - No rush</option>
                  <option value="Within a week">Within a week</option>
                  <option value="Within 48 hours">Within 48 hours</option>
                  <option value="Urgent - Today">Urgent - Today</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Expected Duration
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors appearance-none"
                >
                  <option value="Few hours">Few hours</option>
                  <option value="Full day">Full day</option>
                  <option value="A few days">A few days</option>
                  <option value="Ongoing / Weekly">Ongoing / Weekly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Preferences Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Preferences</h2>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Preferred Contact Method
              </label>
              <select
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors appearance-none"
              >
                <option value="Platform Messages">Platform Messages</option>
                <option value="Phone Call">Phone Call</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl font-semibold text-white bg-[#2563EB] hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 flex items-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </span>
              ) : (
                'Post Job Now'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
