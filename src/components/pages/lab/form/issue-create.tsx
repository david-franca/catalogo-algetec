import { Drawer } from "antd";

import { IssueCreateForm } from "../../issues/form/create-form";

interface IssueCreateProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export function IssueCreateFormLab({ isOpen, onClose, id }: IssueCreateProps) {
  return (
    <Drawer
      onClose={onClose}
      open={isOpen}
      width="50%"
      title="Adicionar Problema"
    >
      <IssueCreateForm experiment_id={id} />
    </Drawer>
  );
}
