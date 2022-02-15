import { AdministrativeI } from "./administrative";

export interface OcupationI {
    id?:number;
    name: string;
    Administratives?:AdministrativeI[]
}