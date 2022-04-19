import { UserI } from "../authorization/usr_User";
import { HeadquarterProgramI, HeadquarterProgramStudentI } from "../institution/headquarter";
import { SeedbedI } from "../institution/seedbed";

export interface StudentI {
    id?:number;
    UserId: number;
    User?:UserI
    Seedbeds?:SeedbedI[]
    headquarterProgramStudent?:HeadquarterProgramStudentI[]
    HeadquarterPrograms?:HeadquarterProgramI[]
    current_average?:string
    current_semester?:string
    experienciaInvestigativa:string,
    areasEstudio:string,
    publicacionesResientes:string,
    practicas:string
    status_seedbed?:string,
    StudentInternships?:StudentInternshipsI[]
    SeedbedId:number
}

export interface StudentInternshipsI {
    id?:number;
    name: string;
    start_date:string
    final_date:string
    name_institution: string;
    internship_certificate: string;
    practice_hours:string;
    area:string
    post:string
    functions:string
    StudentId:number;
}
