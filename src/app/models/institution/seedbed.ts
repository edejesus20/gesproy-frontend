export interface SeedbedI {
    id?: number;
    name: string;
    SeedbedStudent?:SeedbedStudentI
}

export interface SeedbedStudentI {
    id?: number;
    name: string;
    date_firt: string;
    date_end: string;
}