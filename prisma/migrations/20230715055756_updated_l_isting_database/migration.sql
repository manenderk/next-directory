/*
  Warnings:

  - You are about to drop the column `description` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `address` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `HomeSlider` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `HomeSlider` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `HomeSlider` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "thumbnailId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Listing_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Listing_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ListingCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Listing" ("active", "categoryId", "id", "slug", "thumbnailId", "title") SELECT "active", "categoryId", "id", "slug", "thumbnailId", "title" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
CREATE UNIQUE INDEX "Listing_slug_key" ON "Listing"("slug");
CREATE TABLE "new_HomeSlider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 100,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "HomeSlider_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HomeSlider" ("active", "description", "id", "imageId", "link", "order", "title") SELECT "active", "description", "id", "imageId", "link", "order", "title" FROM "HomeSlider";
DROP TABLE "HomeSlider";
ALTER TABLE "new_HomeSlider" RENAME TO "HomeSlider";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
