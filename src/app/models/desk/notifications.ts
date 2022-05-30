import { RoleI } from "../authorization/usr_roles";
import { UserI, UserRoleI } from "../authorization/usr_User";

export interface NotificationI {
    id?: number;
    date_firt: string
    date_end: string
    title: string;
    description: string;
    UserId: string
    status_notification?: string;
    status?: boolean;
    User?:UserI
    Users?:any[]
    Roles?:any[]
    Recipients?:RecipientI[]
}

export interface RecipientI{
    id?: number;
    UserId:number
    User?:UserI
    NotificationId: number
    status_recipients: string;
}
export interface RoleNotificationI{
    id?: number;
    RoleId:number
    NotificationId: number
}
