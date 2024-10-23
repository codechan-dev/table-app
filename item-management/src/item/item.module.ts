import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { Manufacturer } from './entities/manufacturer.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Manufacturer, Brand, Category]),
  ],
  controllers: [ItemController], // Ensure your controller is listed here
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
