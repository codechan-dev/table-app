import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('items') // Tagging the controller
@Controller('items') // Controller route
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new item' })
    @ApiResponse({ status: 201, description: 'Item created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid data.' })
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemService.create(createItemDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all items' })
    @ApiResponse({ status: 200, description: 'List of items.' })
    @ApiQuery({ name: 'filterByUnit', required: false })
    @ApiQuery({ name: 'filterByBrandId', required: false })
    @ApiQuery({ name: 'filterByManufacturerId', required: false })
    @ApiQuery({ name: 'filterByCategoryId', required: false })
    @ApiQuery({ name: 'sortBy', required: false })
    @ApiQuery({ name: 'order', required: false })
    @ApiQuery({ name: 'search', required: false })
    findAll(
        @Query('sortBy') sortBy: string,
        @Query('order') order: 'ASC' | 'DESC',
        @Query('search') search: string,
        @Query('filterByUnit') filterByUnit: string,
        @Query('filterByBrandId') filterByBrandId: number,
        @Query('filterByManufacturerId') filterByManufacturerId: number,
        @Query('filterByCategoryId') filterByCategoryId: number,
    ) {
        return this.itemService.findAll(
            sortBy,
            order,
            search,
            filterByUnit,
            filterByBrandId,
            filterByManufacturerId,
            filterByCategoryId,
        );
    }
}
