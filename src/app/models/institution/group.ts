import { TeacherI } from "../user/teacher";
import { CategoryGroupI } from "./category";
import { LineProgramGroupI } from "./program";
import { SeedbedI } from "./seedbed";

export interface GroupI {
    id?: number;
    name: string;
    ident_colciencias:string
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
    LINK_GRUPLAC:string


    Seedbed?:any[]
    Anexos?:any[]
    InvestigatorCollaborators?:any[]
    lines?:any[]
    LineProgramGroups?:LineProgramGroupI
    CategoryGroup?:CategoryGroupI
    Teacher?:TeacherI
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
}
