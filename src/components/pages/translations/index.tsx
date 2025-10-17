import { Space } from "antd";
import { DownloadLocaleForm } from "./form/download-locale";
import { UploadLocaleForm } from "./form/upload-locale";

export function TranslationsListPage() {
  return (
    <Space direction="vertical">
      <DownloadLocaleForm />
      <UploadLocaleForm />
    </Space>
  );
}
