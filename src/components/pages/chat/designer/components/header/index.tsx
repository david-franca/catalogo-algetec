import { Button, Card, Empty, Modal, Space, Typography, Upload } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { UploadFile } from "antd/lib";
import {
  Edit2Icon,
  ImportIcon,
  SettingsIcon,
  SignatureIcon,
  SparkleIcon,
} from "lucide-react";
import { lazy, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { fromError } from "zod-validation-error";

import { useDisclosure } from "@/hooks";
import { updateSystemContext } from "@/hooks/useChat";
import { useDesigner } from "@/hooks/useDesigner";
import {
  useEvaluateSkills,
  useKnowledgeObjects,
  useReviewQuestions,
  useReviewScripts,
} from "@/services/designer.service";
import { readFileContent } from "@/utils/fileReader";

import { readRoteiro } from "../../../prompt";
import { useImportRoteiro } from "@/services/chat.service";
import { nanoid } from "nanoid";

const DesignerHeaderEditModal = lazy(() => import("./edit-modal"));
const DesignerHeaderIaModal = lazy(() => import("./ia-modal"));

const { confirm } = Modal;

export function DesignerHeader() {
  const editModal = useDisclosure();
  const iaModal = useDisclosure();
  const [importing, setImporting] = useState(false);
  const [start, setStart] = useState(false);

  const {
    area_of_knowledge,
    name,
    requestResult,
    setNecessaryMaterials,
    setProcedures,
    setResultAnalysis,
    setRequestResult,
  } = useDesigner();

  const { mutate: knowledgeObjects } = useKnowledgeObjects();
  const { mutate: evaluateSkills } = useEvaluateSkills();
  const { mutate: reviewScripts } = useReviewScripts();
  const { mutate: reviewQuestions } = useReviewQuestions();
  const { mutateAsync: importRoteiro } = useImportRoteiro();

  useEffect(() => {
    if (start && requestResult) {
      if (requestResult.status === "completed") {
        if (requestResult.type === "description") {
          setRequestResult({
            status: "ongoing",
            type: "concepts",
            id: 0,
          });
        }

        if (requestResult.type === "concepts") {
          setRequestResult({
            status: "ongoing",
            type: "skills",
            id: 0,
          });
        }

        if (requestResult.type === "skills") {
          setRequestResult({
            status: "ongoing",
            type: "learning-objectives",
            id: 0,
          });
        }

        if (requestResult.type === "learning-objectives") {
          knowledgeObjects("");
        }

        if (requestResult.type === "knowledge-objects") {
          evaluateSkills("");
        }

        if (requestResult.type === "evaluate-skills") {
          reviewScripts("");
        }

        if (requestResult.type === "review-script") {
          reviewQuestions("");
        }

        if (requestResult.type === "review-question") {
          setStart(false);
          setRequestResult(undefined);
        }
      }
    }

    if (requestResult?.status === "error") {
      setStart(false);
    }
  }, [
    start,
    requestResult,
    setRequestResult,
    knowledgeObjects,
    evaluateSkills,
    reviewScripts,
    reviewQuestions,
  ]);

  const handleImportChange = async (
    info: UploadChangeParam<UploadFile<File>>
  ) => {
    if (info.file) {
      setImporting(true);
      try {
        const file = info.file as unknown as File;
        const content = await readFileContent(file);
        const prompt = readRoteiro(content);
        const res = await importRoteiro({
          messages: [
            {
              id: nanoid(),
              role: "user",
              content: prompt,
              createAt: Date.now(),
              updateAt: Date.now(),
            },
          ],
        });

        console.log({
          res,
        });

        if (typeof res !== "number" && typeof res !== "string") {
          updateSystemContext({
            script: {
              necessary_materials: res.necessary_materials,
              procedures: res.procedures,
              result_analysis: res.result_analysis,
            },
          });
          setNecessaryMaterials(res.necessary_materials.map((m) => m.item));
          setProcedures(res.procedures);
          setResultAnalysis({ result_analysis: res.result_analysis });
        }

        setImporting(false);
      } catch (error) {
        const validError = fromError(error);
        setImporting(false);
        toast.error(`Erro ao importar roteiro. ${validError.message}`);
      }
    }
  };

  const showConfirm = useCallback(() => {
    confirm({
      title: "Gerar o conteúdo de todas as seções?",
      content: (
        <Space>
          <Typography.Text>
            Essa operação poderá levar alguns minutos.
          </Typography.Text>
        </Space>
      ),
      onOk() {
        setRequestResult({
          status: "ongoing",
          type: "description",
          id: 0,
        });
        setStart(true);
      },
      onCancel() {},
    });
  }, [setRequestResult]);

  return (
    <Space direction="vertical" className="w-full">
      <div className="flex align-center justify-end gap-2 w-full">
        <Upload
          showUploadList={false}
          beforeUpload={async (file) => {
            const isTXT = file.type === "text/plain";
            const isPDF = file.type === "application/pdf";
            const isDOC =
              file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            if (!isTXT && !isPDF && !isDOC) {
              toast.error(`${file.name} não é um arquivo válido!`);
              return Upload.LIST_IGNORE;
            }

            return isTXT || isPDF || isDOC ? false : Upload.LIST_IGNORE;
          }}
          onChange={handleImportChange}
          maxCount={1}
          accept={[
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
          ].join(",")}
        >
          <Button
            type="default"
            icon={<ImportIcon className="h-4 w-4" />}
            loading={importing}
          >
            Importar roteiro
          </Button>
        </Upload>

        <Button
          type="default"
          onClick={showConfirm}
          icon={<SparkleIcon className="h-4 w-4" />}
        >
          Gerar todas as seções
        </Button>
        <Button
          icon={<SettingsIcon className="h-4 w-4" />}
          type="text"
          shape="circle"
          onClick={iaModal.onOpen}
        />
      </div>
      <Card
        title={
          <Space align="center">
            <SignatureIcon className="h-4 w-4" />
            <Typography.Text strong>
              Título e Área de Conhecimento
            </Typography.Text>
          </Space>
        }
        extra={
          <Space>
            <Button
              icon={<Edit2Icon className="h-4 w-4" />}
              type="text"
              shape="circle"
              onClick={editModal.onOpen}
            />
          </Space>
        }
      >
        <div className="flex flex-col">
          {name && area_of_knowledge ? (
            <>
              <Typography.Title level={2}>{name}</Typography.Title>
              <Typography.Text strong>{area_of_knowledge}</Typography.Text>
            </>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Sem título"
            />
          )}
        </div>

        <DesignerHeaderEditModal
          isOpen={editModal.isOpen}
          onClose={editModal.onClose}
        />
        <DesignerHeaderIaModal
          isOpen={iaModal.isOpen}
          onClose={iaModal.onClose}
        />
      </Card>
    </Space>
  );
}
