import { LineI } from "../projet/line";
import { AnexosI, TeacherI } from "../user/teacher";
import { CategoryGroupI } from "./category";
import { HeadquarterProgramI } from "./headquarter";
import { LineProgramGroupI, ProgramI } from "./program";
import { GroupInvestigatorCollaboratorI, GroupStudentI, RoleInvestigationI } from "./roles_investigation";
import { SeedbedI } from "./seedbed";

export interface GroupI {
    id?: number;
    name: string;
    ident_colciencias?:string
    HeadquarterProgramId:number
    TeacherId:number
    group_code:string
    ObjetivoGeneral: string;
    ObjetivosEspecificos?: string;
    Mision?: string;
    Vision?: string
    Perfil?:string
    Metas?:string
    Resultados?: string
    Sector?: string
    resolution:string
    CategoryGroupId:number
    Link_gruplac:string

    InvestigatorCollaborators?:any[]
    lines?:any[]
    knowledge_areas?:any[] | Knowledge_areaI[]
    GroupKnowledge_areas?:GroupKnowledge_areaI[]
    Seedbeds?:any[]
    Anexos?:any[]
    AnexosGroups?:AnexosGroupI[]
    
    LineProgramGroups?:LineProgramGroupI[]
    CategoryGroup?:CategoryGroupI
    Teacher?:TeacherI
    HeadquarterProgram?:HeadquarterProgramI
    Program?:ProgramI,
    GroupInvestigatorCollaborators?:GroupInvestigatorCollaboratorI[],
    GroupStudents?:GroupStudentI[]
    GroupLines?:GroupLineI[]
    
    // LineProgramGroups?
}

export interface GroupLineI {
    id?: number;
    LineId:number;
    Line?:LineI;
    GroupId:number;
    GroupLineTeachers?:GroupLineTeacherI[]
    status?:boolean
}
export interface GroupLineSeedbedI {
    id?: number;
    GroupLineId:number;
    SeedbedId:number;
    status?:boolean
}


export interface GroupLineTeacherI {
    id?: number;
    GroupLineId:number;
    TeacherId:number;
    RoleInvestigationId:number;
    Teacher?:TeacherI
    RoleInvestigation?:RoleInvestigationI
    status?:boolean
}

export interface AnexosGroupI {
    id?: number;
    GroupId:number;
    AnexoId:number;
    Anexo?:AnexosI
    status?:boolean

}

export interface Knowledge_areaI{
    id?: number;
    name: string;
    Groups?:GroupI[]
}

export interface GroupKnowledge_areaI {
    id?: number;
    GroupId:number;
    Knowledge_areaId:number;
    Knowledge_area?:Knowledge_areaI
    status?:boolean
}
