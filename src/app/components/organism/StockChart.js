"use client";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function StockChart({ symbol, priceData, timePeriod }) {
  if (!priceData || !priceData.length) return null;

  const getThemeColor = (variableName) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim();
    }
    return "";
  };

  const colors = useMemo(() => {
    return {
      gain: getThemeColor("--color-gainText") || "#16a34a", 
      gainBg: getThemeColor("--color-gainBadgeBg") || "rgba(22,163,74,0.1)",
      loss: getThemeColor("--color-lossText") || "#dc2626",
      lossBg: getThemeColor("--color-lossBadgeBg") || "rgba(220,38,38,0.1)",
      axisText: getThemeColor("--color-axisText") || "#888",
      grid: getThemeColor("--color-grid") || "rgba(200,200,200,0.1)",
    };
  }, []);

  const firstClose = priceData[0].prev_close;
  const latestClose = priceData[priceData.length - 1].close;
  const change = latestClose - firstClose;
  const isUp = change >= 0;

  const labels = priceData.map((item) => {
    const date = new Date(item.date);
    if (timePeriod === 1) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  });

  const prices = priceData.map((item) => item.close);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${symbol} Price`,
        data: prices,
        borderColor: isUp ? colors.gain : colors.loss,
        backgroundColor: isUp ? colors.gainBg : colors.lossBg,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const idx = context.dataIndex;
            const d = priceData[idx];
            return [
              `Open: ₹${d.open.toFixed(2)}`,
              `High: ₹${d.high.toFixed(2)}`,
              `Low: ₹${d.low.toFixed(2)}`,
              `Close: ₹${d.close.toFixed(2)}`,
            ];
          },
          title: (items) => {
            return new Date(priceData[items[0].dataIndex].date).toLocaleString();
          },
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: colors.axisText, maxRotation: 0 },
      },
      y: {
        grid: { color: colors.grid },
        ticks: { color: colors.axisText },
      },
    },
    interaction: { mode: "index", intersect: false },
    hover: { mode: "index", intersect: false },
  };

  return (
    <div className="bg-cardBg dark:bg-cardDarkBg transition-all duration-300 p-4 rounded-lg shadow md:h-[400px] h-[300px]">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default StockChart;
