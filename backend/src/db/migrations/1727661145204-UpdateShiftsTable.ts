import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateShiftsTable1727661145204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shifts\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`shifts\` ADD COLUMN \`dayOfWeek\` varchar(10) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shifts\` DROP COLUMN \`dayOfWeek\``);
        await queryRunner.query(`ALTER TABLE \`shifts\` ADD COLUMN \`date\` date NOT NULL`);
    }

}
