"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
const chartData = [
  { month: "January", saopaulo: 1718825, rio: 2120053 },
  { month: "February", saopaulo: 1800757, rio: 2150308 },
  { month: "March", saopaulo: 1854451, rio: 2195512 },
  { month: "April", saopaulo: 1924330, rio: 2238223 },
  { month: "May", saopaulo: 1984598, rio: 2275481 },
  { month: "June", saopaulo: 2020725, rio: 2300875 },
];

const chartConfig = {
  saopaulo: {
    label: "São Paulo",
    color: "hsl(var(--chart-1))",
  },
  rio: {
    label: "Rio de Janeiro",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function PriceTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Preços por Cidade</CardTitle>
        <CardDescription>Janeiro - Junho 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="saopaulo" fill="var(--color-saopaulo)" radius={4} />
            <Bar dataKey="rio" fill="var(--color-rio)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
