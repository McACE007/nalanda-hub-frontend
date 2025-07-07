import { useContentStore } from "@/stores/useContentStore";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type CustomSelectProps = {
  label: string;
  items: { [key: string]: string }[];
  placeholder: string;
};

function CustomSelect({ label, items, placeholder }: CustomSelectProps) {
  const setSortBy = useContentStore((state) => state.setSortBy);
  return (
    <>
      <div className="space-y-1 w-full">
        <Label className="font-normal">{label}</Label>
        <Select
          onValueChange={(value) => setSortBy(value)}
          defaultValue="newest"
        >
          <SelectTrigger className="bg-gray-50 w-full">
            <SelectValue placeholder={placeholder}></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {items.map(({ label, value }) => (
              <SelectItem value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default CustomSelect;
