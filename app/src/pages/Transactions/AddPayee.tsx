import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { RecordObject } from "@mv-d/toolbelt";
import { PayeeStateItem } from "@shared/store";
import { Formik } from "formik";
import { nanoid } from "nanoid";
import { MaybeNull } from "../../types";

export type AddPayeeProps = {
	scenario: RecordObject<string>;
  dialogValue: MaybeNull<PayeeStateItem>;
  handleClose: () => void;
  handleSubmitItem: (values: PayeeStateItem) => void;
};

export default function AddPayee({ dialogValue, handleClose, handleSubmitItem }: AddPayeeProps) {
	const fields =
  return (
    <Formik
      initialValues={dialogValue || { _id: nanoid(), label: "", grouping_1: "" }}
      onSubmit={(v, helpers) => {
        helpers.setSubmitting(false);
        handleSubmitItem(v);
      }}
    >
      {({ handleSubmit }) => {
        return (
          <Dialog open={true} onClose={handleClose}>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(e);
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
