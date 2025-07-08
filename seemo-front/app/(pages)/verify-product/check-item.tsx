"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SelectBrand } from "@/components/selectBrand";

export default function CheckItem({
  onResult,
}: {
  onResult: (res: { status: string; type: string }) => void;
}) {
  const searchParams = useSearchParams();

  const [productHash, setProductHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [brand, setBrand] = useState("");
  const [result, setResult] = useState<{ status: string; type: string } | null>(
    null
  );

  useEffect(() => {
    const hashFromURL = searchParams.get("product_hash") || "";
    const txFromURL = searchParams.get("tx_hash") || "";
    setProductHash(hashFromURL);
    setTxHash(txFromURL);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/lookup/${txHash}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_hash: productHash,
        }),
      });

      const json = await res.json(); // { status, type }
      onResult(json); // 👈 send result to parent
    } catch (err) {
      console.error(err);
      onResult({ status: "error", type: "unknown" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-92 m-auto h-fit w-full">
      <div className="p-6">
        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed" />
          <span className="text-muted-foreground text-xs">
            1. Select the Brand
          </span>
          <hr className="border-dashed" />
        </div>

        <div className="mt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <SelectBrand selected={brand} setSelected={setBrand} />
            </div>
          </div>
        </div>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed" />
          <span className="text-muted-foreground text-xs">
            2. Enter the Product Code
          </span>
          <hr className="border-dashed" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hash" className="block text-sm">
              Unique Code 1
            </Label>
            <Input
              type="text"
              required
              name="hash"
              id="hash"
              value={productHash}
              onChange={(e) => setProductHash(e.target.value)}
            />
          </div>
        </div>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed" />
          <span className="text-muted-foreground text-xs">
            3. Enter the Transaction Hash
          </span>
          <hr className="border-dashed" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tsx" className="block text-sm">
              Unique Code 2
            </Label>
            <Input
              type="text"
              required
              name="tsx"
              id="tsx"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
            />
          </div>

          <Button className="w-full" type="submit">
            Continue
          </Button>
        </div>
      </div>

      <p className="text-accent-foreground text-center text-sm">
        Have a Camera?
        <Button asChild variant="link" className="px-2">
          <Link href="#">Scan QR</Link>
        </Button>
      </p>
    </form>
  );
}
