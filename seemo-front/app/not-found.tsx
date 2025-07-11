import Link from "next/link";
import { TextEffect } from "@/components/ui/text-effect";

export default function NotFoundTitle() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-48">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="text-balance text-5xl font-medium md:text-6xl"
        >
          This Page is Under Construction | Not Found
        </TextEffect>
      </div>
    </div>
  );
}
