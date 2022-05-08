import { UserI } from "../authorization/usr_User";
import { MincienciaCategoryI } from "../institution/colciencias_category";
import { GroupI } from "../institution/group";
import { HeadquarterProgramI, HeadquarterProgramTeacherI } from "../institution/headquarter";
import { ScaleI } from "../institution/scale";
import { SeedbedI } from "../institution/seedbed";
import { TrainingI, TrainingTeacherI } from "../institution/training";
import { LineI } from "../projet/line";

export interface TeacherI {
    id?:number
    UserId: number;
    ScaleId: number;
    MincienciaCategoryId: number;
    hours_of_dedication:string;
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

    // LinesG?:any[]
    // LinesS?:any[]
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
}
