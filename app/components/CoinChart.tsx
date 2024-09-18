"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

import { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

export const description = "A linear line chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function CoinChart() {
  const [chartData, setChartData] = useState([]);
  const WS_URL = "wss://wspap.okx.com:8443/ws/v5/public";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (readyState) {
      sendJsonMessage({
        op: "subscribe",
        args: [
          {
            channel: "tickers",
            instId: "BTC-USD-SWAP",
          },
        ],
      });
    }
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage?.data) {
      const newPrice = lastJsonMessage.data[0]?.last;
      if (newPrice) {
        setChartData((prevData) => {
          const newData = {
            time: new Date().toLocaleTimeString(),
            price: parseFloat(newPrice),
            yaxisPrice: parseFloat(newPrice),
          };
          return [...prevData, newData];
        });
      }
    }
  }, [lastJsonMessage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>BTC Bitcoin Price</CardTitle>
        <CardDescription>Real-time updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={true} />
            <YAxis
              dataKey="yaxisPrice"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={["dataMin", "dataMax"]}
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="price"
              type="linear"
              stroke="green"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
