import { MigrationInterface, QueryRunner } from "typeorm"
import { seed } from "../seeds/seed.initial";

export class InitialSeed1727661145210 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await seed(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
