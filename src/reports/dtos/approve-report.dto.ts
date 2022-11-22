import { IsBoolean } from 'class-validator';

export class ApprovereportDto {
  @IsBoolean()
  approved: boolean;
}
