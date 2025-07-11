"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SelectBrand } from "@/components/selectBrand";
import { Loader2 } from "lucide-react"; // Spinner icon from lucide-react (or use any)

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export default function CheckItem({
  onResult,
}: {
  onResult: (res: {
    status: string;
    type: string;
    history: {
      attempt: number;
      date: string;
      time: string;
      location: string;
    }[];
  }) => void;
}) {
  const searchParams = useSearchParams();
  const [productHash, setProductHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hashFromURL = searchParams.get("product_hash") || "";
    const txFromURL = searchParams.get("tx_hash") || "";
    setProductHash(hashFromURL);
    setTxHash(txFromURL);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); // Start spinner

    try {
      const res = await fetch(SERVER_API + `/api/lookup/${txHash}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tx_hash: txHash,
          product_hash: productHash,
        }),
      });

      const json = await res.json();
      onResult(json);
    } catch (err) {
      console.error(err);
      onResult({ status: "error", type: "unknown", history: [] });
    } finally {
      setLoading(false); // Stop spinner
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-92 m-auto h-fit w-full">
      <div className="p-6 space-y-6">
        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed" />
          <span className="text-muted-foreground text-xs">
            1. Select the Brand
          </span>
          <hr className="border-dashed" />
        </div>

        <SelectBrand selected={brand} setSelected={setBrand} />

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed" />
          <span className="text-muted-foreground text-xs">
            2. Enter the First Product Code
          </span>
          <hr className="border-dashed" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hash">Unique Code 1</Label>
          <Input
            id="hash"
            required
            value={productHash}
            onChange={(e) => setProductHash(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed" />
          <span className="text-muted-foreground text-xs">
            3. Enter the Second Product Code
          </span>
          <hr className="border-dashed" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tsx">Unique Code 2</Label>
          <Input
            id="tsx"
            required
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button className="w-full mt-4" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div>

      <p className="text-accent-foreground text-center text-sm">
        Have a Camera?
        <Button asChild variant="link" className="px-2" disabled={loading}>
          <Link href="#">Scan QR</Link>
        </Button>
      </p>
    </form>
  );
}
