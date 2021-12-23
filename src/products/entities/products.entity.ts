import Brand from "src/brand/entities/brand.entity"
import Review from "src/reviews/entities/review.entity"
import User from "src/users/entities/user.entity"
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import ReviewAggregate from "src/reviewAggregate/entities/reviewAggregate.entity"
import { Exclude } from "class-transformer"

@Entity()
class Product {
    @Exclude()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    src: string

    @Column({ unique: true })
    productName: string

    @Column()
    img: string

    @Column({ unique: true, type: 'bigint' })
    barcode: string

    @Column({ type: 'bigint' })
    scanAmount: string

    @Column({ type: 'bigint' })
    reviewAmount: string

    @OneToMany(() => Review, review => review.user)
    reviews: Review[]

    @OneToOne(() => ReviewAggregate, ReviewAggregate => ReviewAggregate.product)
    reviewAggregate: ReviewAggregate

    @ManyToOne(() => User, User => User.product, { onDelete:'SET NULL' })
    user: User

    @ManyToOne(() => Brand, brand => brand.product, { onDelete:'SET NULL' })
    brand: Brand

    // FOR ONE TO ONE RELATIONSHIPS
    // Here we added @OneToOne to the profile and specify the 
    // target relation type to be Profile. We also added 
    // @JoinColumn which is required and must be set only on 
    // one side of the relation. The side you set @JoinColumn 
    // on, that side's table will contain a "relation id" and 
    // foreign keys to target entity table.
}

export default Product