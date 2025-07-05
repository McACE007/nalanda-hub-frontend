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
  items: string[];
  placeholder: string;
};

function CustomSelect({ label, items, placeholder }: CustomSelectProps) {
  return (
    <>
      <div className="space-y-1 w-full">
        <Label className="font-normal">{label}</Label>
        <Select>
          <SelectTrigger className="bg-gray-50 w-full">
            <SelectValue placeholder={placeholder}></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default CustomSelect;
