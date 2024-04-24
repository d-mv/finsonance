import { Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
};

export default function WidgetLayout({ title, children }: PropsWithChildren<Props>) {
  const renderTextChild = (child: string) => <Typography variant='body1'>{child}</Typography>;

  return (
    <Stack
      direction='column'
      sx={{
        margin: "1rem",
      }}
    >
      <Typography variant='h6'>{title}</Typography>
      {typeof children === "string" ? renderTextChild(children) : children}
    </Stack>
  );
}
