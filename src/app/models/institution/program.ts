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
   LinePrograms?:LineProgramI[]
   HeadquarterPrograms?:HeadquarterProgramI[]

}

export interface LineProgramI {
   id?: number;
   LineId:number;
   ProgramId:number;
   Program?:ProgramI
   Line?: LineI
}

export interface LineProgramGroupI {
   id?: number;
   LineProgramId:number;
   GroupId:number;
   LineProgram?:LineProgramI
}
export interface LineProgramGroupTeacherI {
   id?: number;
   LineProgramGroupId:number;
   TeacherId:number;
}
