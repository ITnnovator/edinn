"use client";

import React from "react";
// import Slider from "react-slick"; // Removed
import Image from "next/image";
import Link from "next/link";
// import "slick-carousel/slick/slick.css"; // Removed
// import "slick-carousel/slick/slick-theme.css"; // Removed

interface Teacher {
    id: string;
    slug: string;
    name: string;
    role: string | null;
    image: string | null;
    socials?: {
        facebook?: string | null;
        twitter?: string | null;
        linkedin?: string | null;
        instagram?: string | null;
    } | null;
}

interface TeachersSliderProps {
    teachers: Teacher[];
}

type ArrowProps = {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function TeachersSlider({ teachers }: TeachersSliderProps) {
    return (
        <div className="teachers-slider-container pb-10 px-4">
            <div className="row teachers-carousel">
                {teachers.map((teacher) => (
                    <div key={teacher.id} className="col-lg-12">
                        <div className="teacher px-2">
                            <div className="teacher-img">
                                <Image
                                    src={teacher.image || "/webImages/tech1.jpg"}
                                    alt={teacher.name}
                                    width={300}
                                    height={405}
                                    className="w-100"
                                    style={{ height: "405px", objectFit: "cover" }}
                                />

                                <div className="sc-div">
                                    <ul>
                                        {teacher.socials?.instagram ? (
                                            <li>
                                                <a
                                                    href={teacher.socials.instagram}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label="Instagram"
                                                >
                                                    <i className="fab fa-instagram" />
                                                </a>
                                            </li>
                                        ) : null}

                                        {teacher.socials?.linkedin ? (
                                            <li>
                                                <a
                                                    href={teacher.socials.linkedin}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label="LinkedIn"
                                                >
                                                    <i className="fab fa-linkedin-in" />
                                                </a>
                                            </li>
                                        ) : null}

                                        {teacher.socials?.facebook ? (
                                            <li>
                                                <a
                                                    href={teacher.socials.facebook}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label="Facebook"
                                                >
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                        ) : null}

                                        {teacher.socials?.twitter ? (
                                            <li>
                                                <a
                                                    href={teacher.socials.twitter}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label="Twitter / X"
                                                >
                                                    <i className="fab fa-twitter" />
                                                </a>
                                            </li>
                                        ) : null}
                                    </ul>

                                    <span>
                                        <Image src="/webImages/plus.png" alt="plus" width={20} height={20} />
                                    </span>
                                </div>
                            </div>

                            <div className="teacher-info p-3">
                                <h3>
                                    <Link href={`/teachers/${teacher.slug}`} title={teacher.name}>
                                        {teacher.name}
                                    </Link>
                                </h3>
                                <span>{teacher.role ?? ""}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
