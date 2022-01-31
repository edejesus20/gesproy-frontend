import { UserI } from 'src/app/models/authorization/usr_User';
import { HeadquarterI } from '../institution/headquarter';
import { OcupationI } from './ocupation';
export interface AdministrativeI {
    id?:number
    UserId: number;
    OcupationId: string;
    HeadquarterId:string
    Ocupation?:OcupationI
    User?:UserI,
    Headquarter?:HeadquarterI
    
}