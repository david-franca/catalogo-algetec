import { useWikiList, useWikiToggleArchive } from "@/services/wiki.service";
import { Link } from "@tanstack/react-router";
import { Button, Card, Divider, List, Tooltip, Typography } from "antd";
import { ArchiveIcon, ArchiveRestoreIcon } from "lucide-react";
import { useState } from "react";

export function WikiView() {
  const { data: wikiCategories, isLoading } = useWikiList();
  const { mutateAsync: archive } = useWikiToggleArchive();
  const [loadingPageId, setLoadingPageId] = useState<number | null>(null);

  const handleArchiveToggle = async (id: number, archived: boolean) => {
    setLoadingPageId(id);
    await archive({ id, archived }).finally(() => setLoadingPageId(null));
  };

  return (
    <Card loading={isLoading}>
      {wikiCategories?.map(
        (category) =>
          category.documentationPages.length > 0 && (
            <div key={category.id} className="mb-4">
              <Typography.Text strong key={category.id}>
                {category.name.toUpperCase()}
              </Typography.Text>
              <Divider className="mt-0" />
              <List
                dataSource={category.documentationPages
                  .slice()
                  .filter((page) => !page.archived)
                  .sort((a, b) => a.title.localeCompare(b.title))}
                bordered
                renderItem={(page) => (
                  <List.Item
                    actions={[
                      page.archived ? (
                        <Tooltip title="Desarquivar">
                          <Button
                            icon={<ArchiveRestoreIcon className="h-4 w-4" />}
                            loading={loadingPageId === page.id}
                            onClick={() => handleArchiveToggle(page.id, false)}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Arquivar">
                          <Button
                            icon={<ArchiveIcon className="h-4 w-4" />}
                            loading={loadingPageId === page.id}
                            onClick={() => handleArchiveToggle(page.id, true)}
                          />
                        </Tooltip>
                      ),
                    ]}
                  >
                    <Link
                      to={"/dashboard/wiki/show/$id"}
                      params={{ id: page.id.toString() }}
                    >
                      {page.title.toUpperCase()}
                    </Link>
                  </List.Item>
                )}
              />
            </div>
          )
      )}
    </Card>
  );
}
