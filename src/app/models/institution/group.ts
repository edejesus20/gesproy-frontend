import { LineProgramGroupI } from "./program";

export interface GroupI {
    id?: number;
    name: string;
    ident_colciencias:string
    HeadquarterProgramId:number
    TecaherId:number
    ObjetivoGeneral: string;
    ObjetivosEspecificos: string;
    Mision: string;
    Vision: string
    Perfil:string
    Metas:string
    Resultados: string
    Sector: string
    Seedbed?:any[]
    Anexos?:any[]
    InvestigatorCollaborators?:any[]
    lines?:any[]
    LineProgramGroups?:LineProgramGroupI
}