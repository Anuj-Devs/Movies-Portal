import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async create(dto: CreateMovieDto) {
    const created = new this.movieModel(dto);
    return created.save();
  }

  async findAll(skip = 0, limit = 8) {
    const items = await this.movieModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
    const total = await this.movieModel.countDocuments();
    return { items, total };
  }

  async findOne(id: string) {
    const m = await this.movieModel.findById(id).exec();
    if (!m) throw new NotFoundException('Movie not found');
    return m;
  }

  async update(id: string, update: Partial<CreateMovieDto>) {
    const doc = await this.movieModel.findByIdAndUpdate(id, update, { new: true }).exec();
    if (!doc) throw new NotFoundException('Not found');
    return doc;
  }

  async remove(id: string) {
    return this.movieModel.findByIdAndDelete(id).exec();
  }
}
