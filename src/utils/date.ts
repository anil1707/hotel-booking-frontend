export const calculateNights = (
  checkIn: string,
  checkOut: string
) => {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const start = new Date(
    checkIn
  );

  const end = new Date(
    checkOut
  );

  const difference =
    end.getTime() -
    start.getTime();

  return Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );
};