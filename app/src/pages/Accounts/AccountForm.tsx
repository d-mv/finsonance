import { ButtonGroupForm, ConfirmationDialog, CurrencySelectorForm, InputForm, ToggleForm } from "@components/index";
import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { RecordObject } from "@mv-d/toolbelt";
import { nanoid } from "@reduxjs/toolkit";
import { addAccount, getAccountById, updateAccountById } from "@shared/store";
import { getCurrencies } from "@shared/store/currencies";
import { LazyLoad } from "@shared/utils";
import { Formik, FormikHelpers } from "formik";
import { isNil, path } from "lodash/fp";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import CurrencySelector from "../../shared/components/CurrencySelector";

const REQUIRED_FIELDS = ["label", "balance", "currency", "type"];

type Props = {
  accountId: boolean | string;
  close: () => void;
};

export function AccountForm({ accountId, close }: Props) {
  const currencies = useSelector(getCurrencies);

  const getAccount = useSelector(getAccountById);

  const [warningOpen, setWarningOpen] = useState(false);

  const [warningResult, setWarningResult] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (warningResult === "yes") {
      close();
    }
  }, [warningResult, close]);

  function handleWarningClose(result: string) {
    return function call() {
      setWarningOpen(false);
      setWarningResult(result);
    };
  }

  const isEdit = useMemo(() => accountId && accountId !== "add", [accountId]);

  let account = {
    _id: nanoid(),
    currency: currencies.find(c => c.short === "usd")!._id,
    label: "",
    balance: 0,
    type: "cash",
    _createdAt: Date.now(),
    _updatedAt: Date.now(),
  };

  if (isEdit) {
    const maybeAccount = getAccount(accountId as string);

    if (maybeAccount.isSome()) account = maybeAccount.unwrap();
  }

  // TODO: review when API is ready
  function handleSubmit(values: typeof account, helpers: FormikHelpers<typeof account>) {
    if (isEdit) dispatch(updateAccountById(values));
    else dispatch(addAccount(values));

    helpers.setSubmitting(false);
    close();
  }

  function handleCancel(dirty: boolean) {
    if (dirty) setWarningOpen(true);
    else close();
  }

  return (
    <Dialog open={Boolean(accountId)} onClose={close}>
      <DialogTitle variant='h6' sx={{ fontWeight: 600 }}>
        {isEdit ? "Edit account" : "Add account"}
      </DialogTitle>
      <DialogContent>
        <LazyLoad>
          <Formik
            initialValues={account}
            onSubmit={handleSubmit}
            validate={values => {
              const errors: RecordObject<string> = {};

              for (const field of REQUIRED_FIELDS) {
                if (isNil(path(field, values))) {
                  errors[field] = "Required";
                }
              }

              return errors;
            }}
            validateOnBlur={true}
            validateOnChange={false}
            validateOnMount={false}
          >
            {props => (
              <Stack component='form' direction='column' onSubmit={props.handleSubmit} sx={{ gap: "1rem" }}>
                <InputForm id='label' label='Name' placeholder='Account name' required autoFocus />
                <Stack direction='row' gap='1rem'>
                  <InputForm id='balance' label='Balance' placeholder='Account balance' required type='number' />
                  <CurrencySelectorForm
                    currencies={currencies}
                    id='currency'
                    label='Currency'
                    required
                    sx={{ width: "10rem" }}
                  />
                </Stack>
                <ToggleForm
                  id='type'
                  label='Type'
                  required
                  buttons={[
                    { value: "cash", label: "cash" },
                    { value: "bank", label: "bank" },
                    { value: "crypto", label: "crypto" },
                    { value: "credit", label: "credit" },
                    { value: "investment", label: "investment" },
                  ]}
                />
                <ButtonGroupForm secondaryAction={handleCancel} />
              </Stack>
            )}
          </Formik>
          <ConfirmationDialog
            open={warningOpen}
            primaryAction={handleWarningClose("yes")}
            secondaryAction={handleWarningClose("no")}
            title='Warning'
            primaryLabel='Yes, close'
            secondaryLabel='No, stay'
          >
            There are unsaved changes. Are sure you want to close?
          </ConfirmationDialog>
        </LazyLoad>
      </DialogContent>
    </Dialog>
  );
}
