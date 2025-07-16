import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CircuitBoard,
  Delete,
  Pen,
  Pencil,
  Pentagon,
  Pyramid,
  Trash,
  Triangle,
  Upload,
} from "lucide-react";

function MyUploadsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">My Uploads</h1>
        <Button>
          <Upload />
          Upload
        </Button>
      </div>
      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead>S.No</TableHead>
              <TableHead>Content Info</TableHead>
              <TableHead>Uploaded Date</TableHead>
              <TableHead>Updated Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <img
                    src="https://picsum.photos/seed/clw000I/3203/3974"
                    alt="PDF Thumbnail"
                    className="size-20"
                  />
                  <div className="flex flex-col justify-center">
                    <div className="font-bold">
                      Introduction to Computer Network
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Semester 1 | Computer Network
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>32-03-2022</TableCell>
              <TableCell>32-03-2022</TableCell>
              <TableCell>
                <CircuitBoard className="text-red-500 ml-2"></CircuitBoard>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size={"icon"}>
                    <Pencil />
                  </Button>

                  <Button size={"icon"} variant={"destructive"}>
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MyUploadsPage;
