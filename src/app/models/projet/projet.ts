import { UserI } from "../authorization/usr_User";
import { ProjetTypeI } from "./projet_type";
import { RoleResearchI } from "./roles_research";

// export interface ProjetI {
//     id?:number;
//     name: string;
//     ProjetTypeId:number;
//     ProjetType?:ProjetTypeI
// }

export interface ProjetI {
    id?:number;
    title: string;
    ProjetTypeId:number
    Anexo?:string
    GroupId: number
    DetailProjetId?: number
    HeadquarterProgramId: number
    ProjetType?:ProjetTypeI
    DetailProjet?:DetailProjetI
}

export interface DetailProjetI {
    id?:number;
    duration:string;
    place_of_execution:string;
    project_modality:string;
    Project_summary:string;
    keywords:string;
    problem_statement:string;
    problem_formulation:string;
    general_objetive:string;
    specific_objectives:string;
    justification:string;
    delimitation:string;
    theoretical_framework:string;
    investigation_background:string;
    theoretical_foundation:string;
    methodology:string;
    expected_impact:string;
    communication_strategy:string;
    timeline_of_activities:string;
    budget:string;
    bibliographical_references:string;
    identification_of_the_variables:string;

    ProjectModalityId: number;
    KindOfInvestigationId: number;

    ProjectModality?:ProjectModalityI
    Kind_of_Investigation?:Kind_of_InvestigationI
}

export interface Kind_of_InvestigationI {
    id?:number;
    name: string;
}

export interface ProjectModalityI {
    id?:number;
    name: string;
}

export interface Project_MembersI {
    ProjetId:number;
    UserId:number;
    TypeMemberId:number;
    RoleResearchId:number;
    hours:string

    TypeMember?:TypeMemberI
    RoleResearch?:RoleResearchI
    User?:UserI
    Projet?:ProjetI
}

export interface TypeMemberI {
    name: string;
}
