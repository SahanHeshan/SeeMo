"use client";
import { Suspense, useState, useRef, useEffect } from "react";
import CheckItem from "@/app/(pages)/verify-product/check-item";
import { ResultList } from "@/app/(pages)/verify-product/result";
import { Card } from "@/components/ui/card";
import { AnimatedGroup } from "@/components/ui/animated-group";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function VerifyProduct() {
  const [result, setResult] = useState<{
    status: string;
    type: string;
    history: {
      attempt: number;
      date: string;
      time: string;
      location: string;
    }[];
  } | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  return (
    <section className="py-24 md:py-4">
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.75,
              },
            },
          },
          ...transitionVariants,
        }}
        className="mt-12"
      >
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl px-4 py-8">
            <div className="w-full lg:w-1/2">
              <Card className="p-6">
                <Suspense>
                  <CheckItem onResult={setResult} />
                </Suspense>
              </Card>
            </div>
            <div className="w-full lg:w-2/3" ref={resultRef}>
              <Card className="p-6 h-full">
                <ResultList result={result} />
              </Card>
            </div>
          </div>
        </div>
      </AnimatedGroup>
    </section>
  );
}
