import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Resource } from '../../resources/entities/resources.entity';

@Entity({ name: 'tb_stock' })
@Unique(['resource'])
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @OneToOne(() => Resource, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;
}
