// import { Category } from 'src/categories/entities/category.entity';
import { IsNumber, IsString } from 'class-validator';
export class CreateEntryDto {
  @IsNumber()
  amount: number;

  @IsString()
  date: string;
  @IsString()
  title: string;
  // categoryId: Category['id'];
}
