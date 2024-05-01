import ConfirmationDialog from "@components/ConfirmationDialog";
import {
  ButtonGroupForm,
  CalculateInBaseCurrencyForm,
  CurrencySelectorForm,
  InputForm,
  SelectorForm,
  ToggleForm,
} from "@components/index";
import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { RecordObject } from "@mv-d/toolbelt";
import { nanoid } from "@reduxjs/toolkit";
import { PayeeStateItem, getAccounts, getCategories, getCurrencies, getPayees } from "@shared/store";
import { EnhancedTransactionsItem } from "@shared/store/transactions";
import { LazyLoad, now } from "@shared/utils";
import { Formik, FormikHelpers } from "formik";
import { pick } from "lodash/fp";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "../../context";
import { Maybe, MaybeNull } from "../../types";

// import CalculateInBaseCurrency from "../../shared/components/CalculateInBaseCurrencyForm";
export function TransactionForm() {
  const { setModal } = useContextSelector(AppContext, pick("setModal"));

  const currencies = useSelector(getCurrencies);

  const accounts = useSelector(getAccounts);

  const categories = useSelector(getCategories);

  const payees = useSelector(getPayees);

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
    // add to type?
    _type: "credit",
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

  function createNewPayee(name: Maybe<string>) {
    const payee: PayeeStateItem = {
      _id: nanoid(),
      label: name!,
      grouping_1: "",
    };

    return payee;
  }

  function renderAddDialog(
    dialogValue: MaybeNull<PayeeStateItem>,
    handleClose: () => void,
    handleSubmit: (event: FormEvent<HTMLFormElement>, values: PayeeStateItem) => void,
  ) {
    return (
      <Formik initialValues={dialogValue || { _id: nanoid(), label: "", grouping_1: "" }}>
        {({ handleSubmit }) => {
          return (
            <Dialog open={true} onClose={handleClose}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit(e, dialogValue!);
                }}
              >
                <DialogTitle>Add a new film</DialogTitle>
                <DialogContent>
                  <DialogContentText>Did you miss any film in our list? Please, add it!</DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    value={dialogValue?.label || ""}
                    onChange={event =>
                      setDialogValue({
                        ...dialogValue,
                        label: event.target.value,
                      })
                    }
                    label='title'
                    type='text'
                    variant='standard'
                  />
                  <TextField
                    margin='dense'
                    id='name'
                    value={dialogValue?.grouping_1 || ""}
                    onChange={event =>
                      setDialogValue({
                        ...dialogValue,
                        grouping_1: event.target.value,
                      })
                    }
                    label='year'
                    type='number'
                    variant='standard'
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type='submit'>Add</Button>
                </DialogActions>
              </form>
            </Dialog>
          );
        }}
      </Formik>
    );
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
                <Stack direction='row' gap='1rem'>
                  <InputForm
                    id='in_base_currency'
                    label='In base currency'
                    placeholder='Enter amount'
                    required
                    type='number'
                    InputProps={{ endAdornment: <CalculateInBaseCurrencyForm /> }}
                  />
                </Stack>
                <SelectorForm
                  id='payee'
                  label='Payee'
                  set={payees}
                  required
                  targetValueKey='payee_id'
                  targetLabelKey='payee_label'
                  createNewItemFn={createNewPayee}
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
