import { RoleI } from "../authorization/usr_roles";
import { DocumentTypeI } from "./document_types";
import { GenderI } from "./gender";

export interface PersonI {
    id?:number;
    name: string;
    surname: string;
    DocumentTypeId: string;
    identification: string;
    GenderId?: string;
    UserId: number;
    address?: string;
    phone?: string;
    Gender?:GenderI;
    DocumentType?:DocumentTypeI;
    User?:{
      id?:number;
      username: string;
      email?:string;
      password?: string;
      fullName: string;
      Roles?:RoleI[]
  avatar?:string
    }
    nationality?: string;
    date_of_birth?: string;
  }