"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_entity_1 = require("./entities/item.entity");
const manufacturer_entity_1 = require("./entities/manufacturer.entity");
const brand_entity_1 = require("./entities/brand.entity");
const category_entity_1 = require("./entities/category.entity");
let ItemService = class ItemService {
    constructor(manufacturerRepository, itemRepository, brandRepository, categoryRepository) {
        this.manufacturerRepository = manufacturerRepository;
        this.itemRepository = itemRepository;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(createItemDto) {
        const manufacturer = await this.manufacturerRepository.findOne({
            where: { id: createItemDto.manufacturerId },
        });
        if (!manufacturer) {
            throw new common_1.NotFoundException('Manufacturer not found');
        }
        let brand;
        if (createItemDto.brandId) {
            brand = await this.brandRepository.findOne({
                where: { id: createItemDto.brandId },
            });
            if (!brand) {
                throw new common_1.NotFoundException('Brand not found');
            }
        }
        let category;
        if (createItemDto.categoryId) {
            category = await this.categoryRepository.findOne({
                where: { id: createItemDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
        }
        const item = this.itemRepository.create({
            name: createItemDto.name,
            description: createItemDto.description,
            unit: createItemDto.unit,
            manufacturer,
            brand,
            category,
        });
        return await this.itemRepository.save(item);
    }
    async findAll(sortBy, order = 'ASC', search, filterByUnit, filterByBrandId, filterByManufacturerId, filterByCategoryId) {
        const query = this.itemRepository.createQueryBuilder('item');
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
        if (search) {
            query.andWhere('item.name LIKE :search', { search: `%${search}%` });
        }
        if (sortBy) {
            query.orderBy(`item.${sortBy}`, order);
        }
        return query.getMany();
    }
};
exports.ItemService = ItemService;
exports.ItemService = ItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(manufacturer_entity_1.Manufacturer)),
    __param(1, (0, typeorm_1.InjectRepository)(item_entity_1.Item)),
    __param(2, (0, typeorm_1.InjectRepository)(brand_entity_1.Brand)),
    __param(3, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ItemService);
//# sourceMappingURL=item.service.js.map