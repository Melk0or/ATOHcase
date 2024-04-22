import { ClientDto, tableControllerUpdateClientStatus } from "@/api/generated";
import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import tableItemStyles from "@/styles/table-item.module.scss"

interface TableItemProps extends ClientDto {
  key: number;
}

enum statusVariant {
  In_Work = "В работе",
  Not_at_work = "Не в работе",
  Deal_closed = "Дело закрыто",
  Reject = "Отклонено",
}

type VariantType = "In_Work" | "Not_at_work" | "Deal_closed" | "Reject";
const mark: VariantType[] = ["In_Work", "Not_at_work", "Deal_closed", "Reject"];

const TableItem: React.FC<TableItemProps> = (rowData) => {
  const sel = useRef<HTMLSelectElement>(null);
  const patchMutate = useMutation({
    mutationFn: tableControllerUpdateClientStatus,
    onSuccess() {
      alert("Бинго");
    },
  });

  const patchStatus = (status: VariantType | string) => {
    const d = patchMutate.mutate({ clientId: rowData.id, status });
    console.log(d);
  };
  return (
    <tr>
      <td>{rowData.id}</td>
      <td>{rowData.account_number}</td>
      <td>{`${rowData.first_name} ${rowData.last_name} ${rowData.surname}`}</td>
      <td>{rowData.birth_date.split("T")[0]}</td>
      <td>{rowData.EIN}</td>
      <td>
        <select
        className={tableItemStyles.select}
          ref={sel}
          defaultValue={rowData.status}
          onChange={() => {
            const key: VariantType | string =
              sel.current?.options[sel.current?.selectedIndex].value ||
              "In_Work";
            patchStatus(key);
          }}
        >
          {mark.map((item, index) => (
            <option
            value={item}
              data-status={item}
              key={index}
            >
              {statusVariant[item]}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};

export default TableItem;
