export const API_PORT = 3010;

export const ALLOWED_CLIENTS = [
  process.env.ADMIN_DASHBOARD_URL || "http://localhost:5173",
  process.env.WEB_APP_URL || "http://localhost:4321",
];
