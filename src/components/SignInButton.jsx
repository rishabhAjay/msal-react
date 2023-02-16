import Button from "@mui/material/Button";
import { useMsal } from "@azure/msal-react";
import config from "../config/config";
export const SignInButton = () => {
  const { instance } = useMsal();
  const onAzureSignIn = async () => {
    instance.loginPopup({
      scopes: config.scopes,
    });
  };
  return (
    <Button onClick={onAzureSignIn} color="inherit">
      Sign in
    </Button>
  );
};
