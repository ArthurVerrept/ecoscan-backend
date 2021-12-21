import { Exclude } from "class-transformer"
import Review from "src/reviews/entities/review.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class User {
    @Exclude()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ unique: true })
    email: string

    @Exclude()
    @Column({ default: false })
    isCreatedWithGoogle: boolean

    @Exclude()
    @Column({ nullable: true })
    googleRefreshToken?: string

    @Exclude()
    @Column({ nullable: true })
    currentRefreshToken?: string

    @OneToMany(() => Review, review => review.user)
    reviews: Review[]
}

export default User