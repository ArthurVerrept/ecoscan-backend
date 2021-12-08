import Review from "src/reviews/entities/reviews.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ default: false })
    isCreatedWithGoogle: boolean

    @OneToMany(() => Review, review => review.user)
    reviews: Review[]
}

export default User