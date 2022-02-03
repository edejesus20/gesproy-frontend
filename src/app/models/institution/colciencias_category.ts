import { TeacherI } from "../user/teacher";

export interface ColcienciaCategoryI {
    id?: number;
    name: string;
    createdAt?:string
    Teachers?:TeacherI[]
}