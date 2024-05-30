export const Loader = ({ center }: { center?: boolean }) => {
  return (
    <div
      className={`w-full h-full grid ${center && "place-items-center"}  z-10`}
    >
      <span className="border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-primary-color"></span>
    </div>
  );
};
