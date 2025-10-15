import {
  Info,
  ShoppingBag,
  Gift,
  Repeat,
  Shield,
  TrendingUp,
  Receipt,
  List,
  RotateCcw,
  AlertCircle,
  AlertTriangle,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  percentage?: string;
  icon: string;
  color: "pink" | "purple" | "cyan" | "blue" | "orange" | "violet" | "red";
}

const iconMap = {
  "shopping-bag": ShoppingBag,
  gift: Gift,
  repeat: Repeat,
  shield: Shield,
  "trending-up": TrendingUp,
  receipt: Receipt,
  list: List,
  "rotate-ccw": RotateCcw,
  "alert-circle": AlertCircle,
  "alert-triangle": AlertTriangle,
  users: Users,
  "user-check": UserCheck,
  "user-x": UserX,
};

const colorMap = {
  pink: "bg-pink-500/20 text-pink-500",
  purple: "bg-purple-500/20 text-purple-500",
  cyan: "bg-cyan-500/20 text-cyan-500",
  blue: "bg-blue-500/20 text-blue-500",
  orange: "bg-orange-500/20 text-orange-500",
  violet: "bg-violet-500/20 text-violet-500",
  red: "bg-red-500/20 text-red-500",
};

export const MetricCard = ({
  title,
  value,
  percentage,
  icon,
  color,
}: MetricCardProps) => {
  const Icon = iconMap[icon as keyof typeof iconMap];
  const colorClass = colorMap[color];

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${colorClass}`}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-lg text-muted-foreground mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {percentage && (
          <span className="text-sm text-muted-foreground">/ {percentage}</span>
        )}
      </div>
    </div>
  );
};
