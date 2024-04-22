import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
  imports: [DbModule],
  controllers: [TableController],
  providers: [TableService]
})
export class TableModule {}
