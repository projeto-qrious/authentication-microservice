import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from '../auth/firebase/firebase.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseService],
  exports: [AuthService],
})
export class AuthModule {}
