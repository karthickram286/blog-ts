
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition (Posts)
CREATE TABLE "public"."Posts" (
    "id" varchar(255),
    "title" varchar(255),
    "body" varchar(255),
    "author_id" varchar(255),
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL
);

-- Table Definition (Users)
CREATE TABLE "public"."Users" (
    "id" varchar(255),
    "username" varchar(255),
    "password" varchar(255),
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL
);

