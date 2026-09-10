export type LoanRequestNotification = {
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  loanProgram?: string | null;
  propertyType?: string | null;
  loanAmount?: string | number | null;
  propertyCity?: string | null;
  propertyState?: string | null;
  message?: string | null;
  sourcePage?: string | null;
};
