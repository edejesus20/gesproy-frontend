import { UserI } from 'src/app/models/authorization/usr_User';
import { FacultyI } from '../institution/faculty';
import { HeadquarterI } from '../institution/headquarter';
import { ChargeI } from './charge';
export interface AdministrativeI {
    id?:number
    UserId: number;
    ChargeId: string;
    HeadquarterId:string
    Charge?:ChargeI
    User?:UserI,
    Headquarter?:HeadquarterI
    Faculties?:FacultyI[]
}