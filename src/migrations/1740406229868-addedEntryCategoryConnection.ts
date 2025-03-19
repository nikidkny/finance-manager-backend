import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntryCategoryConnection1740406229868 implements MigrationInterface {
    name = 'AddedEntryCategoryConnection1740406229868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "currency" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "currency"`);
    }

}
