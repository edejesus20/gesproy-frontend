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
}
