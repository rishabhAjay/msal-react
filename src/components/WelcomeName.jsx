import Typography from "@mui/material/Typography";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
export const WelcomeName = () => {
  const { instance, inProgress } = useMsal();
  const [name, setName] = useState(null);

  //get the account of the logged in user(this is accessible only when the setActiveAccount is bound to the LOGIN_SUCCESS event trigger)
  const loggedUser = instance.getActiveAccount();
  useEffect(() => {
    if (loggedUser && inProgress) {
      setName(() => loggedUser.name);
    }
  }, [loggedUser, inProgress]);

  return <Typography variant="h6">Welcome, {name}</Typography>;
};
