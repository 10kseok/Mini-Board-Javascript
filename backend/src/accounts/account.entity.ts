import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('accounts')
export class AccountEntity {
    @PrimaryGeneratedColumn()
    accountId: number;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column()
    password: string;
}