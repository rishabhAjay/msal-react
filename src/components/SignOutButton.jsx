import Button from "@mui/material/Button";
import { useMsal } from "@azure/msal-react";

export const SignOutButton = () => {
  const { instance } = useMsal();
  const signOutFunc = () => {
    //this function automatically clears the tokens from the cache
    instance.logoutRedirect();
  };
  return (
    <Button onClick={signOutFunc} color="inherit">
      Sign out
    </Button>
  );
};
