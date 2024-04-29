import dayjs from "dayjs";

export const displayDate = (date: string) => dayjs(date).format("DD/MM/YYYY");
