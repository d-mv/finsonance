import { FormHelperText, Stack, Typography } from "@mui/material";
import { THEME } from "@shared/theme";
import { useFormikContext } from "formik";
import { path } from "lodash/fp";
import { CSSProperties, PropsWithChildren } from "react";

type Props = {
  id: string;
  label: string;
  required?: boolean;
  sx?: CSSProperties;
};

export default function FormField({ children, id, label, required, sx }: PropsWithChildren<Props>) {
  const { errors } = useFormikContext();

  return (
    <Stack direction='column' sx={sx}>
      <Stack direction='row'>
        <Typography variant='body1' color='primary'>
          {label}
        </Typography>
        {required && (
          <Typography variant='caption' color='error' sx={{ marginInlineStart: "1ch" }}>
            *
          </Typography>
        )}
      </Stack>
      {children}
      <FormHelperText sx={{ height: "2rem", color: THEME.palette.error.main }}>{path(id, errors)}</FormHelperText>
    </Stack>
  );
}
