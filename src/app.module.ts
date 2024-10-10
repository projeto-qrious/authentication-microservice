import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { FirebaseService } from './auth/firebase/firebase.service';
import { FirebaseAuthGuard } from './auth/guards/firebase-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthGuard, FirebaseService],
})
export class AppModule {}
