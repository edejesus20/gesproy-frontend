import { AdministrativeI } from 'src/app/models/user/administrative';
import { UniversityI } from './university';
export interface FacultyI {
    id?: number;
    name: string;
    AdministrativeId: number;
    UniversityId: number;
    createdAt: string;
    updatedAt: string;
    Administrative?:AdministrativeI
    University?:UniversityI;
 }