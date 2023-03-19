import dayjs from "dayjs";

export const _groups = [
  { id: 1, title: "Unit 3" },
  { id: 2, title: "Unit 2" },
  { id: 3, title: "Unit 4" },
  { id: 4, title: "Unit 1" },
];

export const items = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: dayjs().add(-4, "day").toDate(),
    end_time: dayjs().add(12, "day").toDate(),
    canMove: false,
    canResize: false,
    planned: true,
  },
  {
    id: 2,
    group: 1,
    title: "item 2",
    start_time: dayjs().add(-1.5, "day").toDate(),
    end_time: dayjs().add(4.5, "day").toDate(),
  },
  {
    id: 3,
    group: 2,
    title: "item 3",
    start_time: dayjs().add(2, "day").toDate(),
    end_time: dayjs().add(7, "day").toDate(),
    planned: true,
  },
  {
    id: 4,
    group: 2,
    title: "item 4",
    start_time: dayjs().add(2, "day").toDate(),
    end_time: dayjs().add(7, "day").toDate(),
  },
  {
    id: 5,
    group: 3,
    title: "item 5",
    start_time: dayjs().add(4, "day").toDate(),
    end_time: dayjs().add(8, "day").toDate(),
    planned: true,
  },
  {
    id: 6,
    group: 3,
    title: "item 6",
    start_time: dayjs().add(5, "day").toDate(),
    end_time: dayjs().add(9, "day").toDate(),
    canSelect: false,
  },
  {
    id: 7,
    group: 4,
    title: "item 7",
    start_time: dayjs().add(5, "day").toDate(),
    end_time: dayjs().add(11, "day").toDate(),
    canSelect: false,
    planned: true,
  },
  {
    id: 8,
    group: 4,
    title: "item 8",
    start_time: dayjs().add(11, "day").toDate(),
    end_time: dayjs().add(17, "day").toDate(),
    canSelect: false,
  },
];

export const groups = _groups.map((group) => {
  const plannedItem = items.find(
    (item) => item.group === group.id && !!item.planned
  );
  const actualItem = items.find(
    (item) => item.group === group.id && !item.planned
  );

  const status = {
    color: "#2E75CC",
    text: "On time",
    progress: "100%",
  };
  const diff = dayjs(actualItem?.end_time).diff(
    dayjs(plannedItem?.end_time),
    "day"
  );
  const actualDays = dayjs(actualItem?.end_time).diff(
    dayjs(actualItem?.start_time),
    "day"
  );
  // const plannedDays = dayjs(plannedItem?.end_time).diff(dayjs(plannedItem?.start_time), 'day')
  if (diff > 0) {
    status.color = "#D90000";
    status.text = `${Math.abs(diff)} days late`;
    // round to 0 decimal places
    status.progress = `${Math.round((diff / actualDays) * 100)}%`;
  } else if (diff < 0) {
    status.color = "#4BA343";
    status.text = `${Math.abs(diff)} days ahead`;
    status.progress = `${Math.round((diff / actualDays) * 100)}%`;
  } 


  // is actual and plan time range overlap
  const overlap = dayjs(actualItem?.end_time).isAfter(plannedItem?.start_time) && dayjs(actualItem?.start_time).isBefore(plannedItem?.end_time)


  return {
    ...group,
    status,
    height: 110,
    overlap,
  };
});
