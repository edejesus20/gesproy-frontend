import { DocumentTypeI } from "../user/document_types";
import { GenderI } from "../user/gender";

export interface UserI {
  id?:number;
  username: string;
  email: string;
  fullName: string;
  password?: string;
  Roles?:[
    {
      name:string
    }
  ]
  Person?:{
    name: string;
    surname?: string;
    DocumentTypeId?: string;
    identification: string;
    GenderId?: string;
    UserId?: number;
    address?: string;
    phone?: string;
    DocumentType?:DocumentTypeI;
    Gender?:GenderI;
  }
}



export interface UserLoginI {
  username: string;
  password: string;
}


export interface UserLoginResponseI {
  user:  UsernameI;
  token: string;
  // menu:{
  //   mainSesion:MenuResponseI[]
  // }
}

export interface MenuResponseI {
  id:       number;
  id_padre: number;
  icono:    string;
  link:     string;
  titulo:   string;
}

export interface UsernameI {
  username: string;
  id: number;
}