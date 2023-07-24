import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default function SuveySubmissionFailed(props: Props) {
  return (
    <div className="px-2">
      <Card className="max-w-xl mx-auto my-20">
        <CardHeader>
          <CardTitle>Something went wrong!</CardTitle>
        </CardHeader>

        <CardContent>
          Your reponse could not be recorded. Please try again later.
        </CardContent>

        <CardFooter>
          <Link href={`/survey/${props.params.id}`}>
            <Button>Try Again</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
