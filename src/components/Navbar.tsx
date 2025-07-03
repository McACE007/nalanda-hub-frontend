import { Link } from "react-router-dom";
import Brand from "./icons/Brand";

function Navbar() {
  return (
    <nav className="w-full h-14 fixed top-0 left-0 z-50 bg-background border-b p-2">
      <div className="container h-full">
        <div className="h-full">
          <Link
            to={"/"}
            className="size-16 flex justify-center items-center h-full"
          >
            <Brand height="48" width="48" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
