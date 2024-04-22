-- CreateEnum
CREATE TYPE "status_type" AS ENUM ('Not_at_work', 'In_Work', 'Reject', 'Deal_closed');

-- CreateTable
CREATE TABLE "system_users" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "system_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "account_number" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "EIN" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "status" "status_type" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_users_full_name_key" ON "system_users"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "system_users_login_key" ON "system_users"("login");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "system_users"("full_name") ON DELETE RESTRICT ON UPDATE CASCADE;
