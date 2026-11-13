import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1794178881270 implements MigrationInterface {
    name = 'CreateDb1794178881270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tb_resource_type_enum" AS ENUM('P', 'S')`);
        await queryRunner.query(`CREATE TYPE "public"."tb_resource_unit_enum" AS ENUM('L', 'ML', 'U')`);
        await queryRunner.query(`CREATE TABLE "tb_resource" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "public"."tb_resource_type_enum" NOT NULL, "cost" numeric NOT NULL, "unit" "public"."tb_resource_unit_enum" NOT NULL, CONSTRAINT "PK_de67d2fb36732119d9a9b032581" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_stock" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "resource_id" integer NOT NULL, CONSTRAINT "UQ_066a007c56b4be4646b6020b108" UNIQUE ("resource_id"), CONSTRAINT "REL_066a007c56b4be4646b6020b10" UNIQUE ("resource_id"), CONSTRAINT "PK_dda820940014f49777aef1ad1ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_stock" ADD CONSTRAINT "FK_066a007c56b4be4646b6020b108" FOREIGN KEY ("resource_id") REFERENCES "tb_resource"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_stock" DROP CONSTRAINT "FK_066a007c56b4be4646b6020b108"`);
        await queryRunner.query(`DROP TABLE "tb_stock"`);
        await queryRunner.query(`DROP TABLE "tb_resource"`);
        await queryRunner.query(`DROP TYPE "public"."tb_resource_unit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tb_resource_type_enum"`);
    }

}
