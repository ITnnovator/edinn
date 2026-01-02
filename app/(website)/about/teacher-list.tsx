
import { getTeachers } from "@/app/actions/teacher";
import Link from "next/link";
import Image from "next/image";

export async function TeacherList() {
  const { success, data: teachers } = await getTeachers();

  if (!success || !teachers) return null;

  return (
    <>
      {teachers.map((teacher: any) => (
        <div key={teacher.id} className="col-lg-3 col-md-3 col-sm-6 col-6 full-wdth mb-4">
          <div className="teacher">
            <div className="teacher-img">
              <Image 
                src={teacher.image || '/webImages/tech1.jpg'} 
                alt={teacher.name} 
                width={300} 
                height={405} 
                className="w-100"
                style={{ height: '405px', objectFit: 'cover' }}
              />
              <div className="sc-div">
                <ul>
                  {teacher.socials?.instagram && <li><a href={teacher.socials.instagram}><i className="fab fa-instagram"></i></a></li>}
                  {teacher.socials?.linkedin && <li><a href={teacher.socials.linkedin}><i className="fab fa-linkedin-in"></i></a></li>}
                  {teacher.socials?.facebook && <li><a href={teacher.socials.facebook}><i className="fab fa-facebook-f"></i></a></li>}
                  {teacher.socials?.twitter && <li><a href={teacher.socials.twitter}><i className="fab fa-twitter"></i></a></li>}
                </ul>
                <span><Image src="/webImages/plus.png" alt="plus" width={20} height={20} /></span>
              </div>
            </div>
            <div className="teacher-info p-3">
              <h3>
                <Link href={`/teachers/${teacher.slug}`} title={teacher.name}>
                  {teacher.name}
                </Link>
              </h3>
              <span>{teacher.role}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
