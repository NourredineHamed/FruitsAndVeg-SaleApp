import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateCategorieDto } from '../dto/create-categorie.dto';

import { CategoriePostEntity } from '../models/categorie.entity';
import { CategorieService } from '../services/categorie.service';

@Controller('categorie')
export class CategorieController {
    constructor(private categorieService: CategorieService) { }



    @Get('allcat')
    async findAll(): Promise<CategoriePostEntity[]> {
        return this.categorieService.findAll();
        
    }




    @Post('/create')
    @UsePipes(ValidationPipe)
    create(@Body() post: CreateCategorieDto) {
        this.categorieService.createCategorie(post);
        return { data: post }
    }
    @Get(':id')
    async getCategorieById(@Param('id', ParseIntPipe) id: number): Promise<CategoriePostEntity> {
        return await this.categorieService.getCategorieById(id);
    }

    @Put('/update/:id')
    @UsePipes(ValidationPipe)

    update(
        @Param('id') id: number,
        @Body() categoriePost: CreateCategorieDto
    ) {
        this.categorieService.updateCategorie(id, categoriePost)
        return { data: categoriePost }
    }

    @Delete('/delete/:id')
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.categorieService.deleteCategorie(id)
    }
}
