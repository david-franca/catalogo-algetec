import { Drawer } from "antd";

import { IssueEditForm } from "../../issues/form/edit-form";

interface IssueEditProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export function IssueEditFormLab({ isOpen, onClose, id }: IssueEditProps) {
  return (
    <Drawer onClose={onClose} open={isOpen} width="50%" title="Editar Problema">
      <IssueEditForm id={id} />
    </Drawer>
  );
}
