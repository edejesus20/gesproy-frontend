import { CategoryI } from "./category";
import { FacultyI } from "./faculty";

export interface ProgramI {
   id?: number;
   name: string;
   FacultyId?:number;
   CategoryId?:number;
   Faculty?:FacultyI
   Category?:CategoryI
   createdAt?:string
}
