import { AccountStateItem, getAccountById } from "@shared/store";
import { None, Option } from "@sniptt/monads";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Account() {
  const { id } = useParams();

  const getAccount = useSelector(getAccountById);

  const [acc, setAcc] = useState<Option<AccountStateItem>>(None);

  useEffect(() => {
    if (id) setAcc(getAccount(id));
  }, [id]);

  return <div>{String(acc.isSome() && acc.unwrap())}</div>;
}
