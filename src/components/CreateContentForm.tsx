import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFilters } from "@/stores/useFilterStore";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ROUTES } from "@/config/api";

function CreateContentForm() {
  const [data, setData] = useState<{
    semester: string;
    subject: string;
    unit: string;
  }>({ subject: "", semester: "", unit: "" });

  const form = useForm();

  const { data: semesters } = useQuery({
    queryKey: ["semesters"],
    queryFn: async (): Promise<{ name: string; id: number }[]> => {
      const response = await axios.get(API_ROUTES.SEMESTER, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data.semesters;
    },
  });

  const { data: subjects } = useQuery({
    queryKey: ["subjects", data.semester],
    queryFn: async (): Promise<{ name: string; id: number }[]> => {
      const response = await axios.get(API_ROUTES.SUBJECT, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          semester: data.semester,
        },
      });
      return response.data.subjects;
    },
    enabled: !!data.semester,
  });

  const { data: units } = useQuery({
    queryKey: ["units", data.subject],
    queryFn: async (): Promise<{ name: string; id: number }[]> => {
      const response = await axios.get(API_ROUTES.UNIT, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          subject: data.subject,
        },
      });
      return response.data.units;
    },
    enabled: !!data.subject,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Content Form</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Form {...form}>
            <form className="space-y-4">
              <div className="border border-dashed rounded-lg p-10 flex flex-col justify-center items-center gap-2 mb-6">
                <Upload />
                <p className="text-xs text-muted-foreground">Upload a file</p>
              </div>

              <FormField
                name=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <Select
                        value={data.semester}
                        onValueChange={(value) =>
                          setData({
                            semester: value,
                            subject: "",
                            unit: "",
                          })
                        }
                      >
                        <SelectTrigger className="bg-gray-50 w-full">
                          <SelectValue placeholder="Select a semester"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {semesters &&
                            semesters.map(({ name, id }) => (
                              <SelectItem key={id} value={id + ""}>
                                {name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Select
                        disabled={!data.semester}
                        value={data.subject}
                        onValueChange={(value) =>
                          setData((state) => ({
                            ...state,
                            subject: value,
                            unit: "",
                          }))
                        }
                      >
                        <SelectTrigger className="bg-gray-50 w-full">
                          <SelectValue placeholder="Select a subject"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {subjects &&
                            subjects.map(({ name, id }) => (
                              <SelectItem key={id} value={id + ""}>
                                {name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select
                        disabled={!data.subject}
                        value={data.unit}
                        onValueChange={(value) =>
                          setData((state) => ({
                            ...state,
                            unit: value,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-gray-50 w-full">
                          <SelectValue placeholder="Select a unit"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {units &&
                            units.map(({ name, id }) => (
                              <SelectItem key={id} value={id + ""}>
                                {name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button className="w-full">CREATE A CONTENT</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateContentForm;
