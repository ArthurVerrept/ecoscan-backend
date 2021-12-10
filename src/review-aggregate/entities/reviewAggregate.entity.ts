import Product from "src/products/entities/products.entity"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class ReviewAggregates {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sustainabilityScore: number

    @Column()
    quality_score: number

    @OneToOne(() => Product, product => product.reviewAggregates)
    @JoinColumn()
    product: Product

    // FOR ONE TO ONE RELATIONSHIPS
    // Here we added @OneToOne to the profile and specify the 
    // target relation type to be Profile. We also added 
    // @JoinColumn which is required and must be set only on 
    // one side of the relation. The side you set @JoinColumn 
    // on, that side's table will contain a "relation id" and 
    // foreign keys to target entity table.
}

export default ReviewAggregates