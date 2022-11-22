import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGaurd } from 'src/gaurds/auth.gaurd';
import { Serialize } from 'src/interceptors/serialize.intercepors';
import { AuthService } from './auth.service';
import { Currentuser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
// @UseInterceptors(CurrentuserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    console.log('controller create user function before');
    const user = await this.authService.signup(body.email, body.password);
    console.log('controller create user function after user is created');
    session.userId = user.id;
    console.log('controller create user function after session is added');

    return user;
  }

  // @Get('/who')
  // whoami(@Session() session: any) {
  //   return this.userService.findOne(session.userId);
  // }

  @Get('/who')
  @UseGuards(AuthGaurd)
  whoami(@Currentuser() user: User) {
    return user;
  }

  @Post('signout')
  @UseGuards(AuthGaurd)
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signin')
  async signUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  // @UseInterceptors(new SerializeInterceptor(UserDto))

  @Get(':id')
  async findById(@Param('id') id: number) {
    // console.log('111111111111111111111111');
    return await this.userService.findOne(id);
  }

  @Get()
  findbyEmail(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  Date(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
