'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  GitCommit,
  Home,
  Rocket,
} from "lucide-react"
import Pipeline from './pipeline'

export function AppView() {
  return (
    <div className="flex-1 p-6 overflow-auto bg-white dark:bg-neutral-900">

      {/* Pipeline */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Deployment Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <Pipeline />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234,567</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+15.7% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Rocket className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">123 ms</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">-5.2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <GitCommit className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.12%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+0.03% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Home className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.99%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">No change from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-2 text-gray-500 dark:text-gray-400">Version</th>
                <th className="text-left py-2 text-gray-500 dark:text-gray-400">Commit</th>
                <th className="text-left py-2 text-gray-500 dark:text-gray-400">Date</th>
                <th className="text-left py-2 text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="py-2">v1.2.3</td>
                <td className="py-2">8f62a4d</td>
                <td className="py-2">2023-06-15 14:30</td>
                <td className="py-2 text-green-500 dark:text-green-400">Success</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-2">v1.2.2</td>
                <td className="py-2">3a1b8c9</td>
                <td className="py-2">2023-06-14 10:15</td>
                <td className="py-2 text-green-500 dark:text-green-400">Success</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-2">v1.2.1</td>
                <td className="py-2">5d7e6f2</td>
                <td className="py-2">2023-06-13 09:45</td>
                <td className="py-2 text-red-500 dark:text-red-400">Failed</td>
              </tr>
              <tr>
                <td className="py-2">v1.2.0</td>
                <td className="py-2">2c4b6a8</td>
                <td className="py-2">2023-06-12 16:20</td>
                <td className="py-2 text-green-500 dark:text-green-400">Success</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
