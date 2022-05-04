import { ProgramI } from "../institution/program";

export interface LineI {
    id?:number;
    name: string;
    justification: string;
    objectives: string;
    // thematics: string;
    resolution?: string;
    Thematics?:ThematicI[]
    Programs?:ProgramI[]
}
export interface LineThematicI {
    id?:number;
    LineId:number;
    ThematicId:number;
}

export interface ThematicI {
    id?:number;
    name: string;
    Lines?:LineI[]
    LineThematic?:LineThematicI
}
