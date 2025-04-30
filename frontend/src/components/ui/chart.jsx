const ChartContainer = ({ className, ...props }) => {
  return <div className={className} {...props} />;
};

const ChartGrid = ({ horizontal = true, vertical = true, ...props }) => {
  return null;
};

const ChartAxisX = ({ ...props }) => {
  return null;
};

const ChartAxisY = ({ ...props }) => {
  return null;
};

const ChartLine = ({
  data,
  valueKey,
  categoryKey,
  color,
  strokeWidth,
  ...props
}) => {
  return null;
};

const ChartBar = ({ data, valueKey, categoryKey, color, ...props }) => {
  return null;
};

const ChartArea = ({
  data,
  valueKey,
  categoryKey,
  color,
  opacity,
  ...props
}) => {
  return null;
};

const ChartTooltip = ({ children }) => {
  return null;
};

const ChartTooltipContent = ({ children }) => {
  return <div>{children}</div>;
};

export {
  ChartContainer,
  ChartGrid,
  ChartAxisX,
  ChartAxisY,
  ChartLine,
  ChartBar,
  ChartArea,
  ChartTooltip,
  ChartTooltipContent,
};
