import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  InputRef,
  Popconfirm,
  Select,
  Table,
} from "antd";
import { isNil, omitBy } from "lodash";
import {
  Children,
  cloneElement,
  createContext,
  CSSProperties,
  HTMLAttributes,
  Key,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import {
  useChecklistShow,
  useChecklistUpdate,
} from "@/services/checklist.service";
import { useDepartmentSelect } from "@/services/department.service";
import { ChecklistUpdate, EditableCellProps } from "@/types/checklist";
import { DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ChecklistEditFormProps {
  id: string;
}

interface DataType {
  key: number;
  name: string;
  percentage: number;
}

interface Item {
  key: number;
  name: string;
  percentage: number;
}

interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const EditableContext = createContext<FormInstance | null>(null);

function TableRow({ children, ...props }: RowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style: CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && { ...transform, scaleY: 1 }
    )?.replace(/translate3d\(([^,]+),/, "translate3d(0,"),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
          {Children.map(children, (child) => {
            if ((child as ReactElement).key === "sort") {
              return cloneElement(child as ReactElement, {
                children: (
                  <MenuOutlined
                    ref={setActivatorNodeRef}
                    style={{ touchAction: "none", cursor: "move" }}
                    {...listeners}
                  />
                ),
              });
            }
            return child;
          })}
        </tr>
      </EditableContext.Provider>
    </Form>
  );
}

function EditableCell({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: EditableCellProps<Item>) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      toast.error(`Erro ao salvar - ${errInfo}`);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
        aria-hidden="true"
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
}

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export function ChecklistEditForm({ id }: ChecklistEditFormProps) {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const { mutateAsync: updateChecklist, isPending } = useChecklistUpdate(id);
  const { data: checklist, isLoading } = useChecklistShow(id);
  const { data: teamsItems, isLoading: teamsLoading } = useDepartmentSelect();

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  const handleDelete = (key: Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      key: "sort",
      dataIndex: "sort",
      align: "center",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Peso",
      dataIndex: "percentage",
      key: "percentage",
      editable: true,
    },
    {
      dataIndex: "operation",
      align: "center",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Tem certeza?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button danger type="primary" icon={<DeleteOutlined />} />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: dataSource.length + 1,
      name: `Item ${dataSource.length + 1}`,
      percentage: 1,
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: TableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onFinish = async () => {
    const { name, department_ids } = await form.validateFields();

    if (checklist) {
      const omit: ChecklistUpdate = {
        id: Number(id),
        name:
          checklist.name.toLowerCase() === name?.toLowerCase()
            ? undefined
            : name,
        parameters: dataSource?.map((data, index) => ({
          checked: false,
          name: data.name,
          percentage: data.percentage,
          order: index,
        })),
        department_ids,
      };
      const checkUpdate = omitBy<ChecklistUpdate>(
        omit,
        isNil
      ) as ChecklistUpdate;

      updateChecklist(checkUpdate)
        .then(() => {
          toast.success("Lista de tarefas atualizada com sucesso!");
        })
        .catch(() => toast.error("Erro ao atualizar lista de tarefas!"));
    }
    updateChecklist({ name, department_ids, id: Number(id) })
      .then(() => {
        toast.success("Lista de tarefas atualizada com sucesso!");
      })
      .catch(() => toast.error("Erro ao atualizar lista de tarefas!"));
  };

  useEffect(() => {
    if (checklist) {
      setDataSource(
        checklist.checklist_parameters.map((param) => ({
          key: param.id,
          name: param.name,
          percentage: param.percentage,
        }))
      );
      form.setFieldsValue({
        id: checklist.id,
        name: checklist.name,
        department_ids: checklist.departments.map(
          (department) => department.id
        ),
      });
    }
  }, [checklist, form]);

  return (
    <Card>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        initialValues={{
          name: "",
          parameters: [],
        }}
      >
        <Form.Item label="Título" id="name" name="name">
          <Input />
        </Form.Item>

        <Form.Item
          label="Time Padrão"
          name="department_ids"
          id="department_ids"
        >
          <Select options={teamsItems} mode="multiple" loading={teamsLoading} />
        </Form.Item>

        <Button block onClick={handleAdd} type="dashed" className="my-4">
          Adicionar item
        </Button>

        <DndContext onDragEnd={onDragEnd}>
          <SortableContext
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              loading={isLoading}
              rowKey="key"
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
            />
          </SortableContext>
        </DndContext>
        <Form.Item className="flex justify-center">
          <Button loading={isPending} type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
