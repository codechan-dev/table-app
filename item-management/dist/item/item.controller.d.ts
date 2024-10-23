import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    create(createItemDto: CreateItemDto): Promise<import("./entities/item.entity").Item>;
    findAll(sortBy: string, order: 'ASC' | 'DESC', search: string, filterByUnit: string, filterByBrandId: number, filterByManufacturerId: number, filterByCategoryId: number): Promise<import("./entities/item.entity").Item[]>;
}
