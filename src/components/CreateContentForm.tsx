import { File, Upload } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ROUTES } from "@/config/api";
import {
  createContentSchema,
  type CreateContentInput,
} from "@/schemas/contentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

function CreateContentForm() {
  const form = useForm<CreateContentInput>({
    resolver: zodResolver(createContentSchema),
    defaultValues: {
      semester: "",
      subject: "",
      unit: "",
    },
  });

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
    queryKey: ["subjects", form.watch("semester")],
    queryFn: async (): Promise<{ name: string; id: number }[]> => {
      const response = await axios.get(API_ROUTES.SUBJECT, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          semester: form.getValues("semester"),
        },
      });
      return response.data.subjects;
    },
    enabled: !!form.getValues("semester"),
  });

  const { data: units } = useQuery({
    queryKey: ["units", form.watch("subject")],
    queryFn: async (): Promise<{ name: string; id: number }[]> => {
      const response = await axios.get(API_ROUTES.UNIT, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          subject: form.getValues("subject"),
        },
      });
      return response.data.units;
    },
    enabled: !!form.getValues("subject"),
  });

  async function onSubmit({ semester, subject, unit }: CreateContentInput) {
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    console.log(subject, semester, unit);
  }

  const files = form.watch("files");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-4/6 w-3/6 overflow-auto">
        <DialogHeader>
          <DialogTitle>Upload Content Form</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="border border-dashed rounded-lg p-10 flex flex-col justify-center items-center gap-2 mb-6">
                <div className="text-center">
                  <Upload className="mx-auto size-8 text-gray-400" />
                </div>
                <FormField
                  control={form.control}
                  name="files"
                  render={() => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel>Click to browse</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="sr-only"
                          accept=".pdf, .docx, .doc"
                          onChange={(e) =>
                            form.setValue("files", e.target.files, {
                              shouldValidate: true,
                              shouldDirty: true,
                            })
                          }
                        ></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                {(form.getValues("files") as FileList).length > 0 && (
                  <div className="mt-2">
                    {Array.from(form.getValues("files") as FileList).map(
                      (file) => (
                        <div className="flex flex-col justify-center items-center">
                          <File />
                          <span className="text-xs">{file.name}</span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              <FormField
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          form.setValue("semester", value);
                          form.setValue("subject", "");
                          form.setValue("unit", "");
                        }}
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
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Select
                        disabled={!form.getValues("semester")}
                        value={field.value}
                        onValueChange={(value) => {
                          form.setValue("subject", value);
                          form.setValue("unit", "");
                        }}
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
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select
                        disabled={!form.getValues("subject")}
                        value={field.value}
                        onValueChange={(value) => form.setValue("unit", value)}
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
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <Button disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting
                  ? "CREATING A CONTENT..."
                  : "CREATE A CONTENT"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateContentForm;
