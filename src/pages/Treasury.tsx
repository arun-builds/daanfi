import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Landmark,
  Wallet,
  TrendingUp,
  CreditCard,
  Users,
  FileText,
  Settings,
  Package,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function TreasuryDashboard() {
  const chartData = [
    { month: "Jan", totalIn: 400, totalOut: 300 },
    { month: "Feb", totalIn: 500, totalOut: 400 },
    { month: "Mar", totalIn: 300, totalOut: 600 },
    { month: "Apr", totalIn: 600, totalOut: 700 },
    { month: "May", totalIn: 500, totalOut: 800 },
    { month: "Jun", totalIn: 400, totalOut: 600 },
    { month: "Jul", totalIn: 550, totalOut: 700 },
    { month: "Aug", totalIn: 500, totalOut: 500 },
    { month: "Sep", totalIn: 600, totalOut: 600 },
  ];

  const transactions = [
    {
      name: "Moscokatharine.eth",
      address: "0xFA4...Da9B",
      amount: "0.0035 ETH",
      usd: "$12.36 USD",
      type: "incoming",
    },
    {
      name: "Apple, Inc",
      address: "Mercury (...5136)",
      amount: "$800.32 USD",
      usd: "",
      type: "outgoing",
    },
  ];

  const accounts = [
    { name: "Multisig", amount: "$60,3350.49", color: "bg-lime-400" },
    { name: "Mercury Account", amount: "$99,153.49", color: "bg-green-500" },
    { name: "Custodial Wallet", amount: "$25,3650.59", color: "bg-lime-300" },
    { name: "Deposit Account", amount: "$140,356.99", color: "bg-green-600" },
  ];

  return (
    <div className="min-h-screen  ">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-lime-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-lime-600" />
          <span className="font-bold text-xl text-gray-800">TREASURYIAX</span>
        </div>

        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start bg-lime-100 text-lime-900 hover:bg-lime-200"
          >
            <Landmark className="mr-3 h-5 w-5" />
            Treasury
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-lime-50"
          >
            <Building2 className="mr-3 h-5 w-5" />
            Checking Account
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-lime-50"
          >
            <Wallet className="mr-3 h-5 w-5" />
            Custodial Wallet
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-lime-50"
          >
            <TrendingUp className="mr-3 h-5 w-5" />
            Trade
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-lime-50"
          >
            <CreditCard className="mr-3 h-5 w-5" />
            Cards
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-lime-50"
          >
            <Users className="mr-3 h-5 w-5" />
            Contacts
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-lime-50"
          >
            <FileText className="mr-3 h-5 w-5" />
            Statements
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-lime-50"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 p-3 hover:bg-lime-50 rounded-lg cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center relative">
              <span className="text-white font-semibold text-sm">TB</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-800">
                Tokyo Bam
              </div>
              <div className="text-xs text-gray-500">Metaverse, Inc.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Treasury</h1>
          <Button className="bg-lime-600 hover:bg-lime-700 text-white">
            Manage Account
          </Button>
        </div>

        {/* Balance Overview */}
        <Card className="mb-8 border-none shadow-none">
          <CardContent className="p-8">
            <div className="grid grid-cols-3 gap-8 mb-6">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  TOTAL BALANCE
                </div>
                <div className="text-5xl font-bold text-gray-900">
                  $378,842<span className="text-3xl">.90</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  CRYPTO
                </div>
                <div className="text-3xl font-semibold text-gray-900">
                  $74,658<span className="text-2xl">.42</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  FIAT
                </div>
                <div className="text-3xl font-semibold text-gray-900">
                  $54,962<span className="text-2xl">.66</span>
                </div>
              </div>
            </div>

            {/* Balance Bar */}
            <div className="flex gap-1 mb-4 h-3 rounded-full overflow-hidden">
              <div className="bg-lime-400" style={{ width: "16%" }}></div>
              <div className="bg-green-500" style={{ width: "26%" }}></div>
              <div className="bg-lime-300" style={{ width: "26%" }}></div>
              <div className="bg-green-600" style={{ width: "6%" }}></div>
              <div className="bg-lime-500" style={{ width: "26%" }}></div>
            </div>

            {/* Account Labels */}
            <div className="grid grid-cols-4 gap-4 text-sm">
              {accounts.map((account, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${account.color}`}
                  ></div>
                  <div>
                    <div className="text-gray-700 font-medium">
                      {account.name}
                    </div>
                    <div className="text-gray-500">{account.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Summary and Transactions */}
        <div className="grid grid-cols-3 gap-8 ">
          <Card className="col-span-2 border-none shadow-md bg-white ">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Monthly Summary
                </CardTitle>
                <Button
                  variant="ghost"
                  className="text-sm text-gray-600 hover:text-lime-600"
                >
                  See All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-lime-50 border border-lime-200 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Total In (July 2023)
                  </div>
                  <div className="text-3xl font-bold text-lime-600">
                    $1,450.34
                  </div>
                  <div className="text-sm text-lime-600 flex items-center gap-1 mt-2">
                    <span>↓</span> 2.5%
                  </div>

                  {/* Total In Chart */}
                  <div className="h-32 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <Bar
                          dataKey="totalIn"
                          fill="#84cc16"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Total Out (July 2023)
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    $3,402.22
                  </div>
                  <div className="text-sm text-green-600 flex items-center gap-1 mt-2">
                    <span>↑</span> 5.4%
                  </div>

                  {/* Total Out Chart */}
                  <div className="h-32 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <Bar
                          dataKey="totalOut"
                          fill="#22c55e"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Combined Chart Below */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Combined Overview
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: "#e5e7eb" }}
                      />
                      <YAxis
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: "#e5e7eb" }}
                      />
                      <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="circle"
                      />
                      <Bar
                        dataKey="totalIn"
                        fill="#84cc16"
                        name="Total In"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="totalOut"
                        fill="#22c55e"
                        name="Total Out"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Last Transactions */}
          <Card className="border-none shadow-md bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Last Transactions
              </CardTitle>
              <div className="flex gap-4 text-sm">
                <button className="font-medium text-lime-600 border-b-2 border-lime-600 pb-1">
                  Outgoing
                </button>
                <button className="text-gray-500 hover:text-lime-600">
                  Incoming
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-lime-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${
                        index === 0
                          ? "bg-gradient-to-br from-lime-400 to-green-500"
                          : "bg-gray-800"
                      } rounded-lg flex items-center justify-center text-white font-bold`}
                    >
                      {index === 0 ? "🌐" : "🍎"}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-800">
                        {tx.name}
                      </div>
                      <div className="text-xs text-gray-500">{tx.address}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm text-lime-600">
                      {tx.amount}
                    </div>
                    {tx.usd && (
                      <div className="text-xs text-gray-500">{tx.usd}</div>
                    )}
                  </div>
                </div>
              ))}

              <button className="w-full flex items-center gap-2 p-4 text-gray-600 hover:bg-lime-50 rounded-lg transition-colors">
                <div className="w-10 h-10 border-2 border-dashed border-lime-300 rounded-lg flex items-center justify-center">
                  <span className="text-xl text-lime-600">+</span>
                </div>
                <span className="font-medium">Add Owner</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
