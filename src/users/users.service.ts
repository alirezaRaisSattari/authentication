import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    private users: UserDto[] = [
        {
            id: 'a',
            email: "a@gmail.com",
            password: 'aaaa1111',
            balance: '1',
        },
        {
            id: 'b',
            email: "b@gmail.com",
            password: 'bbbb2222',
            balance: '2',
        },
    ];

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
    createUser(user: UserDto): void {
        let exist = this.findOne(user.email)
        this.users.push(user)
        console.log(this.users)
    }
}