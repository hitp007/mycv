import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportdto: CreateReportDto, user: User) {
    const report = this.repo.create(reportdto);
    report.user = user;
    this.repo.save(report);
    return report;
  }

  async approvereport(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });
    report.approved = approved;
    await this.repo.save(report);
    return report;
  };
}
