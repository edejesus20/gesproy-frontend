import { StudentI } from "../user/student";
import { TeacherI } from "../user/teacher";
import { GroupI } from "./group";
import { HeadquarterProgramI } from "./headquarter";

export interface SeedbedI {
    id?: number;
    creation_date: string;
    approval_date?:string;
    name: string;
    TeacherId: number
    ObjetivoGeneral: string;
    ObjetivosEspecificos: string;
    Mision: string;
    Vision: string;
    estrategias: string;
    resolution:string
    HeadquarterProgramId: number
    GroupId: number
    article:string
    Teacher?:TeacherI
    SeedbedStudent?:SeedbedStudentI
    lines?:any[]
    Students?:StudentI[];
    Group?:GroupI
    HeadquarterProgram?:HeadquarterProgramI
    Program?:any
}

export interface SeedbedStudentI {
    id?: number;
    name: string;
    date_firt: string;
    date_end: string;
    hours:string
}