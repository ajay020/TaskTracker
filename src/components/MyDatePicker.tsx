import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type PropType = {
  selectedDueDate: Dayjs | null;
  handleDueDateChange: (d: Dayjs | null) => void;
  variant?: "outlined" | "filled" | "standard" | undefined;
  size?: "small" | "medium" | undefined;
};

export default function MyDatePicker({
  selectedDueDate,
  handleDueDateChange,
  variant = "outlined",
  size = "medium",
}: PropType) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker", "MobileDatePicker", "DesktopDatePicker"]}
      >
        <DemoItem label="Due Date">
          <DatePicker
            value={selectedDueDate}
            onChange={(newVal) => handleDueDateChange(newVal)}
            defaultValue={dayjs(new Date())}
            disablePast
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
