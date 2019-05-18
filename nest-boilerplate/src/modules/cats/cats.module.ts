import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cat } from './cats.entity';
import { CatResolver } from './cats.resolver';
import { CatService } from './cats.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    providers: [CatResolver, CatService],
})
export class CatModule { }