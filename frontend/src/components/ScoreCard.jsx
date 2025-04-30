import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Score = ({ title, score, description, color }) => {
  const getColorClass = (color) => {
    const colors = {
      purple: "text-purple-600 dark:text-purple-400",
      amber: "text-amber-600 dark:text-amber-400",
      green: "text-green-600 dark:text-green-400",
      red: "text-red-600 dark:text-red-400",
    };
    return colors[color] || colors.purple;
  };

  return (
    <Card className="shadow-lg dark:shadow-gray-900/10">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <div className={cn("text-4xl font-bold", getColorClass(color))}>
            {score}
          </div>
          <div
            className={cn(
              "text-sm font-medium px-3 py-1 rounded-full",
              color === "purple"
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                : color === "amber"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                : color === "green"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
            )}
          >
            {description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default Score;
