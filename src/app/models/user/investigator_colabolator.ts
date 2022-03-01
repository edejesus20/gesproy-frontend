import { UserI } from "../authorization/usr_User";

export interface InvestigatorCollaboratorI {
    id?:number;
    UserId: number;
    User?:UserI
}