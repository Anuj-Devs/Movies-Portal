import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  posterDataUrl?: string;
}
