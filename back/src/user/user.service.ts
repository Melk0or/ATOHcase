import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

interface IData {
  fullName: string;
  login: string;
  hash: string;
  salt: string;
}

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  findById(userId: number) {
    return this.dbService.system_users.findFirst({
      where: { id: userId },
    });
  }


  findByName(fullName: string) {
    return this.dbService.system_users.findFirst({
      where: { full_name: fullName },
    });
  }

  findByLogin(userLogin: string) {
    return this.dbService.system_users.findUnique({
      where: { login: userLogin },
    });
  }

  getAllClients(userId: number) {
    return this.dbService.system_users.findFirst({
      where: { id: userId },
      include: { clients: {} },
    });
  }

  createUser(data: IData) {
    return this.dbService.system_users.create({
      data: {
        full_name: data.fullName,
        login: data.login,
        hash: data.hash,
        salt: data.salt,
      },
    });
  }

  //   async removeUser(userId: number) {
  //     const user = await this.findById(userId);
  //     if (!user) return undefined;
  //     await this.dbService.family_member.deleteMany({
  //       where: { ownerId: userId },
  //     });
  //     await this.dbService.education.delete({ where: { ownerId: userId } });
  //     return this.dbService.client_user.delete({ where: { id: userId } });
  //   }
}
