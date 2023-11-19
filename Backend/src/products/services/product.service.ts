import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
;
import { ProductPostEntity } from '../models/product.entity';
import { CategorieService } from './categorie.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductPostEntity)
        private readonly ProductPostRepository: Repository<ProductPostEntity>,
        private categorieService: CategorieService
    ) { }





    async paginate(options: IPaginationOptions, id: number, order: string, orderC: "DESC" | "ASC"): Promise<Pagination<ProductPostEntity>> {
        const queryBuilder = this.ProductPostRepository.createQueryBuilder('product');
        queryBuilder.leftJoinAndSelect("product.categorie", "categorie");
    
        if (id) {
            const ids = Array.isArray(id) ? id : [id];
            queryBuilder
                .where(`"categorie"."idCategorie" IN (:...ids)`, { ids })
                .andWhere("product.remainingQuantity > 0")
                .select([
                    'product.idProduct',
                    'product.name',
                    'product.urlImg',
                    'product.price',
                    'product.sellType',
                    'product.remainingQuantity', 
                    'product.isTop' ,
                    'categorie.name AS categoryName',
                    'product.categorieIdCategorie'
                ])
                .orderBy(`product.${order}`, orderC);
        } else {
            queryBuilder
                .where("product.remainingQuantity > 0")
                .select([
                    'product.idProduct',
                    'product.name',
                    'product.urlImg',
                    'product.price',
                    'product.sellType',
                    'product.remainingQuantity', 
                    'product.isTop' ,
                    'categorie.name AS categoryName',
                    'product.categorieIdCategorie'
                ])
                .orderBy(`product.${order}`, orderC);
        }
    
        return paginate<ProductPostEntity>(queryBuilder, options);
    }




    async paginateTopProducts(options: IPaginationOptions): Promise<Pagination<ProductPostEntity>> {
        const queryBuilder = this.ProductPostRepository.createQueryBuilder('product');
        queryBuilder.where("product.isTop = true")
            .andWhere("product.remainingQuantity > 0")
            .select('product.name')
            .addSelect('product.urlImg')
            .addSelect('product.price')
            .addSelect('product.sellType')

            .orderBy("product.createdAt", "DESC")


        return paginate<ProductPostEntity>(queryBuilder, options);
    }

    async getProductDetails(id: number): Promise<ProductPostEntity> {
        const queryBuilder = this.ProductPostRepository.createQueryBuilder('product');
        queryBuilder.where('product.idProduct = :id', { id })
            .andWhere("product.remainingQuantity > 0")
            .select('product.name')
            .addSelect('product.urlImg')
            .addSelect('product.price')
            .addSelect('product.sellType')
            .addSelect('product.description')

        return await queryBuilder.getOne();

    }
    async getOneById(id: number): Promise<ProductPostEntity> {
        return await this.ProductPostRepository.findOne({ where: { idProduct: id } })
    }

    async getProductTotal(qte: number, id: number) {
        const found: Promise<ProductPostEntity> = this.getOneById(id)

        if (await found != null) {
            const queryBuilder = this.ProductPostRepository.createQueryBuilder('product');
            const total = await queryBuilder
                .select(`sum(${qte} * product.price)`)
                .where('product.idProduct = :id', { id })
                .getRawOne()
            return total.sum
        } else {
            throw new BadRequestException('Invalid Product id');
        }


    }



    // findAllProducts(): Observable<ProductPostEntity[]> {
    //     return from(this.ProductPostRepository.find());

    // }
    async createProduct(productPost: CreateProductDto): Promise<ProductPostEntity> {
        try {
          // Simulate an error for testing
          // Comment out the next line if you don't want to simulate an error
          // throw new Error('An error occurred while creating the product.');
    
          return await this.ProductPostRepository.save(productPost);
        } catch (error) {
            // If validation fails, throw a BadRequestException with details
            throw new BadRequestException('Validation failed', error);
          }}

    updateProduct(id: number, productPost: CreateProductDto): Promise<UpdateResult> { 
        productPost.updatedAt = new Date();

        return this.ProductPostRepository.update(id, productPost)
    }

    deleteProduct(id: number): Promise<DeleteResult> {
        return this.ProductPostRepository.delete(id)

    }








}
