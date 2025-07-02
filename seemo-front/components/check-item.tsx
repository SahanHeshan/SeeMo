import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SelectBrand } from "@/app/(pages)/verify-product/selectbrand";

export default function CheckItem() {
  return (
    <form action="" className="max-w-92 m-auto h-fit w-full">
      <div className="p-6">
        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed" />
          <span className="text-muted-foreground text-xs">
            1. Select the Brand
          </span>
          <hr className="border-dashed" />
        </div>

        <div className="mt-6">
          <SelectBrand />
        </div>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed" />
          <span className="text-muted-foreground text-xs">
            2. Enter the Code
          </span>
          <hr className="border-dashed" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm">
              Unique Code in the QR
            </Label>
            <Input type="email" required name="email" id="email" />
          </div>

          <Button className="w-full">Continue</Button>
        </div>
      </div>

      <p className="text-accent-foreground text-center text-sm">
        Have a Camera ?
        <Button asChild variant="link" className="px-2">
          <Link href="#">Scan QR</Link>
        </Button>
      </p>
    </form>
  );
}
