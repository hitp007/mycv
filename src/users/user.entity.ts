import { Report } from 'src/reports/report.entity';
import {
  // AfterInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: true })
  admin: boolean;

  @Column()
  password: string;

  // @AfterInsert()
  // dothis() {
  //   console.log('This User is created', this.email);
  // }

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
