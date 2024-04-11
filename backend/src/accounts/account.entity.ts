import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('accounts')
export class AccountEntity {
    @PrimaryGeneratedColumn()
    accountId: number;

    @Column({unique: true})
    userId: string;

    @Column()
    name: string;

    @Column()
    password: string;
}