import { DocumentTypeI } from "../user/document_types";
import { GenderI } from "../user/gender";
import { PersonI } from "../user/person";

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
  Person?:PersonI
}



export interface UserLoginI {
  username: string;
  password: string;
}


export interface UserLoginResponseI {
  user:  UsernameI;
  token: string;
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