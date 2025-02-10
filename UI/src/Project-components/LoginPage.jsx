export default function LoginPage() {
  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */

  const client_id =
    "446172791092-ijgfqcf5v4120o4kr6mkif88m8n4v2t8.apps.googleusercontent.com";
  const redirect_uri = "http://localhost:5174/dashboard";

  function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: client_id,
      redirect_uri: redirect_uri,
      response_type: "token",
      scope:'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly',
      include_granted_scopes: "true",
      state: "pass-through value",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
  return (
    <div>
      <button
        onClick={() => {
          oauthSignIn();
        }}
        style={{ backgroundColor: "white", color: "black" }}
      >
        test
      </button>
    </div>
  );
}
