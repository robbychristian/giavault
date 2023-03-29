import { FC } from "react";
import { TableTypes } from "../typedefs/components/Table.type";
import LogsTable from "./LogsTable";
import UserTable from "./UserTable";

interface ITableSwitch {
  tableType: TableTypes;
  data: any[];
  searchData: any[];
}

export const TableSwitch: FC<ITableSwitch> = ({ tableType, data, searchData }) => {
  switch (tableType) {
    case TableTypes.USER:
      return <UserTable data={searchData ?? data} />;
    case TableTypes.LOGS:
      return <LogsTable data={searchData ?? data} />;
  }
};
