import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class User {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ default: false })
    createdWithGoogle: boolean
}

export default User