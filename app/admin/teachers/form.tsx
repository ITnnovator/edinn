"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { createTeacher, updateTeacher } from "@/app/actions/teacher";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

// Types matching the Prisma model loosely
type TeacherFormData = {
  name: string;
  slug: string;
  role: string;
  email: string;
  bio: string;
  dob: string;
  education: string;
  experience: string;
  skills: { name: string; percentage: number; color: string }[];
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
};

export function TeacherForm({ teacher }: { teacher?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(teacher?.image || null);

  const { register, control, handleSubmit, formState: { errors } } = useForm<TeacherFormData>({
    defaultValues: {
      name: teacher?.name || "",
      slug: teacher?.slug || "",
      role: teacher?.role || "",
      email: teacher?.email || "",
      bio: teacher?.bio || "",
      dob: teacher?.dob || "",
      education: teacher?.education || "",
      experience: teacher?.experience || "",
      skills: teacher?.skills || [],
      socials: teacher?.socials || {},
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  const onSubmit = async (data: TeacherFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("role", data.role);
      formData.append("email", data.email);
      const sanitizedBio = data.bio.replace(/&nbsp;/g, ' ');
      console.log("Submitting Biography. Length:", sanitizedBio.length);
      formData.append("bio", sanitizedBio);
      formData.append("dob", data.dob);
      formData.append("education", data.education);
      formData.append("experience", data.experience);
      formData.append("skills", JSON.stringify(data.skills));
      formData.append("socials", JSON.stringify(data.socials));

      const imageInput = document.getElementById("image") as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append("image", imageInput.files[0]);
      }

      let result;
      if (teacher) {
        result = await updateTeacher(teacher.id, formData);
      } else {
        result = await createTeacher(formData);
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to save teacher");
      }

      toast.success("Teacher saved successfully!");
      router.refresh();
      router.push("/admin/teachers");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setPreview: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Replace spaces with hyphens, remove special chars, lowercase
    const val = e.target.value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // Manually set the value to enforce the format
    e.target.value = val;
    // Update react-hook-form state
    register("slug").onChange(e);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto pb-20 font-sans">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2B3674] mb-1">
            {teacher ? `Edit Profile` : "New Teacher"}
          </h1>
          <p className="text-[#A3AED0] font-medium text-sm">
            {teacher ? `Update details for ${teacher.name}` : "Create a new teacher profile to add to the roster."}
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border ${teacher ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
          {teacher ? 'Editing Mode' : 'Creation Mode'}
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic Info Card */}
        <section className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.02)] overflow-hidden mb-6">
          <div className="p-6 border-b border-[#F4F7FE] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#868CFF] to-[#4318FF] text-white flex items-center justify-center shadow-lg shadow-[#4318FF]/20">
              <i className="fas fa-user text-sm"></i>
            </div>
            <h3 className="text-lg font-bold text-[#2B3674]">Basic Information</h3>
          </div>

          <div className="!p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">Full Name <span className="text-red-500">*</span></label>
              <input
                {...register("name", { required: true })}
                className="w-full !h-12 !px-4 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-slate-400 font-semibold text-slate-700"
                placeholder="e.g. Sir Gohar"
              />
              {errors.name && <span className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1"><i className="fas fa-circle-exclamation"></i> Required</span>}
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">Slug <span className="text-red-500">*</span> <span className="text-[10px] text-slate-400 font-normal lowercase">(unique-url-identifier)</span></label>
              <input
                {...register("slug", { required: true })}
                onChange={(e) => {
                  handleSlugChange(e);
                }}
                className="w-full !h-12 !px-4 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-slate-400 font-semibold text-slate-700 font-mono text-sm"
                placeholder="e.g. sir-gohar"
              />
              {errors.slug && <span className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1"><i className="fas fa-circle-exclamation"></i> Required</span>}
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">Role <span className="text-red-500">*</span></label>
              <input
                {...register("role", { required: true })}
                className="w-full !h-12 !px-4 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-slate-400 font-semibold text-slate-700"
                placeholder="e.g. Mathematics Teacher"
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">Email</label>
              <input
                {...register("email")}
                className="w-full !h-12 !px-4 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-slate-400 font-semibold text-slate-700"
                placeholder="email@example.com"
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">Date of Birth</label>
              <Controller
                control={control}
                name="dob"
                render={({ field }) => (
                  <div className="date-picker-wrapper w-full relative">
                    <DatePicker
                      selected={field.value ? parse(field.value, "d MMM yyyy", new Date()) : null}
                      onChange={(date) => field.onChange(date ? format(date, "d MMM yyyy") : "")}
                      dateFormat="d MMM yyyy"
                      placeholderText="Select date of birth"
                      className="w-full !h-12 !px-4 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-slate-400 font-semibold text-slate-700"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">Qualification</label>
              <input
                {...register("education")}
                className="w-full !h-12 !px-4 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-slate-400 font-semibold text-slate-700"
                placeholder="e.g. MSc Mathematics"
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">Experience</label>
              <input
                {...register("experience")}
                className="w-full !h-12 !px-4 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-slate-400 font-semibold text-slate-700"
                placeholder="e.g. 8 Years"
              />
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">Biography</label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </section>

        {/* Profile Image Card */}
        <section className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.02)] overflow-hidden mb-6">
          <div className="p-6 border-b border-[#F4F7FE] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3399ff] to-[#0055cc] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-image text-sm"></i>
            </div>
            <h3 className="text-lg font-bold text-[#2B3674]">Profile Image</h3>
          </div>

          <div className="!p-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative group/image">
                <div className="w-40 h-40 rounded-[2rem] overflow-hidden shadow-xl ring-4 ring-white relative bg-slate-100">
                  {imagePreview ? (
                    <Image src={imagePreview as string} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <i className="fas fa-user text-5xl"></i>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left w-full border-2 border-dashed border-slate-200 rounded-2xl !p-8 hover:border-violet-500/50 hover:bg-violet-50/30 transition-all duration-300">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3">
                    <i className="fas fa-cloud-upload-alt text-xl"></i>
                  </div>
                  <h4 className="text-slate-800 font-bold mb-1">Upload New Photo</h4>
                  <p className="text-slate-500 text-sm">Supports JPG, PNG or GIF. Max 5MB.</p>
                </div>

                <div className="relative inline-block">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setImagePreview)}
                    className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <button type="button" className="!px-6 !py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg shadow-sm hover:bg-slate-50 transition-all peer-hover:border-violet-300 peer-hover:text-violet-700">
                    Select File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Card */}
        <section className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.02)] overflow-hidden mb-6">
          <div className="p-6 border-b border-[#F4F7FE] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white flex items-center justify-center shadow-lg shadow-green-600/20">
                <i className="fas fa-graduation-cap text-sm"></i>
              </div>
              <h3 className="text-lg font-bold text-[#2B3674]">Professional Skills</h3>
            </div>

            <button
              type="button"
              onClick={() => append({ name: "", percentage: 80, color: "" })}
              className="flex items-center gap-2 bg-[#2B3674] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1A2044] transition-all shadow-lg shadow-[#2B3674]/20 active:scale-95"
            >
              <i className="fas fa-plus"></i>
              <span>Add Skill</span>
            </button>
          </div>

          <div className="!p-8">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="group relative bg-slate-50/50 !p-4 rounded-xl border border-slate-200/60 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="w-full md:flex-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block ml-1">Skill Name</label>
                      <input
                        {...register(`skills.${index}.name` as const)}
                        className="w-full !h-11 !px-4 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-semibold text-slate-700"
                        placeholder="e.g. Communication"
                      />
                    </div>
                    <div className="w-full md:w-32">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block ml-1">Score %</label>
                      <div className="relative">
                        <input
                          type="number"
                          {...register(`skills.${index}.percentage` as const)}
                          className="w-full !h-11 !pl-4 !pr-8 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm font-semibold text-slate-700"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
                      </div>
                    </div>
                    <div className="w-full md:w-auto self-end">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove Skill"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {fields.length === 0 && (
                <div className="text-center py-12 rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/30">
                  <i className="fas fa-layer-group text-3xl text-slate-200 mb-3"></i>
                  <p className="text-slate-500 font-medium">No skills added</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Socials Card */}
        <section className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.02)] overflow-hidden mb-6">
          <div className="p-6 border-b border-[#F4F7FE] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9800] to-[#F57C00] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
              <i className="fas fa-share-nodes text-sm"></i>
            </div>
            <h3 className="text-lg font-bold text-[#2B3674]">Social Profiles</h3>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {['facebook', 'linkedin', 'instagram', 'twitter'].map((platform) => {
                const config: any = {
                  facebook: { color: 'text-blue-600', bg: 'bg-blue-50', icon: 'facebook-f' },
                  linkedin: { color: 'text-blue-700', bg: 'bg-blue-50', icon: 'linkedin-in' },
                  instagram: { color: 'text-pink-600', bg: 'bg-pink-50', icon: 'instagram' },
                  twitter: { color: 'text-sky-500', bg: 'bg-sky-50', icon: 'twitter' }
                };
                const style = config[platform];

                return (
                  <div key={platform} className="relative">
                    <label className="capitalize block text-xs font-bold text-[#A3AED0] mb-2.5 ml-1 tracking-wide">{platform} URL</label>
                    <div className="relative">
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg ${style.bg} ${style.color} flex items-center justify-center`}>
                        <i className={`fab fa-${style.icon}`}></i>
                      </div>
                      <input
                        {...register(`socials.${platform}` as any)}
                        className="w-full h-14 pl-14 pr-5 border border-[#E0E5F2] rounded-xl bg-white focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-all duration-200 outline-none placeholder:text-[#A3AED0] font-semibold text-[#2B3674]"
                        placeholder={`https://${platform}.com/...`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4 mt-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full md:w-auto px-8 py-4 rounded-xl text-[#A3AED0] font-bold hover:bg-[#F4F7FE] hover:text-[#2B3674] transition-all text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-gradient-to-r from-[#4318FF] to-[#868CFF] text-white px-10 py-4 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#4318FF]/30 hover:translate-y-[-2px] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <i className="fas fa-check-circle"></i>
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
      <style jsx global>{`
        .date-picker-wrapper .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker {
          font-family: inherit;
          border-radius: 16px;
          border: 1px solid #E0E5F2;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .react-datepicker__header {
          background: linear-gradient(135deg, #868CFF 0%, #4318FF 100%);
          border-bottom: none;
          padding-top: 15px;
        }
        .react-datepicker__current-month, 
        .react-datepicker__day-name, 
        .react-datepicker-time__header {
          color: white !important;
        }
        .react-datepicker__day--selected, 
        .react-datepicker__day--keyboard-selected {
          background-color: #4318FF !important;
          border-radius: 8px;
        }
        .react-datepicker__day:hover {
          border-radius: 8px;
          background-color: #F4F7FE;
        }
        .react-datepicker__navigation-icon::before {
          border-color: white;
        }
      `}</style>
    </form>
  );
}
