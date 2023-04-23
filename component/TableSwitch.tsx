import { FC } from "react";
import { TableTypes } from "@typedefs/components/Table.type";
import LogsTable from "@components/LogsTable";
import UserTable from "@components/UserTable";

interface ITableSwitch {
  tableType: TableTypes;
  data: any[];
  searchData: any[];
  refetch?: () => void;
}

export const TableSwitch: FC<ITableSwitch> = ({ tableType, data, searchData, refetch }) => {
  switch (tableType) {
    case TableTypes.USER:
      return <UserTable data={searchData ?? data} refetch={refetch} />;
    case TableTypes.LOGS:
      return <LogsTable data={searchData ?? data} />;
  }
};
