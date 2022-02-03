import { TeacherI } from "../user/teacher";

export interface ScaleI {
    id?: number;
    name: string;
    createdAt?:string
    Teachers?:TeacherI[]
}