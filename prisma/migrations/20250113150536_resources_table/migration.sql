-- CreateTable
CREATE TABLE "resources" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "academic_calendar_url" VARCHAR(300),

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);
