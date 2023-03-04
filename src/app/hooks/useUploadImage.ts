import S3 from "react-aws-s3-typescript";

const config = {
  bucketName: "bookstoreimages",
  dirName: "chat_images",
  region: "us-east-1",
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  s3Url: "https://bookstoreimages.s3.amazonaws.com",
};

const useUploadImage = () => {
  const ReactS3Client = new S3(config as any);
  const uploadImage = (file: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await ReactS3Client.uploadFile(file);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { uploadImage };
};

export default useUploadImage;
