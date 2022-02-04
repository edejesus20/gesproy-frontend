import { UserI } from "../authorization/usr_User";
import { ColcienciaCategoryI } from "../institution/colciencias_category";
import { GroupI } from "../institution/group";
import { ScaleI } from "../institution/scale";
import { TrainingI, TrainingTeacherI } from "../institution/training";

export interface TeacherI {
    id?:number
    UserId: number;
    scaleId: number;
    colcienciasCategoryId: number;
    groupId: number;
    User?:UserI
    Scale?:ScaleI
    Group?:GroupI
    ColcienciaCategory?:ColcienciaCategoryI,
    TrainingTeacher?:TrainingTeacherI[]
    Trainings?:TrainingI[]
}
