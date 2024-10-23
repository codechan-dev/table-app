import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { Manufacturer } from './entities/manufacturer.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity'; // Ensure you import Category

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    // Check if manufacturer exists
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id: createItemDto.manufacturerId }, // Correct usage
    });

    if (!manufacturer) {
      throw new NotFoundException('Manufacturer not found');
    }

    // If brand is also a foreign key, check for its existence
    let brand;
    if (createItemDto.brandId) {
      brand = await this.brandRepository.findOne({
        where: { id: createItemDto.brandId }, // Correct usage
      });

      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
    }

    // If category is also a foreign key, check for its existence
    let category;
    if (createItemDto.categoryId) {
      category = await this.categoryRepository.findOne({
        where: { id: createItemDto.categoryId }, // Correct usage
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    // Create the item with the correct relationships
    const item = this.itemRepository.create({
      name: createItemDto.name,
      description: createItemDto.description,
      unit: createItemDto.unit,
      manufacturer, // Assign the manufacturer reference
      brand, // Assign the brand reference if it exists
      category, // Assign the category reference if it exists
    });

    return await this.itemRepository.save(item);
  }

  async findAll(
    sortBy: string,
    order: 'ASC' | 'DESC' = 'ASC',
    search: string,
    filterByUnit: string,
    filterByBrandId: number,
    filterByManufacturerId: number,
    filterByCategoryId: number,
  ): Promise<Item[]> {
    const query = this.itemRepository.createQueryBuilder('item');

    // Filtering
    if (filterByUnit) {
      query.andWhere('item.unit = :filterByUnit', { filterByUnit });
    }

    if (filterByBrandId) {
      query.andWhere('item.brandId = :filterByBrandId', { filterByBrandId });
    }

    if (filterByManufacturerId) {
      query.andWhere('item.manufacturerId = :filterByManufacturerId', { filterByManufacturerId });
    }

    if (filterByCategoryId) {
      query.andWhere('item.categoryId = :filterByCategoryId', { filterByCategoryId });
    }

    // Searching
    if (search) {
      query.andWhere('item.name LIKE :search', { search: `%${search}%` });
    }

    // Sorting
    if (sortBy) {
      query.orderBy(`item.${sortBy}`, order);
    }

    // Execute the query and return the results
    return query.getMany();
  }
}
