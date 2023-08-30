import { PRISMA } from "@/libs/prisma";

const CategoryTiles = async () => {
  const categories = await PRISMA.listingCategory.findMany({
    where: {
      active: true,
    },
    orderBy: {
      order: "asc",
    },
    include: {
      thumbnail: true,
    },
  });

  return (
    <section className="py-2">
      <h2 className="text-primary text-center">Discover</h2>
    </section>
  );
};

export default CategoryTiles;
