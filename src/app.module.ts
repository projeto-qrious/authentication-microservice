import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { FirebaseAuthGuard, FirebaseService } from '@project/shared';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthGuard, FirebaseService],
})
export class AppModule {}
