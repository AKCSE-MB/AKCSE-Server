--  Create the enum type
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER', 'UNKNOWN');

--  Alter Accounts.role (convert String to Enum)
ALTER TABLE "accounts"
ALTER COLUMN "role" TYPE "Role"
USING UPPER("role")::"Role";

--  Alter Members.role (convert String to Enum)
ALTER TABLE "members" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "members"
ALTER COLUMN "role" TYPE "Role"
USING UPPER("role")::"Role";
ALTER TABLE "members" ALTER COLUMN "role" SET DEFAULT 'MEMBER';