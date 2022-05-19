import { UserI } from "../authorization/usr_User";
import { MincienciaCategoryI } from "../institution/colciencias_category";
import { GroupI } from "../institution/group";
import { HeadquarterProgramI, HeadquarterProgramTeacherI } from "../institution/headquarter";
import { LineProgramGroupTeacherI } from "../institution/program";
import { ScaleI } from "../institution/scale";
import { SeedbedI } from "../institution/seedbed";
import { TrainingI, TrainingTeacherI } from "../institution/training";
import { LineI } from "../projet/line";
import { ProjetTeacherI } from "../projet/projet-teacher";

export interface TeacherI {
    id?:number
    UserId: number;
    ScaleId?: number;
    MincienciaCategoryId: number;
    // hours_of_dedication:string;
    User?:UserI
    Scale?:ScaleI
    Group?:GroupI
    Groups?:GroupI[]
    MincienciaCategory?:MincienciaCategoryI,
    TrainingTeacher?:TrainingTeacherI[]
    Seedbeds?:SeedbedI[]
    Lines?:LineI[]
    Trainings?:TrainingI[]
    headquarterProgramTeacher?:HeadquarterProgramTeacherI[]
    HeadquarterPrograms?:HeadquarterProgramI[]
    ChargeBondingId:number,
    Charge_bonding?:Charge_bondingI
    trainingTeacher?:TrainingTeacherI[],
    Workexperiences?:WorkexperienceI[]
    HeadquarterProgramTeachers?:HeadquarterProgramTeacherI[]
    ProjetTeachers?:ProjetTeacherI[]
    TrainingTeachers?:TrainingTeacherI[],
    LineProgramGroupTeachers?:LineProgramGroupTeacherI[],

    ChargebondingScaleTeachers?:ChargebondingScaleTeacherI[]

    // LinesG?:any[]
    // LinesS?:any[]
}

export interface ChargebondingScaleTeacherI {
    id?:number
    ChargebondingScaleId: number
    TeacherId: number
    Teacher?:TeacherI
    ChargebondingScale?:ChargebondingScaleI
}
export interface ChargebondingScaleI {
    id?:number
    ChargeBondingId: number
    ScaleId: number
    Charge_bonding?:Charge_bondingI
    Scale?:ScaleI

}

export interface WorkexperienceI {
    id?: number;
    name_institution: string;
    position_type: string;
    functions:string
    TeacherId?:number;
    start_date:string
    final_date:string
}

export interface Charge_bondingI {
    id?: number;
    name: string;
    Teachers?:TeacherI[]
    createdAt?:string
    updatedAt?:string
    Scales?:any[]
    ChargebondingScales?:ChargebondingScaleI[]
}
