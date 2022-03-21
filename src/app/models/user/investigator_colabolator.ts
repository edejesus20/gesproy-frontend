import { UserI } from "../authorization/usr_User";
import { GroupI } from "../institution/group";

export interface InvestigatorCollaboratorI {
    id?:number;
    UserId: number;
    User?:UserI
    Groups?:GroupI[]
}