import { IsAdmin } from "@/libs/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await IsAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <>
      <div className="py-4"></div>
      <div className="row mt-4">
        <div className="col-md-2">
          <ul className="nav flex-column bg-white border-radius-lg p-3 position-sticky top-10 shadow-lg">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/media" className="nav-link">
                Media
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/listings" className="nav-link">
                Listings
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/listing-categories" className="nav-link">
                Listing Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/events" className="nav-link">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/news" className="nav-link">
                News
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/home-slider" className="nav-link">
                Home Sliders
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-10">{children}</div>
      </div>
    </>
  );
}
