import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(advancedFormat);

const formatChatAppTime = (isoString: string) => {
  const date = dayjs(isoString);
  const now = dayjs();

  if (date.isToday()) {
    return date.format("h:mm A"); // e.g., "2:45 PM"
  } else if (date.isYesterday()) {
    return "Yesterday";
  } else if (date.isSame(now, "year")) {
    return date.format("MMM D"); // e.g., "Jun 2"
  } else {
    return date.format("MMM D, YYYY"); // e.g., "Jun 2, 2023"
  }
};

export default formatChatAppTime;
