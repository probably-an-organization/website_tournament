import type { ColumnDef } from "@tanstack/react-table";

import Table from "~src/components/Table";

import { camelize, styled } from "~src/utils/stringUtils";

type TableColumn = {
  id: number;
  username: string;
  isActive: boolean;
  age: number;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
};

const columns: ColumnDef<TableColumn>[] = [
  {
    accessorFn: (row) => row.id,
    id: "id",
    cell: (info) => info.getValue(),
    header: "ID",
    footer: (props) => props.column.id,
  },
  {
    header: "User Information",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorFn: (row) => row.username,
        id: "username",
        cell: (info) => info.getValue() as string,
        header: "Username",
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.isActive,
        id: "isActive",
        cell: (info) => (info.getValue() ? "True" : "False"),
        header: "Active",
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.age,
        id: "age",
        header: "Age",
      },
      {
        accessorFn: (row) => row.gender,
        cell: (info) => camelize(info.getValue() as string),
        header: "Gender",
      },
    ],
  },
  {
    header: "Others",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "number",
        header: () => "number",
        footer: (props) => props.column.id,
      },
      {
        header: "Sub group",
        columns: [
          {
            accessorKey: "date",
            header: () => <span>Date</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

const renderExpandComponent = (row: TableColumn) => {
  return (
    <pre style={{ fontSize: "10px" }}>
      <code>{JSON.stringify(row, null, 2)}</code>
    </pre>
  );
};

type TournamentsTableViewProps = {
  className?: string;
};

export default function TournamentsTableView({
  className,
}: TournamentsTableViewProps) {
  return (
    <Table
      checkbox
      columns={columns}
      className={styled("w-full", className)}
      data={[
        {
          id: 0,
          username: "Vilma Zimmerman",
          isActive: true,
          age: 39,
          gender: "female",
          company: "VANTAGE",
          email: "vilmazimmerman@vantage.com",
          phone: "+1 (813) 419-3736",
          address: "583 Pioneer Street, Seymour, Oregon, 3645",
        },
        {
          id: 1,
          username: "Hinton Ortiz",
          isActive: false,
          age: 38,
          gender: "male",
          company: "EARBANG",
          email: "hintonortiz@earbang.com",
          phone: "+1 (867) 451-3928",
          address: "265 Newkirk Placez, Rosburg, Louisiana, 8692",
        },
        {
          id: 2,
          username: "Maryellen Barnett",
          isActive: false,
          age: 23,
          gender: "female",
          company: "OBONES",
          email: "maryellenbarnett@obones.com",
          phone: "+1 (882) 558-3248",
          address:
            "516 Nostrand Avenue, Coyote, Federated States Of Micronesia, 727",
        },
        {
          id: 3,
          username: "Ester Bray",
          isActive: false,
          age: 34,
          gender: "female",
          company: "VORATAK",
          email: "esterbray@voratak.com",
          phone: "+1 (964) 551-2789",
          address: "837 Irvington Place, Kent, Massachusetts, 5467",
        },
        {
          id: 4,
          username: "Fowler Carver",
          isActive: true,
          age: 28,
          gender: "male",
          company: "SEALOUD",
          email: "fowlercarver@sealoud.com",
          phone: "+1 (824) 591-2772",
          address: "907 Macon Street, Harborton, Illinois, 8344",
        },
        {
          id: 5,
          username: "Sheila Acosta",
          isActive: true,
          age: 36,
          gender: "female",
          company: "COMCUR",
          email: "sheilaacosta@comcur.com",
          phone: "+1 (937) 409-2976",
          address: "317 Anthony Street, Orviston, Michigan, 4557",
        },
        {
          id: 6,
          username: "Virgie Clark",
          isActive: false,
          age: 35,
          gender: "female",
          company: "KAGE",
          email: "virgieclark@kage.com",
          phone: "+1 (952) 515-2321",
          address: "959 Berkeley Place, Richford, Mississippi, 6073",
        },
        {
          id: 7,
          username: "Tia Huff",
          isActive: false,
          age: 25,
          gender: "female",
          company: "ZENSURE",
          email: "tiahuff@zensure.com",
          phone: "+1 (862) 429-3800",
          address: "943 Carroll Street, Cobbtown, Nebraska, 4371",
        },
        {
          id: 8,
          username: "Collins Ray",
          isActive: true,
          age: 25,
          gender: "male",
          company: "AMRIL",
          email: "collinsray@amril.com",
          phone: "+1 (879) 510-2994",
          address: "860 Miller Place, Ola, Rhode Island, 1731",
        },
        {
          id: 9,
          username: "Goodman Bush",
          isActive: true,
          age: 36,
          gender: "male",
          company: "OVATION",
          email: "goodmanbush@ovation.com",
          phone: "+1 (942) 463-3504",
          address: "318 Wyckoff Avenue, Bethpage, Pennsylvania, 9533",
        },
        {
          id: 10,
          username: "Marianne Hall",
          isActive: true,
          age: 26,
          gender: "female",
          company: "TALKALOT",
          email: "mariannehall@talkalot.com",
          phone: "+1 (838) 445-3725",
          address: "819 Dodworth Street, Robinette, California, 7491",
        },
        {
          id: 11,
          username: "Meredith Dorsey",
          isActive: true,
          age: 35,
          gender: "female",
          company: "HARMONEY",
          email: "meredithdorsey@harmoney.com",
          phone: "+1 (958) 464-2663",
          address: "776 Meserole Avenue, Esmont, New Mexico, 5609",
        },
        {
          id: 12,
          username: "Tami Long",
          isActive: false,
          age: 35,
          gender: "female",
          company: "HOMELUX",
          email: "tamilong@homelux.com",
          phone: "+1 (801) 493-2185",
          address: "916 Portal Street, Frystown, Georgia, 6969",
        },
        {
          id: 13,
          username: "Marietta Dudley",
          isActive: false,
          age: 27,
          gender: "female",
          company: "OPTICALL",
          email: "mariettadudley@opticall.com",
          phone: "+1 (820) 574-3604",
          address: "773 Elton Street, Beaulieu, Colorado, 5729",
        },
        {
          id: 14,
          username: "Michael Cruz",
          isActive: false,
          age: 33,
          gender: "female",
          company: "ROCKYARD",
          email: "michaelcruz@rockyard.com",
          phone: "+1 (842) 513-2944",
          address: "210 Moffat Street, Kenwood, District Of Columbia, 5830",
        },
        {
          id: 15,
          username: "Hart Cooke",
          isActive: false,
          age: 23,
          gender: "male",
          company: "QABOOS",
          email: "hartcooke@qaboos.com",
          phone: "+1 (816) 495-3313",
          address: "315 Stuyvesant Avenue, Soham, Nevada, 1792",
        },
        {
          id: 16,
          username: "Ware Hammond",
          isActive: false,
          age: 32,
          gender: "male",
          company: "ZOSIS",
          email: "warehammond@zosis.com",
          phone: "+1 (946) 595-2984",
          address: "598 Gardner Avenue, Shrewsbury, Arkansas, 4369",
        },
        {
          id: 17,
          username: "Hester Sanford",
          isActive: false,
          age: 21,
          gender: "male",
          company: "TECHADE",
          email: "hestersanford@techade.com",
          phone: "+1 (818) 488-2788",
          address:
            "816 Stryker Street, Martinez, Northern Mariana Islands, 1302",
        },
        {
          id: 18,
          username: "Shelley Brady",
          isActive: false,
          age: 33,
          gender: "female",
          company: "XYLAR",
          email: "shelleybrady@xylar.com",
          phone: "+1 (896) 450-2509",
          address: "105 Railroad Avenue, Klagetoh, Virginia, 7705",
        },
        {
          id: 19,
          username: "Susana Patterson",
          isActive: false,
          age: 20,
          gender: "female",
          company: "EZENTIA",
          email: "susanapatterson@ezentia.com",
          phone: "+1 (854) 493-2787",
          address: "348 Hampton Place, Cascades, American Samoa, 5279",
        },
        {
          id: 20,
          username: "ASDF",
          isActive: false,
          age: 69,
          gender: "male",
          company: "ASDF",
          email: "asdf@asdf.com",
          phone: "+420",
          address: "ASDF",
        },
      ]}
      rowCanExpand={(row: TableColumn) => row.id % 2 === 0}
      rowExpandComponent={renderExpandComponent}
    />
  );
}
