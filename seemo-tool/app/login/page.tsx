import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/app/dashboard/chart-area-interactive";
import DataTable from "@/app/Generate/data-table";
import { SectionCards } from "@/app/dashboard/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { LoginForm } from "./login-form";
import { Card, CardContent } from "@/components/ui/card";

export default function Generate() {
  return (
    <>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                  <LoginForm />{" "}
                  <div className="bg-muted relative hidden md:block">
                    <img
                      src="/placeholder.svg"
                      alt="Image"
                      className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
