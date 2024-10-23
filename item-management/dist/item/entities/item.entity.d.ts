import { Brand } from './brand.entity';
import { Manufacturer } from './manufacturer.entity';
import { Category } from './category.entity';
export declare class Item {
    id: number;
    name: string;
    description: string;
    unit: string;
    manufacturer: Manufacturer;
    brand: Brand;
    category: Category;
    returnable: boolean;
}
