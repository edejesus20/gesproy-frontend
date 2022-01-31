import { FacultyI } from "./faculty";
import { UniversityI } from "./university";

export interface HeadquarterI {
   id?: number;
   name: string;
   cordinatorInvestigation: string;
   UniversityId:number;
   University?:UniversityI
   Faculties?:FacultyI
}

export interface HeadquarterProgramI {
   id?: number;
   ProgramId:number;
   HeadquarterId:number;
   AdministrativeId:number;
}
export interface HeadquarterProgramTeacherI {
   id?: number;
   TeacherId:number;
   HeadquarterProgramId:number;
}
export interface HeadquarterProgramStudentI {
   id?: number;
   StudentId:number;
   HeadquarterProgramId:number;
}