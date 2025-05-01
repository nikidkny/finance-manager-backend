import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async upgrade(userId: number) {
    return this.usersService.upgrade(userId);
  }

  async signup(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersService.create(user.username, hashedPassword);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // console.log("user found", user);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  getJwtToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
  async login(user: any) {
    const userFromDb = await this.usersService.findOne(user.username);

    const payload = {
      username: user.username,
      id: userFromDb.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
