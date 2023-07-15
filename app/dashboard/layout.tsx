import { IsAdmin } from "@/libs/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "../components/SignOutButton/SignOutButton";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-white z-index-3 py-2">
        <div className="container">
          <Link href="/" className="navbar-brand">
            Directory APP
          </Link>
          {/* <SignOutButton /> */}

          {/* <button
            className="navbar-toggler shadow-none ms-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navigation"
            aria-controls="navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon mt-2">
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </span>
          </button> */}
          <div
            className="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
            id="navigation"
          >
            <ul className="navbar-nav navbar-nav-hover mx-auto">
              {/* <li className="nav-item mx-2">
                <a
                  className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                  role="button"
                >
                  Pages
                  <img
                    src="/assets/img/down-arrow-dark.svg"
                    alt="down-arrow"
                    className="arrow ms-1"
                  />
                </a>
              </li>
              <li className="nav-item mx-2">
                <a
                  className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                  role="button"
                >
                  Account
                  <img
                    src="/assets/img/down-arrow-dark.svg"
                    alt="down-arrow"
                    className="arrow ms-1"
                  />
                </a>
              </li>
              <li className="nav-item mx-2">
                <a
                  className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                  role="button"
                >
                  Blocks
                  <img
                    src="/assets/img/down-arrow-dark.svg"
                    alt="down-arrow"
                    className="arrow ms-1"
                  />
                </a>
              </li>
              <li className="nav-item mx-2">
                <a
                  className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                  role="button"
                >
                  Docs
                  <img
                    src="/assets/img/down-arrow-dark.svg"
                    alt="down-arrow"
                    className="arrow ms-1"
                  />
                </a>
              </li> */}
            </ul>
            <ul className="navbar-nav d-lg-block d-none">
              <li className="nav-item">
                <SignOutButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row mt-2">
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
