// Extend the Request type to include a user property
export interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type based on your User model
}
