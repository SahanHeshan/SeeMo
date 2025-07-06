// csvInput.tsx
"use client";

import { Input } from "@/components/ui/input";
import Papa from "papaparse";

type ColumnPreview = {
  name: string;
  include: boolean;
  type: "string" | "number" | "boolean";
  isPrimaryKey?: boolean;
};

export default function CSVUpload({
  onPreview,
}: {
  onPreview: (columns: ColumnPreview[], rows: any[]) => void;
}) {
  const inferType = (values: string[]): ColumnPreview["type"] => {
    if (values.every((v) => !isNaN(Number(v)))) return "number";
    if (values.every((v) => ["true", "false"].includes(v.toLowerCase())))
      return "boolean";
    return "string";
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];
        const firstRow = rows[0];

        const columns: ColumnPreview[] = Object.keys(firstRow).map((key) => {
          const values = rows.map((r) => r[key]).slice(0, 5); // sample 5 values
          return {
            name: key,
            include: true,
            type: inferType(values),
            isPrimaryKey: false,
          };
        });

        onPreview(columns, rows);
      },
    });
  };

  return (
    <Input id="csv" type="file" accept=".csv" onChange={handleCSVUpload} />
  );
}
