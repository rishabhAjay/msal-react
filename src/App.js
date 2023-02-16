import Grid from "@mui/material/Grid";
import { PageLayout } from "./components/PageLayout";

import { MsalProvider } from "@azure/msal-react";
import ApiContent from "./components/ApiContent";

function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <PageLayout>
        <Grid container justifyContent="center">
          <ApiContent />
        </Grid>
      </PageLayout>
    </MsalProvider>
  );
}

export default App;
