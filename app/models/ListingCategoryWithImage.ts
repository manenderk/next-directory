import { Prisma } from "@prisma/client";

export type ListingCategoryWithImage = Prisma.ListingCategoryGetPayload<{
  include: {
    thumbnail: true;
  };
}>;