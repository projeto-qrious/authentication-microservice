import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from '@project/shared';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseService],
  exports: [AuthService],
})
export class AuthModule {}
