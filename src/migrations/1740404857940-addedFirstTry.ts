import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedFirstTry1740404857940 implements MigrationInterface {
  name = 'AddedFirstTry1740404857940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
  }
}
