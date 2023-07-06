-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HomeSlider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "imageId" TEXT NOT NULL,
    "link" TEXT,
    "order" INTEGER NOT NULL DEFAULT 100,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "HomeSlider_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HomeSlider" ("active", "description", "id", "imageId", "link", "order", "title") SELECT "active", "description", "id", "imageId", "link", "order", "title" FROM "HomeSlider";
DROP TABLE "HomeSlider";
ALTER TABLE "new_HomeSlider" RENAME TO "HomeSlider";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
