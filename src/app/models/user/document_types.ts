import { PersonI } from "./person";

export interface DocumentTypeI {
    id?: number;
    name: string;
    People?:PersonI[]
}