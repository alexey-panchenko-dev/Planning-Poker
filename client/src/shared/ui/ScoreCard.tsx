interface ScoreCardProps {
  value: string;
}

export const ScoreCard = ({ value }: ScoreCardProps) => {
  return <button className="bg-card-bg h-[200px] w-[100px]"></button>;
};
