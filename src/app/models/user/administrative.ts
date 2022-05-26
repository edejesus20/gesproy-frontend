import { UserI } from 'src/app/models/authorization/usr_User';
import { FacultyI } from '../institution/faculty';
import { HeadquarterI, HeadquarterProgramI } from '../institution/headquarter';
import { ChargeI } from './charge';
export interface AdministrativeI {
    id?:number
    UserId: number;
    // ChargeId: string;
    HeadquarterId:string
    Charges?:ChargeI[]
    User?:UserI,
    Headquarter?:HeadquarterI
    Faculties?:FacultyI[]
    HeadquarterPrograms?:HeadquarterProgramI[]
    ChargeAdministratives?:ChargeAdministrativeI[]
}
export interface ChargeAdministrativeI {
    id?:number
    date:string
    ChargeId: number
    AdministrativeId: number
    Charge?:ChargeI
    Administrative?:AdministrativeI
    status?:boolean
    HeadquarterPrograms?:HeadquarterProgramI[]
}
