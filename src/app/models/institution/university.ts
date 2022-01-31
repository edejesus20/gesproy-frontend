import { FacultyI } from "./faculty";

export interface UniversityI {
    id?: number;
    name: string;
    nit: string;
    addres: string;
    createdAt?:string
    Faculties?:FacultyI[]
}