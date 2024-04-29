import ConfirmationDialog from "@components/ConfirmationDialog";
import { ButtonGroupForm, CurrencySelectorForm, InputForm, ToggleForm } from "@components/index";
import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { RecordObject } from "@mv-d/toolbelt";
import { nanoid } from "@reduxjs/toolkit";
import { getAccounts, getCategories, getCurrencies } from "@shared/store";
import { EnhancedTransactionsItem } from "@shared/store/transactions";
import { LazyLoad, now } from "@shared/utils";
import { Formik, FormikHelpers, useFormikContext } from "formik";
import { pick } from "lodash/fp";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "../../context";

function ToggleCreditDebit() {
  const { values, setFieldValue } = useFormikContext<{ _type: "debit" | "credit"; amount: number }>();

  useEffect(() => {
    const type = values._type;

    const amount = values.amount;

    if (amount === 0) return;

    if (type === "debit" && amount < 0) setFieldValue("amount", -amount);

    if (type === "credit" && amount > 0) setFieldValue("amount", -amount);
  }, [values]);

  return null;
}

function CalculateInBaseCurrency() {
  const { values, setFieldValue } = useFormikContext<{
    amount: number;
    base_currency_id: string;
    in_base_currency: number;
  }>();

  useEffect(() => {
    if (values.amount === 0 || values.in_base_currency !== 0) return;

    const amount = values.amount;

    const in_base_currency = values.in_base_currency;

    // TODO: change to today's rate
    const rate = 2;

    if (in_base_currency === amount * rate) return;

    setFieldValue("in_base_currency", amount * rate);
  }, [values]);

  return null;
}

export function TransactionForm() {
  const { setModal } = useContextSelector(AppContext, pick("setModal"));

  const currencies = useSelector(getCurrencies);

  const accounts = useSelector(getAccounts);

  const categories = useSelector(getCategories);

  const closeModal = () => setModal(null);

  const [warningOpen, setWarningOpen] = useState(false);

  const [warningResult, setWarningResult] = useState("");

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

  const trx: EnhancedTransactionsItem = {
    _id: nanoid(),
    amount: 0,
    currency_id: currencies.find(c => c.short === "usd")!._id,
    base_currency_id: currencies.find(c => c.short === "eur")!._id,
    in_base_currency: 0,
    account_id: accounts[0]!._id,
    category_id: categories[0]!._id,
    category_label: categories[0]!.label,
    date: now().unix(),
    payee_id: "",
    payee_label: "",
    description: "",
    notes: "",
    _createdAt: now().unix(),
    _updatedAt: now().unix(),
  };

  function handleSubmit(values: EnhancedTransactionsItem, helpers: FormikHelpers<EnhancedTransactionsItem>) {
    //  dispatch(addAccount(values));

    helpers.setSubmitting(false);
    closeModal();
  }

  function handleCancel(dirty: boolean) {
    if (dirty) setWarningOpen(true);
    else close();
  }

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle variant='h6' sx={{ fontWeight: 600 }}>
        Add transaction
      </DialogTitle>
      <DialogContent>
        <LazyLoad>
          <Formik
            initialValues={trx}
            onSubmit={handleSubmit}
            validate={values => {
              // eslint-disable-next-line no-console
              console.log(values);

              const errors: RecordObject<string> = {};

              // for (const field of REQUIRED_FIELDS) {
              //   if (isNil(path(field, values))) {
              //     errors[field] = "Required";
              //   }
              // }

              return errors;
            }}
            validateOnBlur={true}
            validateOnChange={false}
            validateOnMount={false}
          >
            {props => (
              <Stack component='form' direction='column' onSubmit={props.handleSubmit} sx={{ gap: "1rem" }}>
                <ToggleForm
                  id='_type'
                  label='Type'
                  required
                  buttons={[
                    { value: "credit", label: "credit" },
                    { value: "debit", label: "debit" },
                  ]}
                />
                <ToggleCreditDebit />
                <InputForm id='description' label='Description' placeholder='Enter description' required autoFocus />
                <Stack direction='row' gap='1rem'>
                  <InputForm id='amount' label='Amount' placeholder='Enter amount' required type='number' />
                  <CurrencySelectorForm
                    currencies={currencies}
                    id='currency_id'
                    label='Currency'
                    required
                    sx={{ width: "10rem" }}
                  />
                </Stack>
                <CalculateInBaseCurrency />
                <Stack direction='row' gap='1rem'>
                  <InputForm
                    id='in_base_currency'
                    label='In base currency'
                    placeholder='Enter amount'
                    required
                    type='number'
                    // TODO: add button to calculate in base currency
                  />
                  <CurrencySelectorForm
                    currencies={currencies}
                    id='base_currency_id'
                    label='Currency'
                    required
                    sx={{ width: "10rem" }}
                  />
                </Stack>
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
