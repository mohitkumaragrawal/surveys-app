import SurveySection from "@/components/dashboard/survey-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <>
      <Suspense fallback={<Skeleton className="h-20" />}>
        <SurveySection />
      </Suspense>
    </>
  );
}
