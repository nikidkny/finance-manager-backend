import { Injectable } from '@nestjs/common';
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
    await this.entriesRepository.update(id, updateEntryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.entriesRepository.delete(id);
  }
}
