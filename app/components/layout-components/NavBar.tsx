import { SITE_NAME } from "@/libs/global";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg  blur border-radius-xl   z-index-3 shadow position-absolute  start-0 end-0 ">
      <div className="container-fluid px-0">
        <Link
          href="/"
          className="navbar-brand text-primary font-weight-bolder ms-sm-3  d-none d-md-block"
        >
          {SITE_NAME}
        </Link>
        <Link
          href="/"
          className="navbar-brand text-primary font-weight-bolder ms-sm-3  d-block d-md-none"
        >
          {SITE_NAME}
        </Link>

        <div
          className="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
          id="navigation"
        >
          <ul className="navbar-nav navbar-nav-hover mx-auto">
            <li className="nav-item px-3">
              <a className="nav-link">Pages</a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link">Utilities</a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link">Blocks</a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link ">Docs</a>
            </li>
          </ul>
        </div>
        <div>
          <button className="btn btn-primary m-0 ">
            <i className="fa fa-search"></i>
          </button>

          <button
            className="navbar-toggler shadow-none ms-md-2"
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
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
