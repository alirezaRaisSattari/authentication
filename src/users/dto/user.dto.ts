import { IsString, Matches, MaxLength, MinDate, MinLength } from "class-validator";

export class UserDto {
    id: string;
    email: string;
    password: string;
    balance: number | string | null;
}