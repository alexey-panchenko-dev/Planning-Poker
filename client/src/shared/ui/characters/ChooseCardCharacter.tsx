export const ChooseCardCharacter = ({ size = 35 }: { size?: number }) => {
  size *= 4;
  return (
    <div className="flex justify-center items-center">
      <img
        src="/ChooseCard.png"
        alt="Create"
        style={{ width: size, height: "auto" }}
      />
    </div>
  );
};
