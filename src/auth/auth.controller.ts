import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const userRecord = await this.authService.register(createUserDto);
    return {
      uid: userRecord.uid,
      email: userRecord.email,
      message: 'Usuário registrado com sucesso',
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.login(loginUserDto);
    return {
      ...token,
      message: 'Login realizado com sucesso',
    };
  }

  @Post('verify-token')
  async verifyToken(@Body('idToken') idToken: string) {
    const decodedToken = await this.authService.verifyToken(idToken);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      message: 'Token verificado com sucesso',
    };
  }
}
