"use client"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"


import React, { useState, useCallback, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const description = "A linear line chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


export function CoinChart() {
const data= useRef()
  const WS_URL = "wss://wspap.okx.com:8443/ws/v5/public"
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed")
    console.log(JSON.parse(readyState))
    if (readyState) {
      sendJsonMessage({
        "op": "subscribe",
        "args": [
          {
            "channel": "tickers",
            "instId": "BTC-USD-SWAP"
          }
        ]
      })
    }
  }, [readyState])

  // Run when a new WebSocket message is received (lastJsonMessage).
  let chartData = [
    { month:lastJsonMessage?.data&&lastJsonMessage?.data[0]?.last, desktop: lastJsonMessage?.data&&lastJsonMessage?.data[0]?.last },
  ]
  useEffect(() => {
let temp = [
  { month:lastJsonMessage?.data&&lastJsonMessage?.data[0]?.last, desktop: lastJsonMessage?.data&&lastJsonMessage?.data[0]?.last },
]
chartData.push(...temp)

console.log(chartData)

  }, [lastJsonMessage])


  return (
    <Card>
      <CardHeader>
        <CardTitle>BTC Bitcoin Price</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={ chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <YAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
               <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="green"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}