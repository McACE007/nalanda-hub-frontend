import { Plus } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useSemesters } from "@/hooks/useSemeters";
import { useSubjects } from "@/hooks/useSubjects";
import { useUnits } from "@/hooks/useUnits";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import {
  createRequestSchema,
  type CreateRequestInput,
} from "@/schemas/requestSchema";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCreateRequest } from "@/hooks/useMyRequests";

function CreateRequestForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<CreateRequestInput>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      requestType: "",
      semester: "",
      subject: "",
      unit: "",
    },
  });
  const { user } = useAuthStore();
  const createRequest = useCreateRequest();

  const [semester, subject] = useWatch({
    control: form.control,
    name: ["semester", "subject"],
  });

  const { data: semesters } = useSemesters();
  const { data: subjects } = useSubjects(semester);
  const { data: units } = useUnits(subject);


  async function onSubmit({
    requestType,
    semester,
    subject,
    unit,
  }: CreateRequestInput) {
    const formData = new FormData();
    formData.set("requestType", requestType);
    formData.set("branchId", user?.branchId?.toString() || "");
    formData.set("semesterId", semester);
    formData.set("subjectId", subject);
    formData.set("unitId", unit);

    createRequest.mutate(formData, {
      onSuccess: () => {
        toast.success("Request created successfully!");
        form.reset({ semester: "", subject: "", unit: "", requestType: "" });
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen((t) => !t)}>
          <Plus></Plus>
          Create Request
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Request Form</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Type</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value}
                        onValueChange={(value) => {
                          form.setValue("requestType", value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
                      >
                        <SelectTrigger className="bg-gray-50 w-full">
                          <SelectValue placeholder="Select a request type"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"NewContent"}>
                            New Content
                          </SelectItem>
                          <SelectItem value={"UpdateContent"}>
                            Update Content
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

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

              <Button disabled={createRequest.isPending} className="w-full">
                {createRequest.isPending ? "CREATING REQUEST..." : "CREATE REQUEST"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRequestForm;
