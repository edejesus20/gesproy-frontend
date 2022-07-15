import { LineProgramI, ProgramI } from "../institution/program";

// export interface LineI {
//     id?:number;
//     name: string;
//     justification: string;
//     objectives: string;
//     // thematics: string;
//     resolution?: string;
//     
//    
// }

export interface LineI {
    id?:number;
    name: string;
    Anexo?: string;
    // justification?: string;
    // objectives: string;
    // thematics: string;
    LinePrograms?:LineProgramI[]
    LineThematics?:LineThematicI[]
    Thematics?:ThematicI[]
    Programs?:ProgramI[]
    LineDetailId?: string;
    LineDetail?: LineDetailI
}
export interface LineDetailI {
    id?:number;
    resolution?: string;
    justification?: string;
    objectives: string;
    // thematics: string;
}

export interface LineThematicI {
    id?:number;
    LineId:number;
    ThematicId:number;
    Thematic?:ThematicI
    status?:boolean

}

export interface ThematicI {
    id?:number;
    name: string;
    Lines?:LineI[]
    LineThematic?:LineThematicI
    Thematics?:ThematicI[]
    // Thematics?:ThematicI[]
    Thematic_axes?:Thematic_axisI[] | undefined
    Thematic_axis_Thematics?:Thematic_axis_ThematicI[]
    status?:boolean


}
export interface Thematic_axisI {
    id?:number;
    name: string;
    Thematic_axis_Thematic?:Thematic_axis_ThematicI
    Thematics?:ThematicI[]
    status?:boolean
}

export interface Thematic_axis_ThematicI {
    ThematicAxisId:number;
    ThematicId:number;
    Thematic_axis?:Thematic_axisI
    Thematic?:ThematicI
    status?:boolean

}
