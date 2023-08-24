import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { FiPlus } from "react-icons/fi";
import { Card } from "@futshi/js_toolbox";

import ParticipantsListItem from "./ParticipantsListItem";
import { useTournamentContext } from "~src/hooks/context/tournament/useTournamentContext";

const GUTTER_SIZE = 10;
const ITEM_SIZE = 35;
const STICKY_HEADER = [0];

type StickyListContextProps = {
  displayName: string;
  ItemRenderer: ((props: any) => JSX.Element) | null;
  stickyIndices: number[];
};

const StickyListContext = createContext<StickyListContextProps>({
  displayName: "",
  ItemRenderer: null,
  stickyIndices: [],
});

type ItemWrapperProps = {
  data: {
    ItemRenderer: (props: any) => JSX.Element;
    stickyIndices: number[];
  };
  index: number;
  style: React.CSSProperties;
};

const ItemWrapper = ({ data, index, style }: ItemWrapperProps) => {
  const { ItemRenderer, stickyIndices } = data;
  if (stickyIndices && stickyIndices.includes(index)) {
    return null;
  }
  return <ItemRenderer index={index} style={style} />;
};

type RowProps = {
  index: number;
  style: React.CSSProperties;
};

const Row = ({ index, style }: RowProps) => {
  return (
    <div
      className="row flex items-center px-2"
      style={{ ...style, height: Number(style.height) - GUTTER_SIZE }}
    >
      <ParticipantsListItem index={index - 1} />
    </div>
  );
};

type HeaderRowProps = {
  style: React.CSSProperties;
};

const HeaderRow = ({ style }: HeaderRowProps) => {
  const { newTournament } = useTournamentContext();

  return (
    <div
      className="sticky z-10 flex items-center gap-2 border-b bg-neutral-100 px-2 text-xs dark:bg-neutral-900 dark:border-neutral-700"
      style={style}
    >
      {newTournament.participants.min &&
        newTournament.participants.min !== newTournament.participants.max && (
          <span className="w-5" />
        )}
      <span className="w-5">Nr.</span>
      <span className="flex-1">Name</span>
      <span className="flex-1">Team</span>
      <span className="w-14">Nation</span>
    </div>
  );
};

const InnerElementType = forwardRef(function InnerElementType(
  { children, ...props }: { children: React.ReactElement },
  ref: React.Ref<HTMLDivElement>,
) {
  const { stickyIndices } = useContext(StickyListContext);

  return (
    <div ref={ref} {...props}>
      {stickyIndices.map((index: number) => (
        <HeaderRow
          key={index}
          style={{ top: index * 35, left: 0, width: "100%", height: 35 }}
        />
      ))}

      {children}
    </div>
  );
});

type StickyListProps = {
  children(props: any): React.ReactElement;
  height: number;
  innerElementType: any;
  itemCount: number;
  itemSize: number;
  stickyIndices: number[];
  ref: React.Ref<FixedSizeList>;
  width: number;
};

const StickyList = forwardRef(function StickyList(
  { children, stickyIndices, ...props }: StickyListProps,
  ref: React.Ref<FixedSizeList>,
) {
  return (
    <StickyListContext.Provider
      value={{
        displayName: "StickyListContext",
        ItemRenderer: children,
        stickyIndices,
      }}
    >
      <FixedSizeList
        itemData={{ ItemRenderer: children, stickyIndices }}
        {...props}
        ref={ref}
      >
        {ItemWrapper}
      </FixedSizeList>
    </StickyListContext.Provider>
  );
});

let previousParticipantsShow = -1;

export default function NewTournamentParticipants() {
  const { newTournament, setNewTournament } = useTournamentContext();

  const listRef = useRef<FixedSizeList>(null);

  useEffect(() => {
    if (
      previousParticipantsShow > 0 &&
      newTournament.participants.show > previousParticipantsShow
    ) {
      scrollToBottom();
    }
    previousParticipantsShow = newTournament.participants.show;
  }, [newTournament.participants.show]);

  const handleAddParticipant = () => {
    setNewTournament((prev) => ({
      ...prev,
      participants: {
        ...prev.participants,
        show: prev.participants.show + 1,
      },
    }));
  };

  const scrollToBottom = () => {
    listRef?.current?.scrollToItem(newTournament.participants.show + 1);
  };

  return (
    <div className="mx-auto h-full max-h-screen w-full max-w-lg">
      <form className="flex h-full w-full items-center justify-center">
        <Card className="flex h-full w-full flex-col overflow-hidden">
          <div className="h-full">
            <AutoSizer>
              {({ height, width }: { height: number; width: number }) => (
                <StickyList
                  height={height}
                  innerElementType={InnerElementType}
                  itemCount={
                    newTournament.participants.show + STICKY_HEADER.length
                  }
                  itemSize={ITEM_SIZE + GUTTER_SIZE}
                  ref={listRef}
                  stickyIndices={STICKY_HEADER}
                  width={width}
                >
                  {Row}
                </StickyList>
              )}
            </AutoSizer>
          </div>
          {newTournament.participants.min &&
            newTournament.participants.show <
              newTournament.participants.max && (
              <div className="border-t p-2">
                <button
                  className="flex items-center gap-2 rounded bg-neutral-400 p-2 dark:bg-neutral-500"
                  onClick={handleAddParticipant}
                  type="button"
                >
                  <FiPlus /> Add participant
                </button>
              </div>
            )}
        </Card>
      </form>
    </div>
  );
}
