export class AdminAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminAuthError";
  }
}

export class UnauthorizedAdminError extends AdminAuthError {
  constructor() {
    super("Admin authentication is required.");
    this.name = "UnauthorizedAdminError";
  }
}

export class ForbiddenAdminError extends AdminAuthError {
  constructor() {
    super("Authenticated user is not allowed to access admin.");
    this.name = "ForbiddenAdminError";
  }
}

export class AdminConfigError extends AdminAuthError {
  constructor(message: string) {
    super(message);
    this.name = "AdminConfigError";
  }
}
