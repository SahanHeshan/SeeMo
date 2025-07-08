import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon, InfoIcon } from "lucide-react";

export function ResultList({
  result,
}: {
  result: { status: string; type: string } | null;
}) {
  if (!result) {
    return (
      <Alert
        variant="default"
        className="mb-4 text-center flex flex-col items-center bg-accent text-yellow-800"
      >
        <InfoIcon className="w-10 h-10 mb-2" />
        <AlertTitle className="text-xl font-bold">No Scan Yet</AlertTitle>
        <AlertDescription>
          Scan a QR or enter a hash to get started.
        </AlertDescription>
      </Alert>
    );
  }

  const isValid = result.status.toLowerCase() === "verified";
  const isInvalid = result.status.toLowerCase() === "invalid";

  return (
    <Alert
      variant="default"
      className={`mb-4 text-center flex flex-col items-center ${
        isValid
          ? "bg-accent text-green-800"
          : isInvalid
          ? "bg-accent text-red-800"
          : "bg-accent text-yellow-800"
      }`}
    >
      {isValid ? (
        <CheckCircle2Icon className="w-50 h-50 mb-2" />
      ) : isInvalid ? (
        <AlertCircleIcon className="w-50 h-50 mb-2" />
      ) : (
        <InfoIcon className="w-50 h-50 mb-2" />
      )}

      <AlertTitle className="text-xl font-bold">
        {isValid
          ? "Valid Transaction"
          : isInvalid
          ? "Invalid Transaction"
          : "Unverified"}
      </AlertTitle>

      <AlertDescription className="mt-1">
        Status: <span className="font-medium">{result.status}</span>
        <br />
        Type: <span className="text-muted-foreground">{result.type}</span>
      </AlertDescription>
    </Alert>
  );
}
