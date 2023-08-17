import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import Table from "~src/components/Table";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";

type TableColumn = {
  id: number;
  name: string;
  participants: number;
  type: string;
  description: string;
  created: string;
  updated: string;
};

const columns: ColumnDef<TableColumn>[] = [
  {
    accessorFn: (row) => row.name,
    id: "name",
    cell: (info) => info.getValue(),
    header: "Name",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.participants,
    id: "participants",
    cell: (info) => info.getValue(),
    header: "Participants",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.type,
    id: "type",
    cell: (info) => info.getValue(),
    header: "Type",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.created,
    id: "created",
    cell: (info) => info.getValue(),
    header: "Created",
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.updated,
    id: "updated",
    cell: (info) => info.getValue(),
    header: "Updated",
    footer: (props) => props.column.id,
  },
];

const renderExpandComponent = (row: TableColumn) => {
  return (
    <pre style={{ fontSize: "10px" }}>
      <code>{row.description}</code>
    </pre>
  );
};

type TournamentsTableViewProps = {
  className?: string;
};

export default function TournamentsTableView({
  className,
}: TournamentsTableViewProps) {
  const { tournament } = useGlobalContext();

  const modifiedTournaments: TableColumn[] = useMemo(
    () =>
      tournament.tournaments.map((t) => ({
        id: t._id,
        name: t.name,
        participants: t.participants,
        type: t.type,
        description: t.description,
        created: t.created,
        updated: t.updated,
      })),
    [tournament.tournaments],
  );

  return (
    <Table
      checkbox
      columns={columns}
      className={twMerge("w-full", className)}
      data={modifiedTournaments}
      rowCanExpand={(row: TableColumn) => row.description?.length > 0}
      rowExpandComponent={renderExpandComponent}
    />
  );
}
