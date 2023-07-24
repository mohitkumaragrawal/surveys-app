"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { Input } from "@/components/ui/input";

interface Props {
  questionId: string;
  defaultValue: string;
  placeholder: string;
}

export default function SurveyInput({
  questionId,
  defaultValue,
  placeholder,
}: Props) {
  const [value, setValue] = useLocalStorage(
    questionId,
    "",
    defaultValue === "" ? null : defaultValue
  );

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
}
