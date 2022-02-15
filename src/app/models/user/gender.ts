import { PersonI } from "./person";

export interface GenderI {
    id?:number;
    name: string;
    People?:PersonI[]
}