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
import { useForm, useWatch } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  createContentSchema,
  type CreateContentInput,
} from "@/schemas/contentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useSemesters } from "@/hooks/useSemeters";
import { useSubjects } from "@/hooks/useSubjects";
import { useUnits } from "@/hooks/useUnits";
import { useContentStore } from "@/stores/useContentStore";
import { toast } from "sonner";
import { useCreateContent } from "@/hooks/useMyContents";
import type { Dispatch, SetStateAction } from "react";
import { generatePDFThumbnail, generateDocThumbnail } from "@/utils/thumbnailGenerator";
import { useState } from "react";

function CreateContentForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<CreateContentInput>({
    resolver: zodResolver(createContentSchema),
    defaultValues: {
      semester: "",
      subject: "",
      unit: "",
    },
  });
  const { isLoading, error } = useContentStore();
  const createContent = useCreateContent();
  const [thumbnails, setThumbnails] = useState<{ [key: string]: Blob }>({});
  const [generatingThumbnails, setGeneratingThumbnails] = useState(false);

  const [files, semester, subject] = useWatch({
    control: form.control,
    name: ["files", "semester", "subject"],
  });

  const { data: semesters } = useSemesters();
  const { data: subjects } = useSubjects(semester);
  const { data: units } = useUnits(subject);

  async function onSubmit({
    semester,
    subject,
    unit,
    files,
  }: CreateContentInput) {
    const formData = new FormData();
    formData.set("branchId", "1");
    formData.set("semesterId", semester);
    formData.set("subjectId", subject);
    formData.set("unitId", unit);
    
    const fileArray = Array.from(files as FileList);
    fileArray.forEach((file) => formData.append("files", file));
    
    // Add thumbnails to formData - one thumbnail per file
    fileArray.forEach((file) => {
      const thumbnail = thumbnails[file.name];
      if (thumbnail) {
        formData.append("thumbnails", thumbnail, `${file.name}_thumbnail.jpg`);
      }
    });

    createContent.mutate(formData, {
      onSuccess: () => {
        toast.success("Content created successfully!");
        form.reset({ semester: "", subject: "", unit: "", files: [] });
        setOpen(false);
      },
      onError: () => {
        toast.error(error);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen((t) => !t)}>
          <Upload />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Content Form</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition hover:border-primary hover:bg-gray-50">
                <FormField
                  control={form.control}
                  name="files"
                  render={() => (
                    <FormItem>
                      <FormLabel className="flex flex-col items-center gap-2 cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">
                          Click to upload or drag & drop
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf, .docx, .doc"
                          className="sr-only"
                          onChange={async (e) => {
                            const files = e.target.files;
                            form.setValue("files", files, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            
                            // Generate thumbnails
                            if (files) {
                              setGeneratingThumbnails(true);
                              const newThumbnails: { [key: string]: Blob } = {};
                              for (const file of Array.from(files)) {
                                try {
                                  let thumbnail: Blob;
                                  if (file.type === 'application/pdf') {
                                    thumbnail = await generatePDFThumbnail(file);
                                  } else {
                                    thumbnail = await generateDocThumbnail(file);
                                  }
                                  newThumbnails[file.name] = thumbnail;
                                } catch (error) {
                                  console.error('Failed to generate thumbnail for', file.name, error);
                                  // Generate fallback thumbnail
                                  try {
                                    const fallbackThumbnail = await generateDocThumbnail(file);
                                    newThumbnails[file.name] = fallbackThumbnail;
                                  } catch (fallbackError) {
                                    console.error('Fallback thumbnail generation also failed:', fallbackError);
                                  }
                                }
                              }
                              setThumbnails(newThumbnails);
                              setGeneratingThumbnails(false);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {files && (files as FileList).length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-wrap gap-3 justify-center">
                      {Array.from(files as FileList).map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md shadow-sm"
                        >
                          <File className="w-4 h-4 text-gray-600" />
                          <span className="text-sm truncate max-w-[150px]">
                            {file.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    {generatingThumbnails && (
                      <div className="text-center text-sm text-blue-600">
                        Generating thumbnails...
                      </div>
                    )}
                  </div>
                )}
              </div>

              <FormField
                name="semester"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value}
                        onValueChange={(value) => {
                          form.setValue("semester", value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                          form.setValue("subject", "", {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                          form.setValue("unit", "", {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
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
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        disabled={!semester}
                        value={field.value}
                        onValueChange={(value) => {
                          form.setValue("subject", value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                          form.setValue("unit", "", {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
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
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        disabled={!subject}
                        value={field.value}
                        onValueChange={(value) => {
                          form.setValue("unit", value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
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

              <Button disabled={isLoading} className="w-full">
                {isLoading ? "CREATING A CONTENT..." : "CREATE A CONTENT"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateContentForm;
