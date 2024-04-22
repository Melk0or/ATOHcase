import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { TableModule } from './table/table.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DbModule, UserModule, AuthModule, TableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
