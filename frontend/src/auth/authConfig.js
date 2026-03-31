const authConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_i5QC8tt6g",
  client_id: "6nujo7uno7174icnbh5mf7i1dr",
  redirect_uri: "https://d6wztq0o0w1ws.cloudfront.net/",
  post_logout_redirect_uri: "https://d6wztq0o0w1ws.cloudfront.net/",

  response_type: "code",
  scope: "openid profile email",
};

export default authConfig;