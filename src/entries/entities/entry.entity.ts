// import { Category } from '../../categories/entities/category.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  date: string;

  @Column()
  title: string;

  // @ManyToOne(() => Category, (category) => category.entries, {
  //   eager: true,
  // })
  // category: Category;
}
