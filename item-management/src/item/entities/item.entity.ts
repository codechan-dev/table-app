import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Brand } from './brand.entity';
import { Manufacturer } from './manufacturer.entity';
import { Category } from './category.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unit: string;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.items)
  manufacturer: Manufacturer;

  @ManyToOne(() => Brand, (brand) => brand.items)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @Column({ default: false })
  returnable: boolean;
}
