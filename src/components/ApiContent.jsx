import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config/config";
function ApiContent() {
  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState(null);

  //the acquireTokenSilent method returns an accessToken upon logging in.
  // This method generates a new token on every render. This could be prevented with conditional rendering
  useEffect(() => {
    const accessTokenRequest = {
      scopes: config.scopes,
      account: accounts[0],
    };
    if (!apiData && inProgress === InteractionStatus.None) {
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          // Acquire token silent success
          let accessToken = accessTokenResponse.accessToken;
          console.log(accessTokenResponse.accessToken);

          //you would typically save the token generated in the sessionStorage and call protected APIs with that token
          axios
            .get(`${config.backend_uri}/hello`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => {
              setApiData(response.data);
            });
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect(accessTokenRequest);
          }
          console.log(error);
        });
    }
  }, [instance, accounts, inProgress, apiData]);

  return <p>Return your protected content here: {JSON.stringify(apiData)}</p>;
}

export default ApiContent;
