import { Card, Empty } from "antd";
import parse from "html-react-parser";

import { useParams } from "@tanstack/react-router";
import { useDocument } from "@/services/documents.service";

export function DocumentShowForm() {
  const { id } = useParams({ from: "/dashboard/documents/show/$id" });
  const { data: templateData } = useDocument(id);
  return <Card>{templateData ? parse(templateData.content) : <Empty />}</Card>;
}
