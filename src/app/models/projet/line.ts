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
    Thematics?:ThematicI[]
    Thematic_axes?:Thematic_axisI[] | undefined

}
export interface Thematic_axisI {
    id?:number;
    name: string;
    Thematic_axis_Thematic?:Thematic_axis_ThematicI
    Thematics?:ThematicI[]
}

export interface Thematic_axis_ThematicI {
    ThematicAxisId:number;
    ThematicId:number;
}
