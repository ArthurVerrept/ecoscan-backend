import Review from "src/reviews/entities/review.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ unique: true })
    email: string

    @Column({ default: false })
    isCreatedWithGoogle: boolean

    @Column({ nullable: true })
    googleRefreshToken?: string

    @Column({ nullable: true })
    currentRefreshToken?: string

    @OneToMany(() => Review, review => review.user)
    reviews: Review[]
}

export default User