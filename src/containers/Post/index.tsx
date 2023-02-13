import Post from "@/src/components/Post";

type PostContainerProps = {
  id: string;
  name: string;
  content: string;
  img?: string;
};

export default function PostContainer({
  id,
  name,
  content,
}: PostContainerProps) {
  return <Post id={id} name={name} content={content} />;
}
