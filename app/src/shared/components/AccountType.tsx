import { Stack } from "@mui/material";
import { makeMatch } from "@mv-d/toolbelt";
import { THEME } from "@shared/theme";
import { CSSProperties } from "react";
import { CiBank, CiBitcoin, CiCircleMinus, CiCoinInsert, CiCreditCard2, CiWavePulse1 } from "react-icons/ci";

const MATCH_ICON = makeMatch(
  {
    cash: CiCoinInsert,
    bank: CiBank,
    crypto: CiBitcoin,
    credit: CiCreditCard2,
    investment: CiWavePulse1,
  },
  CiCircleMinus,
);

type Props = {
  type: "cash" | "bank" | "crypto" | "credit" | "investment";
  label?: string;
  noIcon?: boolean;
  sx?: CSSProperties;
};

export default function AccountType({ type, label, noIcon, sx }: Props) {
  const Icon = MATCH_ICON[type]!;

  return (
    <Stack direction='row' spacing={1} alignItems='center' sx={sx}>
      {!noIcon && <Icon style={{ height: "2rem", width: "2rem", stroke: THEME.palette.info.main }} />}
      {label}
    </Stack>
  );
}
