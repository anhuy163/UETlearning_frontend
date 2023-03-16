import S3 from "react-aws-s3-typescript";

const config = {
  bucketName: "bookstoreimages",
  dirName: "avatar",
  region: "us-east-1",
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  s3Url: "https://bookstoreimages.s3.amazonaws.com",
};

const useUploadAvatar = () => {
  const ReactS3Client = new S3(config as any);
  const uploadAvatar = (file: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await ReactS3Client.uploadFile(file);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { uploadAvatar };
};

export default useUploadAvatar;
