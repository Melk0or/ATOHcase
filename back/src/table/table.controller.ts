import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SessionInfoDto } from 'dto/auth.dto';
import { AddClienBodytDto, ClientDto, UpdateClientDto } from 'dto/table.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { TableService } from './table.service';

@UseGuards(AuthGuard)
@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post('clients')
  @ApiCreatedResponse({type: ClientDto})
  addClient(
    @Body() body: AddClienBodytDto,
    @SessionInfo() session: SessionInfoDto,
  ): Promise<ClientDto> {
    return this.tableService.addClient(body, session);
  }

  @Get('clients')
  @ApiOkResponse({type: ClientDto})
  getClients(@SessionInfo() session: SessionInfoDto): Promise<ClientDto[]> {
    return this.tableService.getClients(session.fullName);
  }

  @Patch('clients')
  @ApiOkResponse({type: ClientDto})
  updateClientStatus(
    @Body() body: UpdateClientDto,
  ) {
      return this.tableService.updateClient(body.clientId, body.status);
  }
}
