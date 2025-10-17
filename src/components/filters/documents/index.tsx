import {
  Button,
  Checkbox,
  Modal,
  Popover,
  Select,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import { RcFile } from "antd/es/upload";
import { ImportIcon, Settings2Icon, XIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useDocumentsColumns } from "@/components/columns/useDocumentsColumns";
import { DebounceInput } from "@/components/debounce-input";
import { useDisclosure } from "@/hooks";
import { DocumentSearch } from "@/schemas";
import { useExperimentSelect } from "@/services/experiment.service";
import { useTemplateUpload } from "@/services/templates.service";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function DocumentListFilters() {
  const columns = useDocumentsColumns();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hideOptions = useMemo(
    () =>
      columns.map((column) => ({
        label: column.title as string,
        value: column.key as string,
      })),
    [columns]
  );

  const { hide, experimentId } = useSearch({
    from: "/dashboard/documents/",
  });
  const navigate = useNavigate({ from: "/dashboard/documents" });

  const hideValues = useMemo(
    () =>
      hideOptions
        .map((option) => option.value?.toString())
        .filter((option) => !hide?.includes(option)),
    [hide, hideOptions]
  );

  const handleHideChange = useCallback(
    (value: (string | undefined)[]) => {
      const valueDifference = hideOptions
        .filter((option) => !value.includes(option.value?.toString()))
        .map((option) => option.value?.toString());
      navigate({
        search: (prev) => ({
          ...prev,
          hide: valueDifference.length ? valueDifference : undefined,
        }),
      });
    },
    [hideOptions, navigate]
  );

  const handleFilterChange = (
    key: keyof DocumentSearch,
    value?: string | string[]
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value?.length ? value : undefined }),
    });
  };

  const handleClear = () => {
    navigate({
      search: {
        experimentId: undefined,
        hide: undefined,
      },
    });
  };

  const isFiltersApplied = useMemo(
    () => Boolean(experimentId) || Boolean(hide?.length),
    [experimentId, hide]
  );

  const [fileList, setFileList] = useState<UploadFile<File>[]>([]);
  const [expId, setExpId] = useState<string | undefined>("");
  const { mutateAsync, isPending } = useTemplateUpload();
  const { data: experimentsOptions, isLoading } = useExperimentSelect();

  const handleSelectChange = (value: string) => {
    setExpId(value);
  };

  const handleImport = () => {
    if (!fileList.length) return toast.error("Nenhum arquivo selecionado!");
    if (!expId) return toast.error("Nenhum experimento selecionado!");

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("zip", file as RcFile);
    });
    mutateAsync({ data: formData, id: Number(expId) }).then((res) => {
      toast.success("Template importado com sucesso!");
      navigate({
        to: "/dashboard/documents/edit/$id",
        params: { id: res.templateId.toString() },
      });
      onClose();
    });
  };

  return (
    <div className="flex w-full justify-between pb-2">
      <div className="flex space-x-2">
        <DebounceInput
          search
          placeholder="Pesquisar por id do experimento"
          className="w-80"
          value={experimentId}
          onChange={(value) => handleFilterChange("experimentId", value)}
          type="number"
          min={1}
        />
        {isFiltersApplied && (
          <Button icon={<XIcon className="h-4 w-4" />} onClick={handleClear}>
            Limpar
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        <Button icon={<ImportIcon className="h-4 w-4" />} onClick={onOpen}>
          Importar
        </Button>
        <Popover
          trigger={"click"}
          placement="bottomRight"
          title="Colunas"
          content={
            <Checkbox.Group
              className="flex flex-col space-y-1"
              options={hideOptions}
              value={hideValues}
              onChange={handleHideChange}
            />
          }
        >
          <Button icon={<Settings2Icon className="h-4 w-4" />}>Colunas</Button>
        </Popover>
      </div>
      <Modal
        title="Importar"
        open={isOpen}
        onCancel={onClose}
        onOk={handleImport}
        confirmLoading={isPending}
      >
        <Typography.Text className="mb-2">
          Selecione o experimento que deseja importar o template
        </Typography.Text>
        <Select
          className="w-full"
          loading={isLoading}
          allowClear
          optionFilterProp="label"
          showSearch
          options={experimentsOptions}
          placeholder="Selecione um experimento"
          onChange={handleSelectChange}
          value={expId}
        />
        <div className="mb-4 mt-4 flex flex-col space-y-2">
          <span>
            O arquivo a ser importado precisa ser um arquivo .<code>zip</code> e
            precisa seguir alguns padrões para ser reconhecido pelo sistema.
          </span>
          <span className="font-bold">
            Dentro do arquivo zip, devem existir os arquivos e pastas:
          </span>
          <ul className="list-disc list-inside">
            <li>
              arquivo <code>index.html</code>
            </li>
            <li>
              pasta <code>media</code> com os arquivos de imagem
            </li>
          </ul>
        </div>

        <Upload.Dragger
          maxCount={1}
          fileList={fileList}
          onRemove={(file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
          }}
          beforeUpload={(file) => {
            const isZip = file.type === "application/zip";
            const isZipCompressed =
              file.type === "application/x-zip-compressed";
            if (fileList.length === 1) {
              toast.error("Apenas um arquivo pode ser importado!");
              return Upload.LIST_IGNORE;
            }

            if (!isZip && !isZipCompressed) {
              toast.error(`${file.name} não é um arquivo válido!`);
              return Upload.LIST_IGNORE;
            }
            setFileList((prev) => {
              const files = [...prev];
              files.push(file);
              return files;
            });

            return isZip || isZipCompressed ? false : Upload.LIST_IGNORE;
          }}
          accept={["application/zip", "application/x-zip-compressed"].join(",")}
          showUploadList
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Clique ou arraste o arquivo para esta área para carregar
          </p>
          <p className="ant-upload-hint">
            Suporte para um carregamento único. Estritamente proibido de fazer
            upload de dados da empresa ou outros arquivos proibidos.
          </p>
        </Upload.Dragger>
      </Modal>
    </div>
  );
}
