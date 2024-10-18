// Spotify Authorization Code with PKCE Flow

const CLIENT_ID = "0fdaae456f1f4de39b3e9cca593980d1" as const;
const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://alexttyip.github.io";

function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function base64encode(stringToEncode: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return btoa(String.fromCharCode.apply(null, new Uint8Array(stringToEncode)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return base64encode(digest);
}

export function requestAuth() {
  const codeVerifier = generateRandomString(128);

  generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    const state = generateRandomString(16);
    const scope = "user-read-playback-state";

    localStorage.setItem("code_verifier", codeVerifier);

    const args = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope,
      redirect_uri: REDIRECT_URI,
      state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location.href = "https://accounts.spotify.com/authorize?" + args;
  });
}

async function requestToken(code: string) {
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) {
    throw new Error("No code verifier found");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("HTTP status " + response.status);
  }

  const { access_token, refresh_token } = (await response.json()) as {
    access_token: string;
    refresh_token?: string;
  };
  localStorage.setItem("access_token", access_token);

  if (refresh_token) {
    localStorage.setItem("refresh_token", refresh_token);
  }
}

export async function requestAccessToken() {
  if (localStorage.getItem("access_token")) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    await requestToken(code);
    window.location.reload();
  }
}

export async function getRefreshToken() {
  const refreshToken = localStorage.getItem(`refresh_token`);

  if (!refreshToken) {
    localStorage.clear();
    console.error("Refresh token not found, clearing local storage");
    return;
  }

  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    }),
  };

  const body = await fetch(url, payload);
  const { access_token, refresh_token } = (await body.json()) as {
    access_token: string;
    refresh_token?: string;
  };

  localStorage.setItem(`access_token`, access_token);

  if (refresh_token) {
    localStorage.setItem(`refresh_token`, refresh_token);
  }
}
