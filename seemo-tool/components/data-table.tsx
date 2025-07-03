// data-table.tsx
"use client";

import * as React from "react";
import SchemaBuilder from "@/components/schema-builder";
import CSVUpload from "@/app/dashboard/csvInput";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeSVG } from "qrcode.react";
import { z } from "zod";

type FieldType = "string" | "number" | "boolean";

type ColumnPreview = {
  name: string;
  include: boolean;
  type: FieldType;
  isPrimaryKey: boolean;
};

function getPrimaryKeyName(columns: ColumnPreview[]) {
  return columns.find((c) => c.isPrimaryKey)?.name;
}

function getRowForQR(row: any, columns: ColumnPreview[], pk: string) {
  const visibleCols = columns.filter((c) => c.include && !c.isPrimaryKey);
  return Object.fromEntries(visibleCols.map((c) => [c.name, row[c.name]]));
}

async function hashRow(row: object): Promise<string> {
  const encoder = new TextEncoder();
  const dataStr = JSON.stringify(row);
  const data = encoder.encode(dataStr);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function DataTable() {
  const [columns, setColumns] = React.useState<ColumnPreview[]>([]);
  const [previewData, setPreviewData] = React.useState<any[]>([]);
  const [schema, setSchema] = React.useState<z.ZodObject<any>>();
  const [data, setData] = React.useState<any[]>([]);
  const [hashes, setHashes] = React.useState<any[]>([]);

  const handleSchemaConfirm = () => {
    const pk = getPrimaryKeyName(columns);
    if (!pk) return alert("Please select a primary key.");

    const shape: Record<string, any> = {};
    for (const col of columns) {
      if (!col.include) continue;
      shape[col.name] =
        col.type === "number"
          ? z.string().or(z.number())
          : col.type === "boolean"
          ? z.boolean().or(z.string())
          : z.string();
    }

    const generated = z.object(shape);
    setSchema(generated);

    const validated = previewData
      .map((row) => {
        try {
          return generated.parse(row);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    setData(validated as any[]);
  };

  return (
    <Tabs defaultValue="load" className="w-full flex-col gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList>
          <TabsTrigger value="load">Load Data</TabsTrigger>
          <TabsTrigger value="send">Submit Data</TabsTrigger>
          <TabsTrigger value="get">Get QR</TabsTrigger>
        </TabsList>
      </div>

      {/* Load Data */}
      <TabsContent value="load" className="flex flex-col gap-4 px-4 lg:px-6">
        <CSVUpload
          onPreview={(cols, rows) => {
            setColumns(
              cols.map((col) => ({
                ...col,
                isPrimaryKey: col.isPrimaryKey ?? false,
              }))
            );
            setPreviewData(rows);
            setSchema(undefined);
            setData([]);
            setHashes([]);
          }}
        />

        {columns.length > 0 && (
          <SchemaBuilder columns={columns} onChange={setColumns} />
        )}

        {columns.length > 0 && (
          <Button onClick={handleSchemaConfirm}>
            Generate & Validate Data
          </Button>
        )}

        {data.length > 0 && (
          <pre className="mt-4 rounded-md bg-muted p-4 text-xs overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </TabsContent>

      {/* Send Data */}
      <TabsContent value="send" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed p-4 space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                const pk = getPrimaryKeyName(columns);
                if (!pk) return alert("Primary key not selected");

                const newHashes = await Promise.all(
                  data.map(async (row) => {
                    const hash = await hashRow(row);
                    return { [pk]: row[pk], hash };
                  })
                );
                setHashes(newHashes);
              }}
            >
              Generate Hashes
            </Button>
            <Button
              onClick={async () => {
                try {
                  await fetch("/api/upload-hashes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(hashes),
                  });
                  alert("Hashes sent!");
                } catch (err) {
                  console.error(err);
                  alert("Failed to send.");
                }
              }}
              disabled={hashes.length === 0}
            >
              Send Hashes to Server
            </Button>
          </div>

          {hashes.map((row, i) => (
            <div key={i} className="p-2 min-w-auto border rounded-md text-xs">
              <pre className="mt-2">{row.hash}</pre>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Get QR */}
      <TabsContent value="get" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {hashes.map((row, i) => {
              const pk = getPrimaryKeyName(columns);
              if (!pk) return null;
              const matched = data.find((d) => d[pk] === row[pk]);
              const qrPayload = getRowForQR(matched, columns, pk);
              const Verify = `www.seemo.com/verify/companyA/${row.hash}`;
              return (
                <div
                  key={i}
                  className="flex flex-col justify-center p-2 bg-white border rounded-md text-xs"
                >
                  <QRCodeSVG
                    value={JSON.stringify({ ...qrPayload, Verify })}
                    size={110}
                  />
                  <pre className="mt-2 text-black">
                    {row.hash.slice(0, 12)}...
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
