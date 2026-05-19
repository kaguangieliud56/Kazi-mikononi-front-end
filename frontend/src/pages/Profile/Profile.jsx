import React, { useState } from 'react';
import { Camera, MapPin, Briefcase, Clock, DollarSign, Plus } from 'lucide-react';

const Profile = () => {
  const [skills, setSkills] = useState(["Plumbing", "Pipe Fitting", "Water Heater Installation"]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim() !== '') {
      e.preventDefault();
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-outfit py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Worker Profile</h1>
          <p className="text-slate-500">Manage your professional presence and details.</p>
        </div>

        <div className="space-y-6">
          
          {/* Profile Picture Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-200">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-slate-900 mb-1">David Kimani</h2>
              <p className="text-slate-500 text-sm mb-4">Professional Plumber</p>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl transition-colors text-sm">
                Change Photo
              </button>
            </div>
          </div>

          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Professional Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" defaultValue="Professional Plumber" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Years of Experience</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="number" defaultValue="8" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hourly Rate</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" defaultValue="500" className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">KSh</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" defaultValue="Westlands, Nairobi" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700" />
                </div>
              </div>
            </div>
          </div>

          {/* About You */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">About You</h3>
            <label className="block text-sm font-medium text-slate-700 mb-2">Professional Biography</label>
            <textarea 
              rows="4" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700 leading-relaxed resize-none"
              defaultValue="I am a highly experienced plumber with over 8 years in the field. I specialize in residential plumbing, including leak repairs, pipe fitting, and complete bathroom installations. I am committed to providing high-quality, reliable, and prompt service."
            ></textarea>
          </div>

          {/* Skills & Services */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Skills & Services</h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill, index) => (
                <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="text-blue-400 hover:text-blue-600 focus:outline-none">
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <div className="relative max-w-sm">
              <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type a skill and press Enter" 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700 text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
            <button className="w-full sm:w-auto px-6 py-3 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              Cancel
            </button>
            <button className="w-full sm:w-auto px-8 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors">
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
