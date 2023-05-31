import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type PropType = {
  selectedDueDate: Dayjs | null;
  handleDueDateChange: (d: Dayjs | null) => void;
};

export default function ResponsiveDatePickers({
  selectedDueDate,
  handleDueDateChange,
}: PropType) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker", "MobileDatePicker", "DesktopDatePicker"]}
      >
        <DemoItem label="Responsive variant">
          <DatePicker
            value={selectedDueDate}
            onChange={(newVal) => handleDueDateChange(newVal)}
            defaultValue={dayjs("2022-04-17")}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
