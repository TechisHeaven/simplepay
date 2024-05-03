export const createError = (status: number, message: any): Error => {
  const err: Error = new Error();
  (err as any).status = status;
  (err as any).message = message;
  return err;
};
