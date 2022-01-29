export interface InstitutionI{
    id?: number;
    name: string;
    nit: number;
}

export interface InstitutionDetailI {
    id?: number;
    name: string;
    image: string;
    description: string;
    institutionId: number;
    Institution?:{ name:string; nit: number;}
}