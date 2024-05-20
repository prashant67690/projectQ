-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "lock" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
