import { $Enums } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AddClienBodytDto {
  @ApiProperty()
  accountNumber: number;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  birthDate: string
  @ApiProperty()
  EIN: string;
}

export class ClientDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  account_number: number;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  birth_date: Date;
  @ApiProperty()
  EIN: string;
  @ApiProperty()
  ownerName: string;
  @ApiProperty({
    enum: [
      $Enums.status_type.Deal_closed,
      $Enums.status_type.In_Work,
      $Enums.status_type.Not_at_work,
      $Enums.status_type.Reject,
    ],
  })
  status: $Enums.status_type;
  createdAt: Date;
}

export class UpdateClientDto {
  @ApiProperty()
  clientId: number;
  @ApiProperty({
    enum: [
      $Enums.status_type.Deal_closed,
      $Enums.status_type.In_Work,
      $Enums.status_type.Not_at_work,
      $Enums.status_type.Reject,
    ],
  })
  status: $Enums.status_type;
}
