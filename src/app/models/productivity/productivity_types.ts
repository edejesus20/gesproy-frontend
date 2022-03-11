import { ProductivityStepI } from "./productivity_step";

export interface ProductivityTypeI {
    id?: number;
    name: string;
    createdAt?:string
    ProductivitySteps?:ProductivityStepI[]
    
}
