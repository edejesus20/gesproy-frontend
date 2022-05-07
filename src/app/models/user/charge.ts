import { AdministrativeI } from "./administrative";



export interface ChargeI {
    id?:number;
    name: string;
    Administratives?:AdministrativeI[]
}