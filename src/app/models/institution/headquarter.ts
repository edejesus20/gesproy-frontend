import { AdministrativeI } from "../user/administrative";
import { FacultyI } from "./faculty";
import { ProgramI } from "./program";
import { UniversityI } from "./university";

export interface HeadquarterI {
   id?: number;
   name: string;
   cordinatorInvestigation: string;
   UniversityId:number;
   createdAt?:string;
   University?:UniversityI
   Programs?:ProgramI[]
   Administratives?:AdministrativeI[]
   HeadquarterProgram?:HeadquarterProgramI

}

export interface HeadquarterProgramI {
   id?: number;
   ProgramId:number;
   HeadquarterId:number;
   AdministrativeId:number;
   Programs?:ProgramI[]
   Headquarters?:HeadquarterI[]
   Administratives?:AdministrativeI[]
   HeadquarterProgramTeacher?:HeadquarterProgramTeacherI
   HeadquarterProgramStudent?:HeadquarterProgramStudentI
   Administrative?:AdministrativeI
}
export interface HeadquarterProgramTeacherI {
   id?: number;
   TeacherId:number;
   HeadquarterProgramId:number;
   RelationshipId:number,

}
export interface HeadquarterProgramStudentI {
   id?: number;
   StudentId:number;
   HeadquarterProgramId:number;
}