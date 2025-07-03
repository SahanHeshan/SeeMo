// schema-builder.tsx
"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type FieldType = "string" | "number" | "boolean";

export type ColumnPreview = {
  name: string;
  include: boolean;
  type: FieldType;
  isPrimaryKey: boolean;
};

export default function SchemaBuilder({
  columns,
  onChange,
}: {
  columns: ColumnPreview[];
  onChange: (updated: ColumnPreview[]) => void;
}) {
  const updateColumn = (index: number, changes: Partial<ColumnPreview>) => {
    const updated = [...columns];
    updated[index] = { ...updated[index], ...changes };
    onChange(updated);
  };

  const handlePrimaryKeyChange = (index: number) => {
    const updated = columns.map((col, i) => ({
      ...col,
      isPrimaryKey: i === index,
    }));
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Adjust Schema</h3>
      <div className="space-y-2">
        {columns.map((col, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={col.name}
              onChange={(e) => updateColumn(i, { name: e.target.value })}
              className="w-1/4"
            />
            <Select
              value={col.type}
              onValueChange={(val) =>
                updateColumn(i, { type: val as FieldType })
              }
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
              </SelectContent>
            </Select>
            <Switch
              checked={col.include}
              onCheckedChange={(val) => updateColumn(i, { include: val })}
            />
            <Label className="flex items-center space-x-1">
              <input
                type="radio"
                name="primaryKey"
                checked={col.isPrimaryKey}
                onChange={() => handlePrimaryKeyChange(i)}
              />
              <span className="text-sm">Unique Id</span>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
