import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    productName: string

    @Column()
    img: string

    // FOR ONE TO ONE RELATIONSHIPS
    // Here we added @OneToOne to the profile and specify the 
    // target relation type to be Profile. We also added 
    // @JoinColumn which is required and must be set only on 
    // one side of the relation. The side you set @JoinColumn 
    // on, that side's table will contain a "relation id" and 
    // foreign keys to target entity table.
}

export default Product