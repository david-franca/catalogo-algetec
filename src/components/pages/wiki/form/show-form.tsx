import {
  Avatar,
  Button,
  Card,
  Flex,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

import { Tiptap } from "@/components/Tiptap";
import {
  useWikiShow,
  useWikiToggleArchive,
  useWikiUpdate,
} from "@/services/wiki.service";
import { History } from "@/types/wiki";
import { getInitials, getUniqueColor } from "@/utils";
import { sortByDate } from "@/utils/sortDate";
import { LikeOutlined } from "@ant-design/icons";
import { ArchiveIcon, ArchiveRestoreIcon } from "lucide-react";

interface WikiShowFormProps {
  id: string;
}

interface WikiProps {
  title: string;
  content: string;
  description: string;
  authors: string[];
  likes: number;
  hasLiked: boolean;
  history: History[];
  archived: boolean;
}

export function WikiShowForm({ id }: WikiShowFormProps) {
  const [contentId, setContentId] = useState<number>();

  const { data: wikiPages, isLoading } = useWikiShow(id, contentId);
  const { mutateAsync: updatePage, isPending: isUpdating } = useWikiUpdate(id);
  const { mutateAsync: archive, isPending: archiveLoading } =
    useWikiToggleArchive();

  const [
    {
      title,
      content,
      description,
      history,
      authors,
      likes,
      hasLiked,
      archived,
    },
    setWiki,
  ] = useState<WikiProps>({
    title: "",
    content: "",
    description: "",
    history: [],
    likes: 0,
    authors: [],
    hasLiked: false,
    archived: false,
  });

  function formatNumber(num: number): string {
    const formatter = new Intl.NumberFormat("pt-BR", { notation: "compact" });
    return formatter.format(num);
  }

  const handleLike = () => {
    updatePage({
      data: {
        toggleLike: true,
      },
    });
  };

  useEffect(() => {
    if (wikiPages) {
      setWiki(wikiPages[0]);
      if (!contentId) {
        const lastContentId = wikiPages[0].history
          .slice()
          .sort((a, b) => sortByDate(b.createdAt, a.createdAt))[0].id;
        setContentId(lastContentId);
      }
    }
  }, [wikiPages, contentId]);

  return (
    <Card
      loading={isLoading}
      title={
        <Space direction="vertical" className="p-2">
          <Typography.Title level={4}>{title}</Typography.Title>
          <Typography.Text type="secondary">{description}</Typography.Text>
        </Space>
      }
      extra={
        <Flex vertical align="flex-end" gap="small">
          <Space>
            <Select
              options={history
                .slice()
                .sort((a, b) => sortByDate(b.createdAt, a.createdAt))
                .map((page) => ({
                  label: dayjs(page.createdAt).calendar(null, {
                    sameElse: "DD/MM/YYYY [às] HH:mm:ss",
                  }),
                  value: page.id,
                }))}
              value={contentId}
              onChange={setContentId}
              placeholder="Selecione uma versão"
              className="w-56"
            />
            <Tooltip title={hasLiked ? "Descurtir" : "Curtir"}>
              <Button
                type={hasLiked ? "primary" : "dashed"}
                icon={<LikeOutlined />}
                onClick={handleLike}
                loading={isUpdating}
              >
                {formatNumber(likes)}
              </Button>
            </Tooltip>
            {archived ? (
              <Tooltip title="Desarquivar">
                <Button
                  icon={<ArchiveRestoreIcon className="h-4 w-4" />}
                  loading={archiveLoading}
                  onClick={() => archive({ archived: false, id })}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Arquivar">
                <Button
                  icon={<ArchiveIcon className="h-4 w-4" />}
                  loading={archiveLoading}
                  onClick={() => archive({ archived: true, id })}
                />
              </Tooltip>
            )}
          </Space>
          <Flex align="center" gap="small">
            <Typography.Text type="secondary">Colaboradores:</Typography.Text>
            <Avatar.Group max={{ count: 10 }}>
              {authors.map((authorName) => (
                <Tooltip title={authorName} key={nanoid()}>
                  <Avatar
                    style={{ backgroundColor: getUniqueColor(authorName) }}
                  >
                    {getInitials(authorName)}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </Flex>
        </Flex>
      }
    >
      <Tiptap value={content} readonly />
    </Card>
  );
}
