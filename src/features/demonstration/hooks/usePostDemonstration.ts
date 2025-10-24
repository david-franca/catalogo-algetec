import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { postDemonstration } from "../api/postDemonstration";
import type { Demonstration } from "../schema";

export const usePostDemonstration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Demonstration) => postDemonstration(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["demonstrations"] });
      toast.success("Solicitação enviada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao enviar solicitação");
      console.log(error);
    },
  });
};
