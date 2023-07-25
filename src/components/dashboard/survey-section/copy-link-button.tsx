"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  surveyId: string;
}

export default function CopyLinkButton({ surveyId }: Props) {
  const { toast } = useToast();

  const handleClick = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/survey/${surveyId}`
    );

    toast({
      title: "Link copied to clipboard",
      description: "You can share this link to your target audience!",
    });
  };

  return <Button onClick={handleClick}>Copy Link</Button>;
}
