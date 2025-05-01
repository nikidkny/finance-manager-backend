import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry) private entriesRepository: Repository<Entry>,
  ) {}

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const newEntry = this.entriesRepository.create(createEntryDto);
    console.log('entry', newEntry);
    return this.entriesRepository.save(newEntry);
  }

  findAll() {
    return this.entriesRepository.find({});
  }

  findOne(id: number) {
    return this.entriesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    const entry = await this.entriesRepository.findOneBy({ id });
    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }
    Object.assign(entry, updateEntryDto);
    return this.entriesRepository.save(entry);
  }

  async remove(id: number): Promise<void> {
    const result = await this.entriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }
  }
}
