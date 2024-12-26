-- CreateTable
CREATE TABLE "resources" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "course_list" TEXT[],
    "prerequisites" TEXT[],
    "expected_duration" INTEGER NOT NULL,
    "aprox_tuition_international" INTEGER,
    "aprox_tuition_domestic" INTEGER NOT NULL,
    "academic_calendar_url" TEXT,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);
