
import { getTeacherById } from "@/app/actions/teacher";
import { TeacherForm } from "../form";
import { notFound } from "next/navigation";

export default async function EditTeacherPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { success, data: teacher } = await getTeacherById(id);

  if (!success || !teacher) {
    notFound();
  }

  // Pre-process socials if needed (prisma returns it as array if 1-many or object if 1-1, check schema)
  // Schema: socials Social? (1-to-1 optional)
  // So teacher.socials is an object.
  // We might need to ensure structure matches form expectations if flat or nested.
  // Form expects: socials: { facebook, ... }
  // Prisma returns object with id, teacherId, facebook, ... - this is compatible-ish, but let's clean it.

  const formattedTeacher = {
      ...teacher,
      socials: teacher.socials || {}
  };

  return (
    <>
      <TeacherForm teacher={formattedTeacher} />
    </>
  );
}
