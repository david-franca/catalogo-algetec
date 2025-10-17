import { Form, Input, Select, Upload, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { Dispatch, SetStateAction } from "react";

import { useIssueTagSelect } from "@/services/issueTag.service";
import { ISSUES_STATUS } from "@/types/issue";
import { PRIORITY } from "@/utils/handlePriority";
import { InboxOutlined } from "@ant-design/icons";

import { acceptMimeTypes } from "./mimeTypes";

interface Props {
  newActiveKey: string;
  fileList: {
    [x: string]: UploadFile<RcFile>[];
  };
  setFileList: Dispatch<
    SetStateAction<{
      [x: string]: UploadFile<RcFile>[];
    }>
  >;
}

export function IssuesItem({ newActiveKey, fileList, setFileList }: Props) {
  const { data: issueTagOptions, isFetching: issueTagLoading } =
    useIssueTagSelect();

  return (
    <>
      <Form.Item
        label="Status"
        name={["problems", newActiveKey, "status"]}
        rules={[
          {
            required: true,
            message: "Por favor, selecione uma opção.",
          },
        ]}
      >
        <Select
          allowClear
          options={[
            {
              label: ISSUES_STATUS.NEW,
              value: ISSUES_STATUS.NEW,
            },
            {
              label: ISSUES_STATUS.IS_NOT_ERROR,
              value: ISSUES_STATUS.IS_NOT_ERROR,
            },
            {
              label: ISSUES_STATUS.DUPLICATE,
              value: ISSUES_STATUS.DUPLICATE,
            },
            {
              label: ISSUES_STATUS.NO_REMOVE,
              value: ISSUES_STATUS.NO_REMOVE,
            },
            {
              label: ISSUES_STATUS.RESOLVED,
              value: ISSUES_STATUS.RESOLVED,
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Problema"
        name={["problems", newActiveKey, "problem"]}
        rules={[
          {
            required: true,
            message: "O título do problema é obrigatório",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descrição"
        name={["problems", newActiveKey, "description"]}
      >
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item
        label="Gravidade"
        name={["problems", newActiveKey, "priority"]}
        rules={[
          {
            required: true,
            message: "Por favor, selecione uma opção.",
          },
        ]}
      >
        <Select
          allowClear
          options={[
            {
              label: "Baixa",
              value: PRIORITY.LOW,
            },
            {
              label: "Normal",
              value: PRIORITY.NORMAL,
            },
            {
              label: "Alta",
              value: PRIORITY.HIGH,
            },
            {
              label: "Critica",
              value: PRIORITY.CRITICAL,
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="Ambiente" name={["problems", newActiveKey, "tags"]}>
        <Select
          allowClear
          showSearch
          mode="multiple"
          options={issueTagOptions}
          loading={issueTagLoading}
        />
      </Form.Item>
      <Form.Item label="Arquivos" name={["problems", newActiveKey, "files"]}>
        <Upload.Dragger
          fileList={fileList[newActiveKey]}
          onRemove={(file) => {
            const index = fileList[newActiveKey].indexOf(file);
            const newFileList = fileList[newActiveKey].slice();
            newFileList.splice(index, 1);
            setFileList((prev) => ({
              ...prev,
              [newActiveKey]: newFileList,
            }));
          }}
          beforeUpload={(file) => {
            setFileList((prev) => {
              const files = prev[newActiveKey] || [];
              files.push(file);
              return { ...prev, [newActiveKey]: files };
            });
            return false;
          }}
          accept={acceptMimeTypes.join(", ")}
          showUploadList
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Clique ou arraste o arquivo para esta área para carregar
          </p>
          <p className="ant-upload-hint">
            Suporte para um carregamento único ou em massa. Estritamente
            proibido de fazer upload de dados da empresa ou outros arquivos
            proibidos.
          </p>
        </Upload.Dragger>
      </Form.Item>
    </>
  );
}
