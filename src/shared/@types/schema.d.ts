export interface IValidator {
  verifyRequiredProps: () => { valid: boolean; missing: string };
}
