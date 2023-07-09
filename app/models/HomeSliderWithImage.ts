import { Prisma } from "@prisma/client";

export type HomeSliderWithImage = Prisma.HomeSliderGetPayload<{
  include: {
    image: true;
  };
}>;