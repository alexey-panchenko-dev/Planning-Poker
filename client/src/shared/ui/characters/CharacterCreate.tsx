export const CharacterCreate = ({ size = 35 }: { size?: number }) => {
  size *= 4;
  return (
    <div className="flex justify-center items-center pr-9">
      <img
        src="/Create.png"
        alt="Create"
        style={{ width: size, height: "auto" }}
      />
    </div>
  );
};
