import { CircularProgress } from "@mui/material";
import { getIsAnythingLoading } from "@shared/store";
import { useSelector } from "react-redux";

export default function InWork() {
  const isAnthingLoading = useSelector(getIsAnythingLoading);

  return isAnthingLoading ? (
    <CircularProgress
      color='primary'
      sx={{
        padding: "30%",
        height: "100%",
      }}
    />
  ) : null;
}
