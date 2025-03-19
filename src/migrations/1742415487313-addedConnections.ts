import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedConnections1742415487313 implements MigrationInterface {
    name = 'AddedConnections1742415487313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entry" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "date" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "description" character varying`);
        await queryRunner.query(`DROP TABLE "entry"`);
    }

}
