import { AlertOctagon } from "lucide-react";
import { FC, ReactNode } from "react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

export const WarningAlert: FC<{
  title: string;
  children?: ReactNode;
}> = ({ title, children }) => {
  return (
    <Alert variant="warning">
      <AlertOctagon className="w-4 bg-red-500/10 border-red-500/30 h-5" />
      <AlertTitle className="body-md-semibold">{title}</AlertTitle>
      <AlertDescription className="body-sm">{children}</AlertDescription>
    </Alert>
  );
};
