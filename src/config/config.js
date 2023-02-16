const config = {
  backend_uri: process.env.REACT_APP_BACKEND_URI,
  forgot_password_authority: process.env.REACT_APP_FORGOT_PASSWORD_AUTHORITY,
  tenant_id: process.env.REACT_APP_TENANT_ID,
  cache_location: "localStorage",
  redirect_uri: process.env.REACT_APP_REDIRECT_URI || "/",
  scopes: [process.env.REACT_APP_SCOPES],
  client_id: process.env.REACT_APP_CLIENT_ID,
};

export default config;
