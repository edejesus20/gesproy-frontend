
export interface PersonI {
    id?:number;
    name: string;
    surname: string;
    DocumentTypeId: string;
    identification: string;
    GenderId: string;
    UserId: number;
    address: string;
    phone: string;
    User?:{
      id?:number;
      username: string;
      email?:string;
      password?: string;
      fullName: string;
      Roles?:[
        {
          name:string
        }
      ]
  
    }
  }