import Timeline, {
  CustomHeader,
  CustomHeaderPropsChildrenFnProps,
  ReactCalendarItemRendererProps,
  SidebarHeader,
  TimelineHeaders,
  TodayMarker,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./timeline-styles.css";

import "./App.css";
import dayjs from "dayjs";
import { groups, items } from "./data";
import { classNames } from "./classnames";

const itemRenderer = ({
  item,
  itemContext,
  getItemProps,
}: ReactCalendarItemRendererProps<(typeof items)[0]>) => {
  const { style, ...itemProps } = getItemProps({});
  const isPlanned = item.planned;
  const group = itemContext.dimensions.order
    .group as unknown as (typeof groups)[0];

  let actualMargin = 0;
  if (!isPlanned) {
    actualMargin = 55;
  }

  return (
    <div
      {...itemProps}
      style={{
        ...style,
        border: "none",
        borderRadius: "4px",
        backgroundColor: isPlanned ? "#E2E3E4" : group?.status.color,
        height: "24px",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: "24px",
        fontSize: 10,
        marginTop: (isPlanned ? 24 : actualMargin) + 5,
      }}
    >
      <div className={classNames(isPlanned ? "text-black" : "text-white")}>
        {item.planned ? "Planned" : "Actual"}
      </div>
    </div>
  );
};

const groupRenderer = ({ group }: { group: (typeof groups)[0] }) => {
  const plannedItem = items.find(
    (item) => item.group === group.id && !!item.planned
  );
  const actualItem = items.find(
    (item) => item.group === group.id && !item.planned
  );

  return (
    <div className="leading-5">
      <table className="table-auto text-[10px] font-normal">
        <tr className="font-normal">
          <th></th>
          <th className="px-2 font-normal">Start Date</th>
          <th className="px-2 font-normal">End Date</th>
          <th className="px-2 font-normal">Days</th>
          <th className="px-2 font-normal">Progress</th>
        </tr>
        <tr className="leading-10">
          <td>
            <div className="flex flex-row items-center gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-[2px]"></div>
              Planned
            </div>
          </td>
          <td>{dayjs(plannedItem?.start_time).format("M/D")}</td>
          <td>{dayjs(plannedItem?.end_time).format("M/D")}</td>
          <td>
            {dayjs(plannedItem?.end_time).diff(plannedItem?.start_time, "day")}
          </td>
          <td rowSpan={2} className="pt-1">
            <div className="flex flex-row bg-gray-100 rounded-md overflow-hidden mt-1">
              <div
                className={`h-100% w-2 overflow-hidden`}
                style={{ backgroundColor: group.status.color }}
              />
              <div className="flex flex-col items-center justify-center px-1 ">
                <div className="h-3">{group.status.text}</div>
                <div>{group.status.progress}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="flex flex-row items-center gap-1">
              <div
                className="w-2 h-2 bg-blue-500 rounded-[2px]"
                style={{ backgroundColor: group.status.color }}
              />
              Actual
            </div>
          </td>
          <td>{dayjs(actualItem?.start_time).format("M/D")}</td>
          <td>{dayjs(actualItem?.end_time).format("M/D")}</td>
          <td>
            {dayjs(actualItem?.end_time).diff(plannedItem?.start_time, "day")}
          </td>
        </tr>
      </table>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Timeline
        groups={groups}
        items={items.map((item) => ({
          ...item,
          start_time: +item.start_time,
          end_time: +item.end_time,
        }))}
        defaultTimeStart={dayjs().add(-30, "day").toDate()}
        defaultTimeEnd={dayjs().add(30, "day").toDate()}
        canMove={false}
        canResize={false}
        // @ts-ignore
        canSelect={false}
        sidebarWidth={350}
        lineHeight={55}
        itemHeightRatio={0.95}
        stackItems={false}
        groupRenderer={groupRenderer}
        itemRenderer={itemRenderer}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              const { style, ...otherProps } = getRootProps();
              style.backgroundColor = "white";
              style.width = (style.width as number) - 1;
              // console.log("sidebar", style);
              return <div {...otherProps} style={style}></div>;
            }}
          </SidebarHeader>
          <CustomHeader
            // height={50}
            headerData={{ someData: "data" }}
            unit="year"
          >
            {(props) => {
              if (!props) {
                return null;
              }
              const {
                headerContext: { intervals },
                getRootProps,
                getIntervalProps,
                // showPeriod,
              } = props;

              return (
                <div {...getRootProps()}>
                  {intervals.map((interval) => {
                    const intervalStyle = {
                      lineHeight: "30px",
                      // textAlign: "center",
                      border: "none",
                      // borderLeft: "5px solid black",
                      cursor: "pointer",
                      backgroundColor: "white",
                      color: "black",
                    };
                    return (
                      <div
                        // onClick={() => {
                        //   showPeriod(interval.startTime, interval.endTime);
                        // }}
                        {...getIntervalProps({
                          interval,
                          style: intervalStyle,
                        })}
                      >
                        <div className="sticky left-0 w-[100px]">
                          {interval.startTime.format("YYYY")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </CustomHeader>
          <CustomHeader
            // height={50}
            headerData={{}}
            unit="month"
          >
            {(props: CustomHeaderPropsChildrenFnProps<{}> | undefined) => {
              if (!props) return null;
              const {
                headerContext: { intervals },
                getRootProps,
                getIntervalProps,
              } = props;
              return (
                <div {...getRootProps()}>
                  {intervals.map((interval) => {
                    const intervalStyle = {
                      lineHeight: "30px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "white",
                      color: "black",
                    };
                    return (
                      <div
                        {...getIntervalProps({
                          interval,
                          style: intervalStyle,
                        })}
                      >
                        <div className="items-start">
                          <div className="left-0 ml-[-50px] w-[100px] ">
                            {interval.startTime.format("MMM")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </CustomHeader>
        </TimelineHeaders>

        <TodayMarker date={new Date()}>
          {({ styles }) => {
            styles.backgroundColor = "#2E75CC";
            styles.width = "1px";
            styles.zIndex = 100;
            return (
              <div>
                <div
                  style={{
                    ...styles,
                    width: "7px",
                    height: "7px",
                    left: (styles.left as number) - 3,
                    borderRadius: "50%",
                    backgroundColor: "#2E75CC",
                  }}
                />
                <div style={styles} />
              </div>
            );
          }}
        </TodayMarker>
      </Timeline>
    </div>
  );
}

export default App;
