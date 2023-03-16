import QuestionPost from "@/src/components/QuestionPost";
import { QuestionPopProps } from "@/src/components/QuestionPost";

export default function QuestionPostContainer({
  id,
  name,
  content,
}: QuestionPopProps) {
  return <QuestionPost id={id} name={name} content={content} />;
}
