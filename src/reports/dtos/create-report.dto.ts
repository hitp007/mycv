import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  make: string;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2020)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}
