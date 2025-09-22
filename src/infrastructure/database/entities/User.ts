import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 50, type: 'varchar' })
  username!: string;

  @Column({ unique: true, length: 100, type: 'varchar' })
  email!: string;

  @Column({ name: 'password_hash', length: 255, type: 'varchar' })
  password!: string;

  @Column({ name: 'full_name', length: 100, type: 'varchar' })
  fullName!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'last_login', type: 'timestamp', nullable: true })
  lastLogin!: Date | null;
}
