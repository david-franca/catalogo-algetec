import { Space } from "antd";

import { ScrollArea } from "@/components/scrool-area";

import { DesignerCompetenceSkills } from "./components/competence_skills";
import { DesignerConcepts } from "./components/concepts";
import { DesignerDescription } from "./components/description";
import { DesignerHeader } from "./components/header";
import { DesignerKnowledgeObjects } from "./components/knowledge_objects";
import { DesignerMaterials } from "./components/materials";
import { DesignerObjectives } from "./components/objectives";
import { DesignerProcedures } from "./components/procedures";
import { DesignerResultAnalysis } from "./components/result_analysis";
import { DesignerSkills } from "./components/skills";

export function DesignerPage() {
  return (
    <div className="bg-white dark:bg-slate-950 rounded-md shadow-md p-6 mb-6 ml-4 h-full">
      <ScrollArea className="max-h-full max-w-full space-y-2">
        <Space direction="vertical" className="w-full">
          <DesignerHeader />
          <DesignerMaterials />
          {/* 7. Procedimentos */}
          <DesignerProcedures />
          {/* 8. Análise dos Resultados */}
          <DesignerResultAnalysis />
          {/* 1. Descrição do Experimento e Objetivo Geral */}
          <DesignerDescription />
          {/* 2. Conceitos */}
          <DesignerConcepts />
          {/* 3. Habilidades */}
          <DesignerSkills />
          {/* 4. Objetivos de Aprendizagem */}
          <DesignerObjectives />
          {/* 5. Objetos de Conhecimento Aplicáveis */}
          <DesignerKnowledgeObjects />
          {/* 6. Habilidades e Competências */}
          <DesignerCompetenceSkills />
        </Space>
      </ScrollArea>
    </div>
  );
}
