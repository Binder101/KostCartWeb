"use client";

import dailyOperations from "@/restro_daily_operations.json";
import { CalendarDays, HandPlatter, IndianRupee, RefreshCcw, ShoppingBag, Truck } from "lucide-react";
import { useMemo, useState } from "react";

type OperationRecord = {
  date: string;
  res_name: string;
  platform: string;
  serviceType: string;
  "Subtotal (items total)": number;
  "Restaurant discount (Promo)": number;
  "Restaurant discount (BOGO, Freebies, Gold, Brand pack & others)": number;
  "Net Deductions\n[(C) + (D) + (E)]": number;
  "Net order value\n[(1) + (2) + (3) - (4) - (5) + (6) - (7) + (8)]": number;
  "Order level Payout\n(A) - (F) + (G)": number;
};

const records = dailyOperations as OperationRecord[];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const dateLabel = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

const percentageLabel = (value: number, total: number) => {
  if (total <= 0) {
    return "0%";
  }
  return `${((value / total) * 100).toFixed(1)}%`;
};

export default function DashboardPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedServiceType, setSelectedServiceType] = useState("all");
  const [selectedRange, setSelectedRange] = useState("15");

  const restaurantName = records[0]?.res_name ?? "Restaurant";
  const uniquePlatforms = useMemo(
    () => Array.from(new Set(records.map((record) => record.platform))),
    [],
  );
  const uniqueServiceTypes = useMemo(
    () => Array.from(new Set(records.map((record) => record.serviceType))),
    [],
  );

  const filteredRecords = useMemo(() => {
    const baseFiltered = records.filter((record) => {
      const platformMatch = selectedPlatform === "all" || record.platform === selectedPlatform;
      const serviceTypeMatch =
        selectedServiceType === "all" || record.serviceType === selectedServiceType;

      return platformMatch && serviceTypeMatch;
    });

    if (selectedRange === "all") {
      return baseFiltered;
    }

    const range = Number(selectedRange);
    return baseFiltered.slice(Math.max(baseFiltered.length - range, 0));
  }, [selectedPlatform, selectedServiceType, selectedRange]);

  const totals = useMemo(() => {
    return filteredRecords.reduce(
      (acc, record) => {
        acc.grossSales += record["Subtotal (items total)"];
        acc.totalDiscount +=
          record["Restaurant discount (Promo)"] +
          record["Restaurant discount (BOGO, Freebies, Gold, Brand pack & others)"];
        acc.netOrder += record["Net order value\n[(1) + (2) + (3) - (4) - (5) + (6) - (7) + (8)]"];
        acc.netPayable += record["Order level Payout\n(A) - (F) + (G)"];
        acc.totalDeductions += record["Net Deductions\n[(C) + (D) + (E)]"];
        return acc;
      },
      {
        grossSales: 0,
        totalDiscount: 0,
        netOrder: 0,
        netPayable: 0,
        totalDeductions: 0,
      },
    );
  }, [filteredRecords]);

  const last15DayFilteredRecords = useMemo(() => {
    const baseFiltered = records.filter((record) => {
      const platformMatch = selectedPlatform === "all" || record.platform === selectedPlatform;
      const serviceTypeMatch =
        selectedServiceType === "all" || record.serviceType === selectedServiceType;

      return platformMatch && serviceTypeMatch;
    });

    return baseFiltered.slice(Math.max(baseFiltered.length - 15, 0));
  }, [selectedPlatform, selectedServiceType]);

  const leakageBreakdown = useMemo(() => {
    return filteredRecords.reduce(
      (acc, record) => {
        acc.promoDiscount += record["Restaurant discount (Promo)"];
        acc.bogoDiscount +=
          record["Restaurant discount (BOGO, Freebies, Gold, Brand pack & others)"];
        acc.netDeductions += record["Net Deductions\n[(C) + (D) + (E)]"];
        return acc;
      },
      {
        promoDiscount: 0,
        bogoDiscount: 0,
        netDeductions: 0,
      },
    );
  }, [filteredRecords]);

  const last15DayAggregate = useMemo(() => {
    return last15DayFilteredRecords.reduce(
      (acc, record) => {
        acc.grossSales += record["Subtotal (items total)"];
        acc.netPayable += record["Order level Payout\n(A) - (F) + (G)"];
        acc.deductions += record["Net Deductions\n[(C) + (D) + (E)]"];
        acc.discount +=
          record["Restaurant discount (Promo)"] +
          record["Restaurant discount (BOGO, Freebies, Gold, Brand pack & others)"];
        return acc;
      },
      {
        grossSales: 0,
        netPayable: 0,
        deductions: 0,
        discount: 0,
      },
    );
  }, [last15DayFilteredRecords]);

  const maxBarValue = useMemo(() => {
    const allValues = filteredRecords.flatMap((record) => [
      record["Subtotal (items total)"],
      record["Order level Payout\n(A) - (F) + (G)"],
      record["Net Deductions\n[(C) + (D) + (E)]"],
    ]);
    return Math.max(...allValues, 1);
  }, [filteredRecords]);

  const chartReferenceMarks = useMemo(
    () => [1, 0.75, 0.5, 0.25, 0].map((ratio) => ({ ratio, value: Math.round(maxBarValue * ratio) })),
    [maxBarValue],
  );

  const leakageSegments = [
    { label: "Promo Discounts", value: leakageBreakdown.promoDiscount, color: "#6366F1" },
    { label: "BOGO / Freebies", value: leakageBreakdown.bogoDiscount, color: "#14B8A6" },
    { label: "Net Deductions", value: leakageBreakdown.netDeductions, color: "#F97316" },
  ];
  const leakageTotal = leakageSegments.reduce((sum, segment) => sum + segment.value, 0);
  const leakageConicGradient =
    leakageTotal > 0
      ? `conic-gradient(${leakageSegments
          .reduce<{ start: number; parts: string[] }>(
            (acc, segment) => {
              const next = acc.start + (segment.value / leakageTotal) * 360;
              acc.parts.push(`${segment.color} ${acc.start}deg ${next}deg`);
              return { start: next, parts: acc.parts };
            },
            { start: 0, parts: [] },
          )
          .parts.join(", ")})`
      : "conic-gradient(#CBD5E1 0deg 360deg)";

  const aggregateSegments = [
    { label: "Net Payable", value: last15DayAggregate.netPayable, color: "#3B82F6" },
    { label: "Deductions", value: last15DayAggregate.deductions, color: "#10B981" },
    { label: "Discount", value: last15DayAggregate.discount, color: "#F59E0B" },
  ];
  const aggregateTotal = aggregateSegments.reduce((sum, segment) => sum + segment.value, 0);
  const aggregateConicGradient =
    aggregateTotal > 0
      ? `conic-gradient(${aggregateSegments
          .reduce<{ start: number; parts: string[] }>(
            (acc, segment) => {
              const next = acc.start + (segment.value / aggregateTotal) * 360;
              acc.parts.push(`${segment.color} ${acc.start}deg ${next}deg`);
              return { start: next, parts: acc.parts };
            },
            { start: 0, parts: [] },
          )
          .parts.join(", ")})`
      : "conic-gradient(#CBD5E1 0deg 360deg)";

  return (
    <main className="min-h-screen px-3 pb-10 pt-24 text-[#F6F7D7] sm:px-6 sm:pt-28 lg:px-10">
      <section className="mx-auto max-w-7xl space-y-5">
        <div className="rounded-2xl border border-white/20 bg-white/90 p-4 text-slate-800 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">Dashboard</p>
              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{restaurantName}</h1>
              <p className="text-sm text-slate-600">Aggregated operations snapshot (auto-calculated from settlement data)</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <RefreshCcw size={16} />
              Synced just now
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: "Gross Sales", value: totals.grossSales, icon: ShoppingBag },
              { label: "Net Order Value", value: totals.netOrder, icon: IndianRupee },
              { label: "Net Payable", value: totals.netPayable, icon: HandPlatter },
              { label: "Total Deductions", value: totals.totalDeductions, icon: Truck },
              { label: "Discounts", value: totals.totalDiscount, icon: CalendarDays },
            ].map((metric) => (
              <article
                key={metric.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                  <metric.icon size={16} className="text-blue-600" />
                </div>
                <p className="text-2xl font-semibold text-slate-900">{formatCurrency(metric.value)}</p>
                <p className="mt-1 text-xs text-slate-500">for {filteredRecords.length} reporting day(s)</p>
              </article>
            ))}
          </div>
        </div>

        <section className="rounded-2xl border border-white/20 bg-white/90 p-4 text-slate-800 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-semibold text-slate-900">Performance trend</h2>

            <div className="flex flex-wrap gap-2">
              <select
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                value={selectedPlatform}
                onChange={(event) => setSelectedPlatform(event.target.value)}
              >
                <option value="all">All Platforms</option>
                {uniquePlatforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>

              <select
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                value={selectedServiceType}
                onChange={(event) => setSelectedServiceType(event.target.value)}
              >
                <option value="all">All Services</option>
                {uniqueServiceTypes.map((serviceType) => (
                  <option key={serviceType} value={serviceType}>
                    {serviceType}
                  </option>
                ))}
              </select>

              <select
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                value={selectedRange}
                onChange={(event) => setSelectedRange(event.target.value)}
              >
                <option value="7">Last 7 Days</option>
                <option value="15">Last 15 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="all">All Days</option>
              </select>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="mb-4 flex items-center justify-end gap-5 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />Gross</span>
                <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" />Net Payable</span>
                <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Deductions</span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                  {chartReferenceMarks.map((mark) => (
                    <div key={mark.ratio} className="relative border-t border-dashed border-slate-300/80">
                      <span className="absolute -top-3 left-0 bg-white px-1 text-[10px] text-slate-500">
                        {formatCurrency(mark.value)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(48px,1fr))] items-end gap-3 pt-2">
                {filteredRecords.map((record) => {
                  const gross = record["Subtotal (items total)"];
                  const payable = record["Order level Payout\n(A) - (F) + (G)"];
                  const deductions = record["Net Deductions\n[(C) + (D) + (E)]"];
                  return (
                    <div key={`${record.date}-${record.platform}-${record.serviceType}`} className="flex flex-col items-center gap-2">
                      <div className="flex h-64 items-end gap-1">
                        {[
                          { label: "Gross", value: gross, color: "bg-indigo-500" },
                          { label: "Net Payable", value: payable, color: "bg-blue-500" },
                          { label: "Deductions", value: deductions, color: "bg-emerald-500" },
                        ].map((bar) => (
                          <div key={bar.label} className="group relative flex h-full items-end">
                            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow transition group-hover:opacity-100">
                              {bar.label}: {formatCurrency(bar.value)}
                            </span>
                            <div
                              className={`w-3 rounded-t ${bar.color}`}
                              style={{ height: `${(bar.value / maxBarValue) * 100}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-600">{dateLabel(record.date)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">Revenue leakage breakdown</h3>
              <p className="text-xs text-slate-500">Dissection of major leakage heads for selected period</p>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <div
                  className="h-40 w-40 rounded-full border border-slate-200"
                  style={{ background: leakageConicGradient }}
                />
                <div className="space-y-2 text-sm text-slate-700">
                  {leakageSegments.map((segment) => (
                    <div key={segment.label} className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
                      <span>{segment.label}</span>
                      <span className="font-medium">{formatCurrency(segment.value)}</span>
                      <span className="text-xs text-slate-500">({percentageLabel(segment.value, leakageTotal)})</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">Last 15 days aggregate pie</h3>
              <p className="text-xs text-slate-500">Consolidated split across all values in the last 15 days</p>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <div
                  className="h-40 w-40 rounded-full border border-slate-200"
                  style={{ background: aggregateConicGradient }}
                />
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="text-xs text-slate-500">Gross (15d): {formatCurrency(last15DayAggregate.grossSales)}</p>
                  {aggregateSegments.map((segment) => (
                    <div key={segment.label} className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
                      <span>{segment.label}</span>
                      <span className="font-medium">{formatCurrency(segment.value)}</span>
                      <span className="text-xs text-slate-500">({percentageLabel(segment.value, aggregateTotal)})</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
