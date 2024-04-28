import { PropsWithChildren, Suspense } from "react";

type Props = {
  isDefault?: boolean;
  isLoading?: string;
  message?: string;
};

export function LazyLoad({ isDefault, isLoading, children, message }: PropsWithChildren<Props>) {
  let fallback = null;

  if (isDefault) fallback = <div>{message ?? "Loading..."}</div>;

  if (isLoading) fallback = isLoading;

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
