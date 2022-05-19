import { InvestigatorCollaboratorI } from "../user/investigator_colabolator";
import { StudentI } from "../user/student";
import { GroupI } from "./group";
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
    InvestigatorCollaborator?:InvestigatorCollaboratorI
    Group?:GroupI
}

export interface GroupStudentI {
    id?: number
    GroupId:number;
    RoleInvestigationId:number
    StudentId:number;
    Student?:StudentI
    Group?:GroupI

}