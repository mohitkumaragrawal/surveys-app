import SurveySection from "@/components/dashboard/survey-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <>
      <Suspense
        fallback={<Skeleton className="h-30 max-w-3xl mx-auto my-[5rem]" />}
      >
        <SurveySection />
      </Suspense>
    </>
  );
}
