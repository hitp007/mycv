import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGaurd } from 'src/gaurds/admin.gaurd';
import { AuthGaurd } from 'src/gaurds/auth.gaurd';
import { Serialize } from 'src/interceptors/serialize.intercepors';
import { Currentuser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ApprovereportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(AuthGaurd)
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Post()
  @Serialize(ReportDto)
  createreport(@Body() body: CreateReportDto, @Currentuser() user: User) {
    // console.log(user);
    return this.reportService.create(body, user);
  }

  @Patch(':id')
  @UseGuards(AdminGaurd)
  approvereport(@Param('id') id: number, @Body() body: ApprovereportDto) {
    return this.reportService.approvereport(id, body.approved);
  }
}
