import { ProjetTypeI } from "./projet_type";

export interface ProjetI {
    id?:number;
    name: string;
    ProjetTypeId:number;
    ProjetType?:ProjetTypeI
}