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

  const maxBarValue = useMemo(() => {
    const allValues = filteredRecords.flatMap((record) => [
      record["Subtotal (items total)"],
      record["Order level Payout\n(A) - (F) + (G)"],
      record["Net Deductions\n[(C) + (D) + (E)]"],
    ]);
    return Math.max(...allValues, 1);
  }, [filteredRecords]);

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
              <div className="grid grid-cols-[repeat(auto-fit,minmax(48px,1fr))] items-end gap-3">
                {filteredRecords.map((record) => {
                  const gross = record["Subtotal (items total)"];
                  const payable = record["Order level Payout\n(A) - (F) + (G)"];
                  const deductions = record["Net Deductions\n[(C) + (D) + (E)]"];
                  return (
                    <div key={record.date} className="flex flex-col items-center gap-2">
                      <div className="flex h-64 items-end gap-1">
                        <div
                          className="w-3 rounded-t bg-indigo-500"
                          title={`Gross ${formatCurrency(gross)}`}
                          style={{ height: `${(gross / maxBarValue) * 100}%` }}
                        />
                        <div
                          className="w-3 rounded-t bg-blue-500"
                          title={`Net Payable ${formatCurrency(payable)}`}
                          style={{ height: `${(payable / maxBarValue) * 100}%` }}
                        />
                        <div
                          className="w-3 rounded-t bg-emerald-500"
                          title={`Deductions ${formatCurrency(deductions)}`}
                          style={{ height: `${(deductions / maxBarValue) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-600">{dateLabel(record.date)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
