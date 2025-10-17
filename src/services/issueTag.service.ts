import { IssueTag } from "@/types/issue";
import { SelectOptions } from "@/types/select";
import { apiClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export function useIssueTagList() {
  return useQuery<IssueTag[]>({
    queryKey: ["issue-tag-list"],
    queryFn: async () => {
      const { data } = await apiClient.get<IssueTag[]>(`/issueTags/all`);
      return data;
    },
  });
}

export function useIssueTagSelect() {
  return useQuery<SelectOptions[]>({
    queryKey: ["issue-tag-select"],
    queryFn: async () => {
      const { data } = await apiClient.get<IssueTag[]>(`/issueTags/all`);
      return data.map((issueTag) => ({
        label: issueTag.name,
        value: issueTag.id.toString(),
      }));
    },
  });
}
