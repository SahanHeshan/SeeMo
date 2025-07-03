import type { Metadata } from "next";
import Team from "@/app/(pages)/about/team";
import { AnimatedGroup } from "@/components/ui/animated-group";

export const metadata: Metadata = {
  title: "About",
  description: "About Us page",
};
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
export default function AboutsPage() {
  return (
    <>
      <div className="pt-8"></div>

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
        <Team />
      </AnimatedGroup>
    </>
  );
}
