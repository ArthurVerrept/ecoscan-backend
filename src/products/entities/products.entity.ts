import Brand from "src/brand/entities/brand.entity"
import Review from "src/reviews/entities/review.entity"
import ReviewAggregates from "src/reviews/entities/review.entity"
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Product {
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

    @OneToMany(() => Review, review => review.user)
    reviews: Review[]

    @OneToOne(() => ReviewAggregates, ReviewAggregates => ReviewAggregates.product)
    reviewAggregates: ReviewAggregates

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