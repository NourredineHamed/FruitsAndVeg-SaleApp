import { Body, Controller, Post, Get, Put, Param, Delete, Logger, BadRequestException } from '@nestjs/common';
import { Query, UsePipes } from '@nestjs/common/decorators';
import { DefaultValuePipe, ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { Pagination } from 'nestjs-typeorm-paginate';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { PaginationDto } from 'src/shared dtos/pagination.dto';
import { DeleteResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { getProductParams } from '../getParams/getProductParams.dto';

import { ProductPostEntity } from '../models/product.entity';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }


    @Get()
    @UsePipes(ValidationPipe)
    async findAll(
        @Query() queryParams: getProductParams): Promise<Pagination<ProductPostEntity>> {
        const { orderby = "createdAt", way = "DESC", categorie, page = 1, limit = 12 } = queryParams;
        const options: IPaginationOptions = {
            limit,
            page,
        };
        return await this.productService.paginate(options, categorie, orderby, way);
    }

    @Get('top')
    async findAllTopProducts(
        @Query() queryParams: PaginationDto
    ): Promise<Pagination<ProductPostEntity>> {
        const { limit = 8, page = 1 } = queryParams;
        const options: IPaginationOptions = {
            limit,
            page,
        };
        return await this.productService.paginateTopProducts(options);
    }
    @Post('create')
    @UsePipes(ValidationPipe)
    create(@Body() post: CreateProductDto) {
      try {
        const result = this.productService.createProduct(post);
        return { data: result };
      }  catch (error) {
        // If validation fails, throw a BadRequestException with details
        throw new BadRequestException('Validation failed', error);
      }}

    @Get('details/:id')
    async getProductDetails(@Param('id', ParseIntPipe) id: number): Promise<ProductPostEntity> {
        return await this.productService.getProductDetails(id);
    }

    @Get('total')
    async get(@Query() queryParams: getProductParams) {
        const { qte, id } = queryParams;
        return this.productService.getProductTotal(qte, id);
    }

    // async index(
    //     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    //     @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    // ): Promise<Pagination<ProductPostEntity>> {
    //     limit = limit > 100 ? 100 : limit;
    //     return this.productService.paginate({
    //         page,
    //         limit,
    //         route: 'http://products.com/products',
    //     });
    // }


    @Put('update/:id')
    @UsePipes(ValidationPipe)
    update(
        @Param('id') id: number,
        @Body() productPost: CreateProductDto
    ) {
        this.productService.updateProduct(id, productPost)
        return { data: productPost }
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.productService.deleteProduct(id)
    }

}


