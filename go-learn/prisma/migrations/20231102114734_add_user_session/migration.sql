-- CreateTable
CREATE TABLE "UserSession" (
    "id" SERIAL NOT NULL,
    "cookieKey" TEXT NOT NULL,
    "cookieValue" TEXT NOT NULL,
    "userUsername" TEXT NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_id_key" ON "UserSession"("id");

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
