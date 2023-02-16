import Typography from "@mui/material/Typography";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
export const Home = () => {
  return (
    <>
      {/* These components automatically protect our components without custom logic */}
      <AuthenticatedTemplate>
        <Typography variant="h6">
          You are signed-in. Select profile to call Microsoft Graph.
        </Typography>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        {" "}
        <Typography variant="h6">
          Please sign-in to see your profile information.
        </Typography>
      </UnauthenticatedTemplate>
    </>
  );
};
