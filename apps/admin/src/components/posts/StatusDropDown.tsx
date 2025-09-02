import { STATUS_OPTIONS } from "@/constants";
import type { Status } from "@/types-schemas";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { cn } from "@repo/ui/lib/utils";
import { ChevronDown } from "lucide-react";

const StatusDropDown = ({
  status,
  handleStatusOptionClick,
}: {
  status: Status;
  handleStatusOptionClick: (status: Status) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-primary hover:text-primary">
          {status ? status : "All"}
          <ChevronDown />
          <span className="sr-only">Toggle Status</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1 p-2">
        {STATUS_OPTIONS.map(({ status: selectedStatus, text }) => (
          <DropdownMenuItem
            key={text}
            onClick={() => handleStatusOptionClick(selectedStatus)}
            className={cn(
              "group cursor-pointer",
              selectedStatus === status && "border-primary border",
            )}
          >
            {text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropDown;
