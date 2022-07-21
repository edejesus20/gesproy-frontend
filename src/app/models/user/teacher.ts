import { UserI } from "../authorization/usr_User";
import { MincienciaCategoryI } from "../institution/colciencias_category";
import { GroupI, GroupTeacherLineI,
    //  GroupLineTeacherI 
    } from "../institution/group";
import { HeadquarterProgramI, HeadquarterProgramTeacherI } from "../institution/headquarter";
import { LineProgramGroupTeacherI } from "../institution/program";
import { ScaleI } from "../institution/scale";
import { SeedbedI } from "../institution/seedbed";
import { TrainingI, TrainingTeacherI } from "../institution/training";
import { LineI } from "../projet/line";
// import { ProjetTeacherI } from "../projet/projet-teacher";

export interface TeacherI {
    id?:number
    UserId: number;
    ScaleId?: number;
    MincienciaCategoryId: string;

    Link_cvlac?: string;
    Link_orcid?: string;

    // hours_of_dedication:string;
    User?:UserI
    Scale?:ScaleI
    Group?:GroupI
    
    MincienciaCategory?:MincienciaCategoryI,
    TrainingTeacher?:TrainingTeacherI[]
    Seedbeds?:SeedbedI[]
    Seedbed?:SeedbedI
    Lines?:LineI[]
    Trainings?:TrainingI[]
    headquarterProgramTeacher?:HeadquarterProgramTeacherI[]
    HeadquarterPrograms?:HeadquarterProgramI[]
    ChargeBondingId:number,
    Charge_bonding?:Charge_bondingI
    trainingTeacher?:TrainingTeacherI[],
    Workexperiences?:WorkexperienceI[]
    HeadquarterProgramTeachers?:HeadquarterProgramTeacherI[]
    // ProjetTeachers?:ProjetTeacherI[]
    TrainingTeachers?:TrainingTeacherI[],
    LineProgramGroupTeachers?:LineProgramGroupTeacherI[],

    ChargebondingScaleTeachers?:ChargebondingScaleTeacherI[]

    // GroupLineTeachers?:GroupLineTeacherI[]
    Groups?:GroupI[]
    GroupTeachers?:GroupTeacherI[]
    // LinesS?:any[]
}
export interface GroupTeacherI {
    id?:number
    GroupId:number;
    RoleGroupTeacherId:number
    TeacherId:number;
    RoleGroupTeacher?:RoleGroupTeacherI
    Group?:GroupI
    Teacher?:TeacherI
    GroupTeacherLines?:GroupTeacherLineI[]
    status?:boolean

}
export interface RoleGroupTeacherI {
    id?:number
    name: string;
}
export interface AnexosTrainingTeacherI {
    id?:number
    TrainingTeacherId:number;
    AnexoId:number;
    UserId:number
    Anexo?:AnexosI
}
export interface AnexosI {
    id?:number
    name: string;
    url: string;
}
export interface ChargebondingScaleTeacherI {
    id?:number
    ChargebondingScaleId: number
    TeacherId: number
    Teacher?:TeacherI
    ChargebondingScale?:ChargebondingScaleI
    status?:boolean

}
export interface ChargebondingScaleI {
    id?:number
    ChargeBondingId: number
    ScaleId: number
    Charge_bonding?:Charge_bondingI
    Scale?:ScaleI
    ChargebondingScaleTeachers?:ChargebondingScaleTeacherI[]
    status?:boolean

}

export interface WorkexperienceI {
    id?: number;
    name_institution: string;
    position_type: string;
    functions:string
    TeacherId?:number;
    start_date:string
    final_date:string
    constancy?:string
    AnexosWorkexperiences?:AnexosWorkexperienceI[]
}

export interface AnexosWorkexperienceI {
    id?: number;
    WorkexperienceId:number;
    AnexoId:number;
    UserId:number
    Anexo?:AnexosI
}

export interface Charge_bondingI {
    id?: number;
    name: string;
    Teachers?:TeacherI[]
    createdAt?:string
    updatedAt?:string
    Scales?:any[]
    ChargebondingScales?:ChargebondingScaleI[]
    status?:boolean

}
