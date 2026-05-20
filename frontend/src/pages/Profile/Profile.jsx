import React, { useEffect, useState } from "react";
import {
  Camera,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Plus,
} from "lucide-react";

import workerService from "../../services/workerService";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  // ─────────────────────────────────────────────
  // ROLE FLAGS (ADDED)
  // ─────────────────────────────────────────────
  const isWorker = user?.role === "worker";
  const isClient = user?.role === "client";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    full_name: "",
    location: "",
    title: "",
    experience_years: "",
    hourly_rate: "",
    bio: "",
    profile_image: "",
  });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // ─────────────────────────────────────────────
  // Fetch Profile
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {

        // ─────────────────────────────────────
        // ADDED: block worker API for clients
        // ─────────────────────────────────────
        if (!isWorker) {
          setLoading(false);
          return;
        }

        const response = await workerService.getProfile();

        console.log("PROFILE RESPONSE:", response);

        const profile = response.profile;

        setProfileData({
          full_name: user?.full_name || "",
          location: user?.location || "",
          title: profile?.title || "",
          experience_years: profile?.experience_years || "",
          hourly_rate: profile?.hourly_rate || "",
          bio: profile?.bio || "",
          profile_image: profile?.profile_image || "",
        });

        setSkills(
          profile?.skills?.map((skill) => skill.name) || []
        );

      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isWorker, user]);

  // ─────────────────────────────────────────────
  // Handle Input Changes
  // ─────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ─────────────────────────────────────────────
  // Add Skill
  // ─────────────────────────────────────────────
  const handleAddSkill = async (e) => {

    // ─────────────────────────────────────
    // ADDED ROLE GUARD
    // ─────────────────────────────────────
    if (!isWorker) return;

    if (e.key === "Enter" && newSkill.trim() !== "") {
      e.preventDefault();

      try {
        await workerService.addSkill(newSkill.trim());

        setSkills((prev) => [...prev, newSkill.trim()]);

        setNewSkill("");

      } catch (error) {
        console.error("Failed to add skill:", error);
      }
    }
  };

  // ─────────────────────────────────────────────
  // Remove Skill
  // ─────────────────────────────────────────────
  const removeSkill = async (skillToRemove) => {

    // ─────────────────────────────────────
    // ADDED ROLE GUARD
    // ─────────────────────────────────────
    if (!isWorker) return;

    try {
      await workerService.removeSkill(skillToRemove);

      setSkills(
        skills.filter((skill) => skill !== skillToRemove)
      );

    } catch (error) {
      console.error("Failed to remove skill:", error);
    }
  };

  // ─────────────────────────────────────────────
  // Save Profile
  // ─────────────────────────────────────────────
  const handleSave = async () => {

    // ─────────────────────────────────────
    // ADDED ROLE GUARD
    // ─────────────────────────────────────
    if (!isWorker) return;

    setSaving(true);

    try {
      const payload = {
        title: profileData.title,
        bio: profileData.bio,
        experience_years: Number(profileData.experience_years),
        hourly_rate: Number(profileData.hourly_rate),
        profile_image: profileData.profile_image,
      };

      const response = await workerService.saveProfile(payload);

      console.log("PROFILE UPDATED:", response);

      alert("Profile updated successfully!");

    } catch (error) {
      console.error("Failed to save profile:", error);

      alert(
        error?.response?.data?.error ||
        "Failed to save profile"
      );

    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────
  // Loading State
  // ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F9FAFB]">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // CLIENT VIEW (ADDED - DO NOT REMOVE WORKER UI)
  // ─────────────────────────────────────────────
  if (isClient) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] font-outfit py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border p-6">

          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          <div className="space-y-4">

            <div>
              <p className="text-sm text-slate-400">Full Name</p>
              <p className="font-medium">{user?.full_name}</p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Phone</p>
              <p className="font-medium">{user?.phone || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Location</p>
              <p className="font-medium">{user?.location || "Not set"}</p>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // WORKER VIEW (YOUR ORIGINAL UI - NOT REMOVED)
  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-outfit py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            My Worker Profile
          </h1>

          <p className="text-slate-500">
            Manage your professional profile and details.
          </p>
        </div>

        <div className="space-y-6">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6">

            <div className="relative group">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-200">

                <img
                  src={
                    profileData.profile_image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profileData.full_name || "User"
                    )}`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {profileData.full_name || "Worker"}
              </h2>

              <p className="text-slate-500 text-sm mb-4">
                {profileData.title || "Professional Worker"}
              </p>

              <input
                type="text"
                name="profile_image"
                value={profileData.profile_image}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="w-full max-w-md px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm"
              />
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">

            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Professional Title
                </label>

                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    name="title"
                    value={profileData.title}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Years of Experience
                </label>

                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="number"
                    name="experience_years"
                    value={profileData.experience_years}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700"
                  />
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hourly Rate
                </label>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="number"
                    name="hourly_rate"
                    value={profileData.hourly_rate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                    KSh
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    value={profileData.location}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl outline-none text-slate-500"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">

            <h3 className="text-lg font-bold text-slate-900 mb-6">
              About You
            </h3>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Professional Biography
            </label>

            <textarea
              rows="5"
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-700 leading-relaxed resize-none"
            />
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">

            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Skills & Services
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {skill}

                  <button onClick={() => removeSkill(skill)}>
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

          {/* Buttons */}
          <div className="flex justify-end pt-4">

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-70 text-white font-bold rounded-xl shadow-sm transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;