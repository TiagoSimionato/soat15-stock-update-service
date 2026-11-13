import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ResourceType, UnitType } from '../../../common/enums/resources.enum';
import { ColumnNumericTransformer } from '../../../common/utils/transformers';

@Entity({ name: 'tb_resource' })
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: ResourceType, type: 'enum' })
  type: string;

  @Column({ transformer: new ColumnNumericTransformer(), type: 'numeric' })
  cost: number;

  @Column({ enum: UnitType, type: 'enum' })
  unit: string;
}
