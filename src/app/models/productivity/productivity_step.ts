import { ProductivityTypeI } from "./productivity_types";

export interface ProductivityStepI {
    id?:number;
    name: string;
    description: string;
    responsable: string;
    level?: string;
    ProductivityTypeId:number;
    ProductivityType?:ProductivityTypeI
    
}