import Post from "@/src/components/Post";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import useMutationComment from "@/src/app/hooks/useMutationComment";
import useUploadCommentImage from "@/src/app/hooks/useUploadCommentImage";
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
  const { doMutation: submitComment, loading } = useMutationComment(id);
  const { uploadImage } = useUploadCommentImage();
  const [img, setImg] = useState();
  const [base64Url, setBase64Url] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  useEffect(() => {
    if (commentInput || img) setDisableButton(false);
    else setDisableButton(true);
  }, [commentInput, img]);
  const handleOnInputChange = (e: any) => {
    setCommentInput(e.target.value);
  };
  const getBase64Url = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const handleOnChangeImageComment = (img: any) => {
    img.file.originFileObj && setImg(img.file.originFileObj);
    getBase64Url(img.file.originFileObj as RcFile, (url) => setBase64Url(url));
  };
  const handleOnDeleteAttachment = () => {
    setImg(undefined);
    setBase64Url("");
  };
  const handleOnCommentSubmit = () => {
    img && console.log(img);
    console.log(commentInput);
  };
  return (
    <Post
      id={id}
      name={name}
      content={content}
      onChange={handleOnChangeImageComment}
      base64Url={base64Url}
      onDelete={handleOnDeleteAttachment}
      onInputChange={handleOnInputChange}
      onSubmit={handleOnCommentSubmit}
      disableButton={disableButton}
      commentInput={commentInput}
    />
  );
}
