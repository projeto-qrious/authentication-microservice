import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from '../auth/firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async register(createUserDto: CreateUserDto): Promise<admin.auth.UserRecord> {
    const { email, password, displayName, phoneNumber } = createUserDto;

    if (phoneNumber && !phoneNumber.startsWith('+')) {
      throw new BadRequestException(
        'O número de telefone deve estar no formato internacional E.164.',
      );
    }

    const userRecord = await this.firebaseService.getAuth().createUser({
      email,
      password,
      displayName,
      phoneNumber,
    });

    await this.firebaseService
      .getDatabase()
      .ref(`users/${userRecord.uid}`)
      .set({
        email,
        phoneNumber: phoneNumber || null,
        role: 'ATTENDEE',
      });

    return userRecord;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ customToken: string }> {
    const { email } = loginUserDto;

    // Obtém o usuário pelo email
    const user = await this.firebaseService.getAuth().getUserByEmail(email);

    // Cria um token personalizado
    const customToken = await this.firebaseService
      .getAuth()
      .createCustomToken(user.uid);

    return { customToken };
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await this.firebaseService.getAuth().verifyIdToken(idToken);
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
