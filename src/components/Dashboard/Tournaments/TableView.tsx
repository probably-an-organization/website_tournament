import { Card } from "@futshi/js_toolbox";
import type { ColumnDef } from "@tanstack/react-table";
import format from "date-fns/format";
import intlFormat from "date-fns/intlFormat";
import parseISO from "date-fns/parseISO";
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
          className="py-1 px-2 rounded bg-neutral-300 dark:hover:bg-orange-400 dark:hover:text-neutral-800 text-neutral-900 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            redirect(`/tournament/${cell.row.original.id}`, {
              withLoading: true,
            });
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
      cell: (cell) =>
        intlFormat(
          parseISO(cell.getValue() as string),
          {
            // weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          },
          { locale: "en-UK" },
        ),
      header: "Created",
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => row.updated,
      id: "updated",
      cell: (cell) =>
        intlFormat(
          parseISO(cell.getValue() as string),
          {
            // weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          },
          { locale: "en-UK" },
        ),
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
      <Card className="p-3 overflow-auto relative">
        <Table
          checkbox
          columns={columns}
          data={modifiedTournaments}
          rowCanExpand={(row: TableColumn) => row.description?.length > 0}
          rowExpandComponent={renderExpandComponent}
        />
      </Card>
    </div>
  );
}
