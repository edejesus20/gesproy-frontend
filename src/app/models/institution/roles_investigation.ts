import { LineProgramGroupTeacherI } from "./program";

export interface RoleInvestigationI {
    id?: number
    name: string;
    LineProgramGroupTeachers?:LineProgramGroupTeacherI[]
    GroupStudents?:GroupStudentI[]
    GroupInvestigatorCollaborators?:GroupInvestigatorCollaboratorI[]
    Users?:undefined | any[]
}

export interface GroupInvestigatorCollaboratorI {
    id?: number
    GroupId:number;
    RoleInvestigationId:number;
    InvestigatorCollaboratorId:number;
}

export interface GroupStudentI {
    id?: number
    GroupId:number;
    RoleInvestigationId:number
    StudentId:number;
}