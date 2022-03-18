import { LineI } from "../projet/line";
import { CategoryI } from "./category";
import { FacultyI } from "./faculty";
import { HeadquarterI, HeadquarterProgramI } from "./headquarter";

export interface ProgramI {
   id?: number;
   name: string;
   FacultyId?:number;
   CategoryId?:number;
   Faculty?:FacultyI
   Category?:CategoryI
   createdAt?:string
   Headquarters?:HeadquarterI[]
   HeadquarterProgram?:HeadquarterProgramI
   Lines?:LineI[]
}

export interface LineProgramI {
   id?: number;
   LineId:number;
   ProgramId:number;
}

export interface LineProgramGroupI {
   id?: number;
   LineProgramId:number;
   GroupId:number;
}
export interface LineProgramGroupTeacherI {
   id?: number;
   LineProgramGroupId:number;
   TeacherId:number;
}
