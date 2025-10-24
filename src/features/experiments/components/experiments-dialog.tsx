import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostDemonstration } from "@/features/demonstration/hooks/usePostDemonstration";
import {
  DemonstrationSchema,
  type Demonstration,
} from "@/features/demonstration/schema";

export function ExperimentsDialog() {
  const { mutate, isPending } = usePostDemonstration();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Demonstration, "id">>({
    resolver: zodResolver(DemonstrationSchema.omit({ id: true })),
  });
  const { experimentId } = useParams({
    from: "/_authenticated/catalog/$categorySlug/$subcategorySlug/$experimentId",
  });

  const onSubmit: SubmitHandler<Omit<Demonstration, "id">> = (data) => {
    mutate({
      ...data,
      id: Number(experimentId),
    });
  };
  return (
    <Dialog>
      <form
        className="w-full lg:w-auto"
        noValidate
        onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      >
        <DialogTrigger asChild>
          <Button size="sm" className="w-full xl:w-auto">
            Solicitar Demo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Solicitar Demonstração</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo com os dados solicitados.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                {...register("name")}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="institution">Instituição</Label>
              <Input
                id="institution"
                type="text"
                aria-invalid={!!errors.institution}
                aria-describedby="institution-error"
                {...register("institution")}
              />
              {errors.institution && (
                <p id="institution-error" className="text-sm text-red-500">
                  {errors.institution.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" loading={isPending}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
