import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUsernameToUser1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isUnique: true,
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'username');
  }
}
