import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SingUpBodyDto {
  @ApiProperty({
    example: 'login',
  })
  login: string;
  @ApiProperty({
    example: 'password',
  })
  @IsNotEmpty()
  pasword: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'Гаджиев Расул Садуллаевич',
  })
  fullName: string;
}

export class SingInBodyDto {
  @ApiProperty({
    example: 'login',
  })
  login: string;
  @ApiProperty({
    example: 'password',
  })
  @IsNotEmpty()
  pasword: string;
}

export class SessionInfoDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  login: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  iat: number;
  @ApiProperty()
  exp: number;
}
