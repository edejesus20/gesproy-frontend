import { GroupI } from './group';
export interface CategoryI {
    id?: number;
    name: string;
}

export interface CategoryGroupI {
    id?: number;
    name: string;
    date: string;
    GroupId: number;
    Group?:GroupI
}
