import Post from "@/src/components/Post";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import useMutationComment from "@/src/app/hooks/useMutationComment";
import useUploadCommentImage from "@/src/app/hooks/useUploadCommentImage";
import useQueryGetPostById from "@/src/app/hooks/useQueryGetPostById";
import { useRouter } from "next/router";
import FormWrapper from "../FormWrapper/FormWrapper";

export default function PostContainer() {
  const router = useRouter();
  const { doMutation: submitComment, loading } = useMutationComment(
    router.query.id as string
  );
  const { uploadImage } = useUploadCommentImage();
  const {
    data: post,
    loading: gettingPost,
    error,
  } = useQueryGetPostById(router.query.id as string);

  const [img, setImg] = useState();
  const [base64Url, setBase64Url] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
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

  // console.log(post?.teacherAnswerResponses);

  const getImageName = async (image: any) => {
    try {
      setUploadingImage(true);
      const res = await uploadImage(image);
      // console.log(res);
      setUploadingImage(false);
      return (res as any)?.location;
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleOnDeleteAttachment = () => {
    setImg(undefined);
    setBase64Url("");
  };
  const handleOnCommentSubmit = async () => {
    let imgSrc = "";
    if (img) {
      imgSrc = await getImageName(img);
    }
    // console.log(imgSrc);

    // console.log({
    //   teacherId: localStorage.getItem("teacherId"),
    //   questionId: post?.questionDetail?.id,
    //   content: commentInput,
    //   imgUrls: [imgSrc],
    // });

    submitComment({
      teacherId: localStorage.getItem("teacherId"),
      questionId: post?.questionDetail?.id,
      content: commentInput,
      imgUrls: [imgSrc],
    }).then((res) => {
      // console.log(res);
      setCommentInput("");
      setImg(undefined);
      setBase64Url("");
    });
  };
  // console.log(post);

  return (
    <FormWrapper loading={gettingPost || loading || uploadingImage}>
      <Post
        id={router.query.id as string}
        name={post?.studentDTO?.realName}
        authorAva={post?.studentDTO?.avaPath}
        postImgs={post?.questionDetail?.imgUrls}
        createdTime={post?.questionDetail?.createTime}
        content={post?.questionDetail?.content}
        onChange={handleOnChangeImageComment}
        base64Url={base64Url}
        onDelete={handleOnDeleteAttachment}
        onInputChange={handleOnInputChange}
        onSubmit={handleOnCommentSubmit}
        disableButton={disableButton}
        commentInput={commentInput}
        comments={post?.teacherAnswerResponses}
        solved={post?.questionDetail?.hasBestAnswer}
        attachment={post?.questionDetail?.filePaths}
      />
    </FormWrapper>
  );
}
