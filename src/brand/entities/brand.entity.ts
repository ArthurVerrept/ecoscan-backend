import Product from "src/products/entities/products.entity"
import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Brand {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column("decimal", { precision: 2, scale: 1 })
    sustainabilityScore: number

    @Column("decimal", { precision: 2, scale: 1 })
    qualityScore: number

    @OneToMany(() => Product, product => product.brand)
    product: Product[]

    // FOR ONE TO ONE RELATIONSHIPS
    // Here we added @OneToOne to the profile and specify the 
    // target relation type to be Profile. We also added 
    // @JoinColumn which is required and must be set only on 
    // one side of the relation. The side you set @JoinColumn 
    // on, that side's table will contain a "relation id" and 
    // foreign keys to target entity table.
}

export default Brand