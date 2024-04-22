import { $Enums } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SessionInfoDto } from 'dto/auth.dto';
import { AddClienBodytDto } from 'dto/table.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TableService {
  constructor(private dbService: DbService) {}

  addClient(data: AddClienBodytDto, session: SessionInfoDto) {
    const [firstName, lastName, surName] = data.fullName.split(' ');
    return this.dbService.clients.create({
      data: {
        ownerName: session.fullName,
        account_number: data.accountNumber,
        birth_date: data.birthDate,
        EIN: data.EIN,
        first_name: firstName,
        last_name: lastName,
        surname: surName,
        status: 'In_Work',
      },
    });
  }

  getClients(userName: string) {
    return this.dbService.clients.findMany({
      where: { ownerName: userName },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateClient(
    clientId: number,
    newStatus: $Enums.status_type,
  ) {
      const user = await this.dbService.clients.findFirst({where: { id: clientId}});
      if (!user) throw new BadRequestException({type: 'нет такого чела '})
    return this.dbService.clients.update({
      where: { id: clientId},
      data: { status: newStatus },
    });
  }
}
