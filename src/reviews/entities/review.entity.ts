import { Exclude } from "class-transformer"
import Product from "src/products/entities/products.entity"
import User from "src/users/entities/user.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Review {
    @Exclude()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    sustainability: number

    @Column()
    quality: number

    // there a many reviews to one user
    // on delete set the user_id to null since we want to keep their data
    @ManyToOne(() => User, user => user.reviews, { onDelete:'SET NULL' })
    user: User

    @ManyToOne(() => Product, product => product.reviews, { onDelete:'CASCADE' })
    product: Product
}

export default Review