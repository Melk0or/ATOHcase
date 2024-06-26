/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * ATOHApi
 * simple api for testCase
 * OpenAPI spec version: 1.0.0
 */
import { createInstance } from "./api-instance";
import type { BodyType } from "./api-instance";
export type UpdateClientDtoStatus =
  (typeof UpdateClientDtoStatus)[keyof typeof UpdateClientDtoStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateClientDtoStatus = {
  Deal_closed: "Deal_closed",
  In_Work: "In_Work",
  Not_at_work: "Not_at_work",
  Reject: "Reject",
} as const;

export interface UpdateClientDto {
  clientId: number;
  status: UpdateClientDtoStatus | string;
}

export type ClientDtoStatus =
  (typeof ClientDtoStatus)[keyof typeof ClientDtoStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ClientDtoStatus = {
  Deal_closed: "Deal_closed",
  In_Work: "In_Work",
  Not_at_work: "Not_at_work",
  Reject: "Reject",
} as const;

export interface ClientDto {
  account_number: number;
  birth_date: string;
  EIN: string;
  first_name: string;
  id: number;
  last_name: string;
  ownerName: string;
  status: ClientDtoStatus;
  surname: string;
}

export interface AddClienBodytDto {
  accountNumber: number;
  birthDate: string;
  EIN: string;
  fullName: string;
}

export interface SessionInfoDto {
  exp: number;
  fullName: string;
  iat: number;
  id: number;
  login: string;
}

export interface SingInBodyDto {
  login: string;
  pasword: string;
}

export interface SingUpBodyDto {
  fullName: string;
  login: string;
  pasword: string;
}

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const appControllerGetHello = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>({ url: `/`, method: "GET" }, options);
};

export const authControllerSignUp = (
  singUpBodyDto: BodyType<SingUpBodyDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-up`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: singUpBodyDto,
    },
    options,
  );
};

export const authControllerSignIn = (
  singInBodyDto: BodyType<SingInBodyDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-in`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: singInBodyDto,
    },
    options,
  );
};

export const authControllerSignOut = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    { url: `/auth/sign-out`, method: "POST" },
    options,
  );
};

export const authControllerGetSessionInfo = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<SessionInfoDto>(
    { url: `/auth/session-info`, method: "GET" },
    options,
  );
};

export const tableControllerAddClient = (
  addClienBodytDto: BodyType<AddClienBodytDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ClientDto>(
    {
      url: `/table/clients`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: addClienBodytDto,
    },
    options,
  );
};

export const tableControllerGetClients = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ClientDto[]>(
    { url: `/table/clients`, method: "GET" },
    options,
  );
};

export const tableControllerUpdateClientStatus = (
  updateClientDto: BodyType<UpdateClientDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ClientDto>(
    {
      url: `/table/clients`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: updateClientDto,
    },
    options,
  );
};

export type AppControllerGetHelloResult = NonNullable<
  Awaited<ReturnType<typeof appControllerGetHello>>
>;
export type AuthControllerSignUpResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignUp>>
>;
export type AuthControllerSignInResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignIn>>
>;
export type AuthControllerSignOutResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignOut>>
>;
export type AuthControllerGetSessionInfoResult = NonNullable<
  Awaited<ReturnType<typeof authControllerGetSessionInfo>>
>;
export type TableControllerAddClientResult = NonNullable<
  Awaited<ReturnType<typeof tableControllerAddClient>>
>;
export type TableControllerGetClientsResult = NonNullable<
  Awaited<ReturnType<typeof tableControllerGetClients>>
>;
export type TableControllerUpdateClientStatusResult = NonNullable<
  Awaited<ReturnType<typeof tableControllerUpdateClientStatus>>
>;
