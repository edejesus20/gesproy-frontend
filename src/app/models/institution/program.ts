import { CategoryI } from "./category";
import { FacultyI } from "./faculty";

export interface ProgramI {
   id?: number;
   name: string;
   FacultyId?:string
   CategoryId?:string;
   Faculty?:FacultyI
   Category?:CategoryI
}
