import ImgCrop from "antd-img-crop";
import { Upload, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styles from "./styles.module.less";
type UploadAvatarProps = {
  onChange: (img: any) => void;
};
export default function UploadAvatar({ onChange }: UploadAvatarProps) {
  const onImageChange = (upload: any) => {
    upload.file.originFileObj && onChange(upload.file.originFileObj);
  };
  return (
    <ImgCrop
      rotate
      quality={1}
      shape='round'
      modalTitle='Chỉnh sửa ảnh đại diện'
      modalCancel='Hủy'
      modalOk='Xác nhận'>
      <Upload
        showUploadList={false}
        onChange={onImageChange}
        accept='image/jpg, image/png, image/jpeg'>
        <Button className={styles.uploadBtn} icon={<EditOutlined />} />
      </Upload>
    </ImgCrop>
  );
}
