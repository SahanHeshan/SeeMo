import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon, InfoIcon } from "lucide-react";

export function ResultList({
  result,
}: {
  result: { status: string;
    type: string;
    history:{attempt: number; date: string; time: string; location: string}[]; } | null;
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
        <br />
      </AlertDescription>

      {result.history.length > 0 && (
          <div className="mt-4 w-full overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-300 rounded-lg bg-white text-black">
              <thead className="bg-gray-100 text-xs uppercase font-medium">
              <tr>
                <th className="px-4 py-2">Attempt</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Location</th>
              </tr>
              </thead>
              <tbody>
              {result.history.map((entry, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{entry.attempt}</td>
                    <td className="px-4 py-2">{entry.date}</td>
                    <td className="px-4 py-2">{entry.time}</td>
                    <td className="px-4 py-2">{entry.location}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
      )}

    </Alert>
  );
}
