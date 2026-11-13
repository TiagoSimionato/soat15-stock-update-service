import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseSeeding1794178881271 implements MigrationInterface {
    name = 'DatabaseSeeding1794178881271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO tb_resource (id, name, type, cost, unit) 
            VALUES 
            (1, 'Óleo de Motor 5W30', 'S', 45.50, 'L'),
            (2, 'Filtro de Óleo', 'P', 25.00, 'U'),
            (3, 'Pastilha de Freio Dianteiro', 'P', 120.00, 'U')
            ON CONFLICT (id) DO NOTHING;
        `);
        await queryRunner.query(`SELECT setval('tb_resource_id_seq', (SELECT MAX(id) FROM tb_resource));`).catch(() => {});

        await queryRunner.query(`
            INSERT INTO tb_stock (id, amount, resource_id) 
            VALUES 
            (1, 100, 1),
            (2, 50, 2),
            (3, 20, 3)
            ON CONFLICT (id) DO NOTHING;
        `);
        await queryRunner.query(`SELECT setval('tb_stock_id_seq', (SELECT MAX(id) FROM tb_stock));`).catch(() => {});
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM tb_stock WHERE id IN (1, 2, 3);`);
        await queryRunner.query(`DELETE FROM tb_resource WHERE id IN (1, 2, 3);`);
    }

}
