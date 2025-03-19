import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // isAdult(age: number): boolean {
  //   if (age < 0) {
  //     throw new Error('Age cannot be negative');
  //   }
  //   return age >= 18;
  // }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    console.log('category', newCategory);
    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find({});
  }

  async findOne(id: number): Promise<Category> {
    const seekedCategory = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (!seekedCategory) {
      throw new Error(`Category with id ${id} not found`);
    }
    return seekedCategory;
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  async remove(id: number): Promise<Category | string> {
    const categoryToRemove = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (!categoryToRemove) {
      return 'Category not found';
    }
    await this.categoryRepository.remove(categoryToRemove);
    return `Category ${categoryToRemove.id} removed`;
  }
}
