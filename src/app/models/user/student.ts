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
}