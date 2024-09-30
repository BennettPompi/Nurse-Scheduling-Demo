import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNursesTable1727661145205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nurses\` ADD COLUMN \`assignedShifts\` int NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nurses\` DROP COLUMN \`assignedShifts\``);
    }

}