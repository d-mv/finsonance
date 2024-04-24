import { WidgetLayout } from "@components/index";
import { toCurrency } from "@shared/formatters";
import { getBalance } from "@shared/store";
import { useSelector } from "react-redux";

export default function TotalBalance() {
  const balance = useSelector(getBalance);

  return <WidgetLayout title='Total balance'>{toCurrency(balance)}</WidgetLayout>;
}
