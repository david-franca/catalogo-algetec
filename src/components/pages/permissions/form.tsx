import { Button, Card, List, Space, Typography } from "antd";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCan, useDisclosure } from "@/hooks";
import {
  GroupPermissions,
  useCreateRouteGroupConnections,
  useGetAllPermissions,
} from "@/services/security.service";
import { handlePermissionName } from "@/utils/handlePermissionName";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

export interface Result {
  view?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
  update_as_admin?: boolean;
  update_as_leader?: boolean;
  mass_update?: boolean;
}

export interface FormPermissions {
  Calendar: Result;
  Institution: Result;
  User: Result;
  Demand: Result;
  Release: Result;
  Checklist: Result;
  Issue: Result;
  Curriculum: Result;
  Template: Result;
  Experiment: Result;
  Permission: Result;
}

const { Title, Text } = Typography;

interface FormProps {
  permissions?: GroupPermissions[];
  userId?: number;
  departmentId?: number;
  roleId?: number;
}

/**
 * Formulário de permissões
 *
 * @param {{ permissions?: GroupPermissions[]; userId?: number; departmentId?: number; roleId?: number; }} props
 * @returns {JSX.Element}
 */

export function PermissionsForm({
  permissions,
  roleId,
  userId,
  departmentId,
}: FormProps): JSX.Element {
  const can = useCan();

  const { isOpen, onToggle } = useDisclosure();
  const { data: routeGroups } = useGetAllPermissions();
  const { mutateAsync: createGroup, isPending } =
    useCreateRouteGroupConnections();

  const [allowedRouteGroups, setAllowedRouteGroups] = useState<number[]>([]);
  const [forbiddenRouteGroups, setForbiddenRouteGroups] = useState<number[]>(
    []
  );

  const { control, handleSubmit, setValue, reset } = useForm();

  /**
   * Função chamada quando o formulário é submetido
   *
   * Realiza a chamada para criar as conexões de grupo de rotas,
   * com os grupos de rotas permitidos e proibidos
   *
   * @returns {Promise<void>}
   */
  const onFinish = async (): Promise<void> => {
    try {
      await createGroup({
        allowedRouteGroups,
        forbiddenRouteGroups,
        user_id: userId ?? undefined,
        department_id: departmentId ?? undefined,
        role_id: roleId ?? undefined,
      });
      toast.success("Permissões atualizadas com sucesso!");
      onToggle();
    } catch {
      toast.error("Erro ao atualizar permissões!");
    }
  };

  useEffect(() => {
    if (permissions) {
      reset();
      setForbiddenRouteGroups([]);
      setAllowedRouteGroups([]);
      permissions.forEach((permission) => {
        const key =
          `${permission.routeGroup.entity}.${permission.routeGroup.name}` as keyof FormPermissions;
        const id = permission.route_group_id;
        if (permission.allowed !== undefined) {
          if (permission.allowed) {
            setAllowedRouteGroups((prev) => [...new Set([...prev, id])]);
            setForbiddenRouteGroups((prev) =>
              prev.filter((id) => id !== permission.route_group_id)
            );
          }
          if (!permission.allowed) {
            setForbiddenRouteGroups((prev) => [...new Set([...prev, id])]);
            setAllowedRouteGroups((prev) =>
              prev.filter((id) => id !== permission.route_group_id)
            );
          }
        } else {
          setAllowedRouteGroups((prev) =>
            prev.filter((id) => id !== permission.route_group_id)
          );
          setForbiddenRouteGroups((prev) =>
            prev.filter((id) => id !== permission.route_group_id)
          );
        }
        setValue(key, permission.allowed);
      });
    }
  }, [permissions, reset, setValue]);

  return (
    <Card
      title="Tabela de Acesso"
      extra={
        can("create", "Permission") && (
          <Space>
            {isOpen && (
              <Button
                type="primary"
                onClick={onFinish}
                loading={isPending}
                icon={<SaveOutlined />}
                disabled={!can("create", "Permission")}
              >
                Salvar
              </Button>
            )}
            <Button
              type="primary"
              onClick={onToggle}
              danger={!isOpen}
              icon={<EditOutlined />}
              disabled={!can("create", "Permission")}
            >
              {isOpen ? "Cancelar" : "Editar"}
            </Button>
          </Space>
        )
      }
    >
      <form onSubmit={handleSubmit(onFinish)}>
        <List
          itemLayout="vertical"
          dataSource={routeGroups}
          renderItem={(item) => (
            <List.Item>
              <Title className="pb-1" level={3}>
                {handlePermissionName(item.title)}
              </Title>
              <List
                grid={{
                  gutter: 16,
                  column: 4,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 6,
                  xxl: 8,
                }}
                dataSource={item.actions}
                renderItem={(action) => (
                  <List.Item>
                    <Controller
                      name={`${item.title}.${action.name}`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <TriStateCheckbox
                            id={field.name}
                            value={field.value}
                            ref={field.ref}
                            onChange={(e) => {
                              field.onChange(e.value);
                              if (e.value !== null) {
                                if (e.value) {
                                  setForbiddenRouteGroups((prev) =>
                                    prev.filter((id) => id !== action.id)
                                  );
                                  setAllowedRouteGroups((prev) => [
                                    ...prev,
                                    action.id,
                                  ]);
                                }
                                if (e.value === false) {
                                  setAllowedRouteGroups((prev) =>
                                    prev.filter((id) => id !== action.id)
                                  );
                                  setForbiddenRouteGroups((prev) => [
                                    ...prev,
                                    action.id,
                                  ]);
                                }
                              } else {
                                setAllowedRouteGroups((prev) =>
                                  prev.filter((id) => id !== action.id)
                                );
                                setForbiddenRouteGroups((prev) =>
                                  prev.filter((id) => id !== action.id)
                                );
                              }
                            }}
                            disabled={!isOpen}
                          />
                          <Text className="pl-2">{action.description}</Text>
                        </>
                      )}
                    />
                  </List.Item>
                )}
              />
            </List.Item>
          )}
        />
        {can("create", "Permission") && (
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isOpen}
            loading={isPending}
          >
            Salvar
          </Button>
        )}
      </form>
    </Card>
  );
}
