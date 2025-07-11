import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon, InfoIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function ResultList({
  result,
}: {
  result: {
    status: string;
    type: string;
    history: {
      attempt: number;
      date: string;
      time: string;
      location: string;
    }[];
  } | null;
}) {
  if (!result) {
    return (
      <Alert
        variant="default"
        className="mb-4 text-center flex flex-col items-center bg-accent text-yellow-800"
      >
        <InfoIcon className="!w-24 !h-24 mb-6" />
        <AlertTitle className="text-xl font-bold">No Scan Yet</AlertTitle>
        <AlertDescription>
          Scan a QR or enter the Unique codes to get started.
        </AlertDescription>
      </Alert>
    );
  }

  const isValid = result.status.toLowerCase() === "verified";
  const isInvalid = result.status.toLowerCase() === "invalid";

  return (
    <Alert
      variant="default"
      className={` mb-4 text-center flex flex-col items-center ${
        isValid
          ? "bg-accent text-green-800"
          : isInvalid
          ? "bg-accent text-red-800"
          : "bg-accent text-yellow-800"
      }`}
    >
      {isValid && result.history.length > 1 ? (
        <AlertCircleIcon className="!w-24 !h-24 mb-6 text-red-700" />
      ) : isValid ? (
        <CheckCircle2Icon className="!w-24 !h-24 mb-6 text-green-700" />
      ) : isInvalid ? (
        <AlertCircleIcon className="!w-24 !h-24 mb-6 text-red-700" />
      ) : (
        <InfoIcon className="!w-24 !h-24 mb-6 text-yellow-700" />
      )}

      <AlertTitle className="text-xl font-bold">
        {isValid && result.history.length > 1
          ? "Suspicious: Too Many Scans"
          : isValid
          ? "Genuine Product"
          : isInvalid
          ? "Invalid Codes"
          : "Unverified Product"}
      </AlertTitle>

      <AlertDescription className="mt-1">
        Status: <span className="font-medium">{result.status}</span>
        <br />
        Type: <span className="text-muted-foreground">{result.type}</span>
        <br />
      </AlertDescription>

      {Array.isArray(result.history) && result.history.length > 0 && (
        <div>
          <Table className="text-secondary-foreground">
            <TableCaption>
              Too many attempts may indicate a counterfit product.
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Attempt</TableHead>
                <TableHead className="w-[150px] text-center">Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {result.history.map((entry, index) => {
                const isLast = index === result.history.length - 1;
                return (
                  <TableRow
                    key={index}
                    className={
                      isLast
                        ? "bg-primary text-black  hover:text-secondary-foreground"
                        : ""
                    }
                  >
                    <TableCell className="font-medium text-left">
                      {entry.attempt}
                    </TableCell>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.time}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </Alert>
  );
}
