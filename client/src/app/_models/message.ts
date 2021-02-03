import { User } from "./user";

export interface Message{
    message: string;
    type: string;
    reply: boolean;
    date: Date;
    user: User;
}