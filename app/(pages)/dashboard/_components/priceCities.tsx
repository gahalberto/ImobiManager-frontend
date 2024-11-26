"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
  { city: "São Paulo", price: 3200000 },
  { city: "Rio de Janeiro", price: 2800000 },
  { city: "Belo Horizonte", price: 2500000 },
  { city: "Curitiba", price: 2300000 },
  { city: "Porto Alegre", price: 2100000 },
];

const chartConfig = {
  price: {
    label: "Preço: R$",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function PriceCitiesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de preços por cidade</CardTitle>
        <CardDescription>Ano 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="city"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="price" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="price"
              layout="vertical"
              fill="var(--color-price)"
              radius={4}
            >
              <LabelList
                dataKey="city"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="price"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                angle={-90}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
