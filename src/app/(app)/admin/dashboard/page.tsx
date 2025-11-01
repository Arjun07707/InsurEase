import {
    getDashboardStats,
  } from "@/lib/data";
  import { StatCard } from "@/components/dashboard/stat-card";
  import { Users, Shield, FileText, CreditCard } from "lucide-react";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
  import { ClaimsStatusChart } from "@/components/charts/claims-status-chart";
  import { MonthlyPremiumsChart } from "@/components/charts/monthly-premiums-chart";

  
  export default async function AdminDashboard() {
    const stats = await getDashboardStats();
  
    return (
      <div className="flex flex-col gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            icon={<Users className="h-5 w-5 text-muted-foreground" />}
            description="Total number of policyholders"
          />
          <StatCard
            title="Policies Sold"
            value={stats.totalPoliciesSold.toLocaleString()}
            icon={<Shield className="h-5 w-5 text-muted-foreground" />}
            description="Total active and expired policies"
          />
          <StatCard
            title="Total Claims"
            value={stats.totalClaims.toLocaleString()}
            icon={<FileText className="h-5 w-5 text-muted-foreground" />}
            description="Across all users and policies"
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<CreditCard className="h-5 w-5 text-muted-foreground" />}
            description="Sum of all paid premiums"
          />
        </div>
  
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Claims by Status</CardTitle>
                    <CardDescription>A breakdown of all claims submitted.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ClaimsStatusChart />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Premium Collection</CardTitle>
                    <CardDescription>Monthly paid premiums over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MonthlyPremiumsChart />
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }
  