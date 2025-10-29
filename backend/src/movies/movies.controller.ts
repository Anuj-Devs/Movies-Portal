import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(@Query('page') page = '1', @Query('limit') limit = '8') {
    const p = parseInt(page as any, 10) || 1;
    const l = parseInt(limit as any, 10) || 8;
    const skip = (p - 1) * l;
    const data = await this.moviesService.findAll(skip, l);
    return { items: data.items, total: data.total, page: p, limit: l };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() dto: Partial<CreateMovieDto>) {
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
