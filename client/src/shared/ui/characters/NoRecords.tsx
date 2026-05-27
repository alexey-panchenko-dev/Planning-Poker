export const NoRecords = ({ size = 35 }: { size?: number }) => {
  size *= 4;
  return (
    <div className="flex justify-center items-center">
      <img
        src="/NoRecords.png"
        alt="Create"
        style={{ width: size, height: "auto" }}
      />
    </div>
  );
};
