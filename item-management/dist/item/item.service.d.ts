import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { Manufacturer } from './entities/manufacturer.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
export declare class ItemService {
    private readonly manufacturerRepository;
    private readonly itemRepository;
    private readonly brandRepository;
    private readonly categoryRepository;
    constructor(manufacturerRepository: Repository<Manufacturer>, itemRepository: Repository<Item>, brandRepository: Repository<Brand>, categoryRepository: Repository<Category>);
    create(createItemDto: CreateItemDto): Promise<Item>;
    findAll(sortBy: string, order: 'ASC' | 'DESC', search: string, filterByUnit: string, filterByBrandId: number, filterByManufacturerId: number, filterByCategoryId: number): Promise<Item[]>;
}
