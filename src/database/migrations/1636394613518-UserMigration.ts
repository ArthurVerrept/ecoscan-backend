import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1636394613518 implements MigrationInterface {
    name = 'UserMigration1636394613518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
    }

}
