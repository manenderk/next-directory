import { PRISMA } from "@/libs/prisma";
import CategoryTiles from "./components/categories/category-tiles";
import HomeSlider from "./components/sliders/home-slider";

export default async function Home() {
  const slides = await PRISMA.homeSlider.findMany({
    where: {
      active: true,
    },
    orderBy: {
      order: "asc",
    },
    include: {
      image: true,
    },
  });
  return (
    <>
      {/* End Navbar */}
      {/* -------- START HEADER 7 w/ text and video ------- */}
      <HomeSlider slides={slides} />
      {/* -------- END HEADER 7 w/ text and video ------- */}

      <div className="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <CategoryTiles />
      </div>
    </>
  );
}
