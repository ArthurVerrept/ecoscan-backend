import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    productName: string

    @Column()
    brandName: string

    @Column()
    productRating: number

    @Column()
    brandRating: number

    @Column()
    productQuality: number

    @Column()
    img: string
}

export default Product