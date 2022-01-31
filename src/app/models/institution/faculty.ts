import { AdministrativeI } from 'src/app/models/user/administrative';
import { HeadquarterI } from './headquarter';
import { UniversityI } from './university';
export interface FacultyI {
    id?: number;
    name: string;
    AdministrativeId: number;
    createdAt: string;
    updatedAt: string;
    Administrative?:AdministrativeI
    HeadquarterId:number
    Headquarter?:HeadquarterI
 }