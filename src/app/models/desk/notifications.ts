import { RoleI } from "../authorization/usr_roles";
import { UserRoleI } from "../authorization/usr_User";

export interface NotificationI {
    id?: number;
    date_firt?: string
    date_end?: string
    title: string;
    description: string;
    UserId: number
    status_notification?: string;
    status?: boolean;
}

export interface RecipientI{
    id?: number;
    UserId:number
    NotificationId: number
    status_recipients: string;
}
export interface RoleNotificationI{
    id?: number;
    RoleId:number
    NotificationId: number
}
