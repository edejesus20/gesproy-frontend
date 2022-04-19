import { TeacherI } from "../user/teacher";

export interface SeedbedI {
    id?: number;
    name: string;
    TeacherId:number
    Teacher?:TeacherI
    SeedbedStudent?:SeedbedStudentI
}

export interface SeedbedStudentI {
    id?: number;
    name: string;
    date_firt: string;
    date_end: string;
}