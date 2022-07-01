import { StudentI } from "../user/student";
import { TeacherI } from "../user/teacher";
import { GroupI, GroupLineSeedbedI } from "./group";
import { HeadquarterProgramI } from "./headquarter";

export interface SeedbedI {
    id?: number;
    creation_date: string;
    approval_date?:string;
    resolution?:string
    article?:string
    name: string;
    TeacherId: number
    ObjetivoGeneral: string;
    ObjetivosEspecificos: string;
    Mision: string;
    Vision: string;
    estrategias: string;

    HeadquarterProgramId: number
    GroupId: number
    
    Teacher?:TeacherI
    SeedbedStudent?:SeedbedStudentI
    lines?:any[]
    Students?:StudentI[];
    Group?:GroupI
    HeadquarterProgram?:HeadquarterProgramI
    Program?:any
    SeedbedStudents?:SeedbedStudentI[]

    GroupLineSeedbeds?:GroupLineSeedbedI[]

}

export interface SeedbedStudentI {
    id?: number;
    name: string;
    date_firt: string;
    date_end: string;
    hours:string
    Seedbed?:SeedbedI
    Student?:StudentI
}