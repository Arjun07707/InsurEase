"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getClaimsByStatus } from "@/lib/data";
import { ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

type ChartData = {
  status: string;
  count: number;
  fill: string;
};

const COLORS: { [key: string]: string } = {
  pending: "hsl(var(--chart-3))",
  approved: "hsl(var(--chart-1))",
  rejected: "hsl(var(--destructive))",
};

export function ClaimsStatusChart() {
  const [data, setData] = useState<ChartData[] | null>(null);

  useEffect(() => {
    getClaimsByStatus().then((d) =>
      setData(
        d.map((item) => ({
          ...item,
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
          fill: COLORS[item.status],
        }))
      )
    );
  }, []);

  if (!data) {
    return <Skeleton className="h-[250px] w-full" />;
  }

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel indicator="dot" />}
          />
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={5}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
