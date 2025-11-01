import { StatCard } from "@/components/dashboard/stat-card";
import { Users, Shield, CreditCard, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { users, userPolicies, policies, payments } from "@/lib/data";
import { format, parseISO } from "date-fns";

export default async function AgentDashboard() {
  // Mock data for agent-1
  const agentClientIds = ['user-1', 'user-2'];
  const clientCount = agentClientIds.length;
  const policiesSoldCount = userPolicies.filter(up => agentClientIds.includes(up.userId)).length;
  const agentClientPolicyIds = userPolicies.filter(up => agentClientIds.includes(up.userId)).map(up => up.id);
  const totalPremiums = payments.filter(p => agentClientPolicyIds.includes(p.userPolicyId) && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalCommission = totalPremiums * 0.05; // Assuming 5% commission

  const recentSales = userPolicies.filter(up => agentClientIds.includes(up.userId)).slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={clientCount.toLocaleString()}
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          description="Number of policyholders you manage."
        />
        <StatCard
          title="Policies Sold"
          value={policiesSoldCount.toLocaleString()}
          icon={<Shield className="h-5 w-5 text-muted-foreground" />}
          description="Total policies sold to your clients."
        />
        <StatCard
          title="Total Premiums"
          value={`$${totalPremiums.toLocaleString()}`}
          icon={<CreditCard className="h-5 w-5 text-muted-foreground" />}
          description="Sum of premiums from your clients."
        />
        <StatCard
          title="Total Commission"
          value={`$${totalCommission.toLocaleString(undefined, {minimumFractionDigits: 2})}`}
          icon={<BarChart className="h-5 w-5 text-muted-foreground" />}
          description="Your total estimated earnings."
        />
      </div>

       <Card>
            <CardHeader>
                <CardTitle>Recent Policy Sales</CardTitle>
                 <CardDescription>
                    Your most recent sales activity.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Policy</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead className="text-right">Premium</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentSales.map(up => {
                            const client = users.find(u => u.id === up.userId);
                            const policy = policies.find(p => p.id === up.policyId);
                            return (
                                <TableRow key={up.id}>
                                    <TableCell>{client?.name}</TableCell>
                                    <TableCell>{policy?.name}</TableCell>
                                    <TableCell>{format(parseISO(up.startDate), 'MMM d, yyyy')}</TableCell>
                                    <TableCell className="text-right">${policy?.premium.toLocaleString()}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
