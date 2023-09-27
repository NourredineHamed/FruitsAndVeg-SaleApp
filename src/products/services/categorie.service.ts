import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCategorieDto } from '../dto/create-categorie.dto';
import { CategoriePostEntity } from '../models/categorie.entity';

@Injectable()
export class CategorieService {

    constructor(
        @InjectRepository(CategoriePostEntity)
        private readonly CategoriePostRepository: Repository<CategoriePostEntity>,


    ) { }




    async findAll(): Promise<CategoriePostEntity[]> {
        const queryBuilder = this.CategoriePostRepository.createQueryBuilder('categorie');
        queryBuilder.innerJoin('categorie.products', 'product')
            .select('categorie.idCategorie')
            .addSelect('categorie.name')

        return await queryBuilder.getMany();

    }




    createCategorie(category: CreateCategorieDto): Promise<CategoriePostEntity> {
        return this.CategoriePostRepository.save(category);
    }

    updateCategorie(id: number, categoriePost: CreateCategorieDto): Promise<UpdateResult> {
        categoriePost.updatedAt = new Date();
        return this.CategoriePostRepository.update(id, categoriePost)
    }

    deleteCategorie(id: number): Promise<DeleteResult> {
        return this.CategoriePostRepository.delete(id)

    }
    // async paginate(options: IPaginationOptions): Promise<Pagination<CategoriePostEntity>> {
    //     const queryBuilder = this.CategoriePostRepository.createQueryBuilder('categorie');
    //     queryBuilder.innerJoin('categorie.products', 'product')
    //         .select('categorie.name')
    //     return queryBuilder.getMany();
    // }


    async getCategorieById(id: number): Promise<CategoriePostEntity> {
        return this.CategoriePostRepository.findOne({ where: { idCategorie: id } })
    }

}
