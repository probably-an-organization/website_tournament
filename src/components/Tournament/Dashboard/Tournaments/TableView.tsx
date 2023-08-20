import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

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

const getHref = (row: TableColumn) => {
  let href = "";
  switch (row.type) {
    case "knockout":
      href = "/knockout";
      break;
    default:
      throw Error("???");
  }
  return (href += `/${row.id}`);
};

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
  const { redirect, tournament } = useGlobalContext();

  const columns: ColumnDef<TableColumn>[] = [
    {
      accessorFn: (row) => row.name,
      id: "name",
      cell: (cell) => (
        <span
          className="underline dark:hover:text-neutral-800 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            redirect(getHref(cell.row.original), { withLoading: true });
          }}
        >
          {cell.getValue() as string}
        </span>
      ),
      header: "Name",
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => row.participants,
      id: "participants",
      cell: (cell) => cell.getValue(),
      header: "Participants",
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => row.type,
      id: "type",
      cell: (cell) => cell.getValue(),
      header: "Type",
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => row.created,
      id: "created",
      cell: (cell) => cell.getValue(),
      header: "Created",
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => row.updated,
      id: "updated",
      cell: (cell) => cell.getValue(),
      header: "Updated",
      footer: (props) => props.column.id,
    },
  ];

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
    <div className={className}>
      <Table
        checkbox
        columns={columns}
        data={modifiedTournaments}
        rowCanExpand={(row: TableColumn) => row.description?.length > 0}
        rowExpandComponent={renderExpandComponent}
      />
    </div>
  );
}
