import { AccountType } from "@components/index";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Stack, Typography } from "@mui/material";
import { Currency } from "@shared/data";
import { toCurrency } from "@shared/formatters";
import { AccountStateItem } from "@shared/store";
import { EnhancedTransactionsItem } from "@shared/store/transactions";
import { THEME } from "@shared/theme";
import { MouseEvent } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
type Props = {
  account: AccountStateItem;
  opened: boolean;
  toggleOpened: () => void;
  transactions: EnhancedTransactionsItem[];
  onEdit: () => void;
};

export function Account({ account, opened, toggleOpened, transactions, onEdit }: Props) {
  function handleEditClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onEdit();
  }

  return (
    <Accordion
      expanded={opened}
      onChange={toggleOpened}
      sx={{
        boxShadow: "0rem .3rem .3rem #44444420",
      }}
    >
      <AccordionSummary
        expandIcon={<FaAngleDown />}
        id={`panel-${account._id}`}
        sx={{
          "&:hover #edit-account-button": {
            display: "block",
          },
        }}
      >
        <Stack
          direction='row'
          sx={{
            justifyContent: "space-between",
            width: "100%",
            paddingInlineEnd: "1rem",
          }}
        >
          <Stack direction='row' gap={1} alignItems='center'>
            <AccountType type={account.type} />
            <Typography>{account.label}</Typography>
          </Stack>
          <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
            <Typography>{toCurrency(account.balance, account.currency as Currency)}</Typography>
            <Box sx={{ width: "2.8rem", height: "2.8rem" }}>
              <IconButton
                id='edit-account-button'
                onClick={handleEditClick}
                size='small'
                sx={{ display: "none", flex: 1 }}
              >
                <TbEdit />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: THEME.palette.grey[300] }}>
        <Typography>{account.currency}</Typography>
        <Typography>{`Qty of trx: ${transactions.length}`}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
