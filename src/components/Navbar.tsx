import { Link } from "react-router-dom";
import Brand from "./icons/Brand";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Search, Upload } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="w-full h-14 fixed top-0 left-0 z-50 bg-background border-b border-border/40 py-2 px-4">
      <div className="h-full flex justify-between items-center w-full">
        <div className="h-full">
          <Link
            to={"/"}
            className="flex justify-center items-center h-full w-fit"
          >
            <Brand height="48" width="48" />
            <span className="font-semibold flex flex-col gap-0 leading-4 w-fit text-[#203143]">
              <span>Nalanda</span>
              <span>Hub</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center h-9 w-[600px]">
          <Input
            className="bg-background rounded-bl-2xl rounded-tl-2xl h-full flex-1 rounded-r-none focus-visible:border-ring focus-visible:ring-ring/10 focus-visible:ring-1"
            placeholder="Search"
          />
          <Search className="font-extralight bg-gray-100 h-full w-fit px-4 py-2 rounded-r-2xl border border-l-0 hover:bg-gray-200/80" />
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-12">
            <Button variant={"outline"} className="rounded-2xl">
              <Upload />
              Upload
            </Button>
          </div>
          <div className="hover:bg-gray-200 p-1.5 rounded-full">
            <Bell size={18} />
          </div>
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
