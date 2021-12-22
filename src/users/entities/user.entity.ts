import { Exclude } from "class-transformer"
import Product from "src/products/entities/products.entity"
import Review from "src/reviews/entities/review.entity"
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

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

    @OneToOne(() => Product, Product => Product.user)
    product: Product

    @OneToMany(() => Review, review => review.user)
    reviews: Review[]
}

export default User