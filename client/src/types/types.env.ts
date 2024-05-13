export interface ENV {
  GOOGLE_CLIENT_ID: string | undefined;
  GOOGLE_CLIENT_SECRET: string | undefined;
  NEXTAUTH_URL: string | undefined;
  NEXTAUTH_SECRET: string | undefined;
  GITHUB_ID: string | undefined;
  GITHUB_SECRET: string | undefined;
  BACKEND_URL: string | undefined;
}

export interface Config {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  GITHUB_ID: string;
  GITHUB_SECRET: string;
  BACKEND_URL: string;
}
