-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobilePhoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "homePhoneNumber" TEXT,
    "birthPlace" TEXT,
    "birthDate" TIMESTAMP(3),
    "gender" TEXT,
    "maritalStatus" TEXT,
    "bloodType" TEXT,
    "religion" TEXT,
    "nationalIdNumber" TEXT,
    "passportNumber" TEXT,
    "passportExpiryDate" TIMESTAMP(3),
    "postalCode" TEXT,
    "citizenIdAddress" TEXT,
    "usesResidence" BOOLEAN,
    "residenceAddress" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "groupStructure" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "class" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobilePhoneNumber_key" ON "User"("mobilePhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_homePhoneNumber_key" ON "User"("homePhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
