import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuveySubmissionSuccess() {
  return (
    <div className="px-2">
      <Card className="max-w-xl mx-auto my-20">
        <CardHeader>
          <CardTitle>Thank you for your submission!</CardTitle>
        </CardHeader>

        <CardContent>
          Your reponse has been recoreded. You can now close this page.
        </CardContent>
      </Card>
    </div>
  );
}
