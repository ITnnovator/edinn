
import { getTeachers } from "@/app/actions/teacher";
import Link from "next/link";
import Image from "next/image";
import { DeleteTeacherButton } from "./DeleteTeacherButton";
import { Teacher, Skill, Social } from "@prisma/client";

type TeacherWithRelations = Teacher & {
  skills: Skill[];
  socials: Social | null;
};

export default async function TeachersPage() {
  const { success, data } = await getTeachers();

  if (!success || !data) {
    return <div>Failed to load teachers</div>;
  }

  const teachers = data as TeacherWithRelations[];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center !mb-6">
        <h1 className="text-2xl font-bold text-[#2B3674]">Teachers</h1>
        <Link 
            href="/admin/teachers/new" 
            className="bg-black !text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          + Add New Teacher
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-[20px] shadow-sm relative group overflow-hidden">
             
             {/* Delete Button (Top Right) */}
             <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <DeleteTeacherButton id={teacher.id} />
             </div>

            <div className="aspect-[4/3] relative bg-gray-100">
               {teacher.image ? (
                   <Image 
                     src={teacher.image} 
                     alt={teacher.name} 
                     fill 
                     className="object-cover"
                   />
               ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400">
                       <i className="fas fa-user text-4xl"></i>
                   </div>
               )}
            </div>

            <div className="flex justify-between items-start !p-6">
               <div>
                  <h3 className="text-lg font-bold text-[#2B3674]">{teacher.name}</h3>
                  <p className="text-sm text-[#A3AED0]">{teacher.role}</p>
               </div>
               <Link href={`/admin/teachers/${teacher.id}`} className="text-[#4318FF] hover:bg-gray-100 !p-3 rounded-lg">
                  <i className="fas fa-edit"></i>
               </Link>
            </div>
          </div>
        ))}
        
        {teachers.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
                No teachers found. Click "Add New Teacher" to create one.
            </div>
        )}
      </div>
    </div>
  );
}
