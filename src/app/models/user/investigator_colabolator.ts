import { UserI } from "../authorization/usr_User";
import { GroupI } from "../institution/group";
import { GroupInvestigatorCollaboratorI } from "../institution/roles_investigation";

export interface InvestigatorCollaboratorI {
    id?:number;
    UserId: number;
    User?:UserI
    Groups?:GroupI[]
    GroupInvestigatorCollaborators?:GroupInvestigatorCollaboratorI[]
}