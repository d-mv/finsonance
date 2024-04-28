import { Toggle } from "@components/index";
import { Box, Button, Stack } from "@mui/material";
import { getAccounts } from "@shared/store";
import { getTransactionsAccountId } from "@shared/store/transactions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Account } from "./Account";
import { AccountForm } from "./AccountForm";

type Mode = "opened" | "closed" | "single" | "multi";

type ModeButton = {
  value: Mode;
  label: string;
};

const BUTTONS: ModeButton[] = [
  {
    value: "opened",
    label: "All opened",
  },
  {
    value: "closed",
    label: "All closed",
  },
  {
    value: "single",
    label: "Single",
  },
  {
    value: "multi",
    label: "Multiple",
  },
];

export default function Accounts() {
  const accounts = useSelector(getAccounts);

  const getTransactionsForAccount = useSelector(getTransactionsAccountId);

  const [mode, setMode] = useState<Mode>("multi");

  const [opened, setOpened] = useState<string[]>([]);

  const [modal, setModal] = useState("");

  const closeModal = () => setModal("");

  useEffect(() => {
    if (mode === "closed") setOpened([]);
    else if (mode === "opened") setOpened(accounts.map(acc => acc._id));
    else if (mode === "single") setOpened([opened[opened.length - 1] ?? ""]);
  }, [mode]);

  function handleToggleOpened(id: string) {
    return () => {
      if (mode === "single") return setOpened(opened.includes(id) ? [] : [id]);

      if (mode === "multi") return setOpened(opened.includes(id) ? opened.filter(i => i !== id) : [...opened, id]);
    };
  }

  function renderAccountForm() {
    if (!modal) return null;

    if (modal === "add") return <AccountForm accountId={modal} close={closeModal} />;

    return <AccountForm accountId={modal} close={closeModal} />;
  }

  return (
    <Box sx={{ padding: "2rem", maxWidth: "70rem", width: "100%", marginInline: "auto" }}>
      <Stack direction='row' id='toggle-mode-container' sx={{ width: "100%", justifyContent: "flex-end" }}>
        <Toggle<Mode> mode={mode} onClick={setMode} buttons={BUTTONS} />
      </Stack>
      {accounts.map(acc => (
        <Account
          key={acc._id}
          opened={opened.includes(acc._id)}
          onEdit={() => setModal(acc._id)}
          toggleOpened={handleToggleOpened(acc._id)}
          account={acc}
          transactions={getTransactionsForAccount(acc._id)}
        />
      ))}
      <Button variant='contained' sx={{ marginTop: "1rem" }} onClick={() => setModal("add")}>
        Add new
      </Button>
      {renderAccountForm()}
    </Box>
  );
}
