import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getUserPolicies,
  getClaims,
  getPolicies,
  getPayments,
} from "@/lib/data";
import { format, parseISO } from "date-fns";

export default async function Dashboard() {
  const userPoliciesData = await getUserPolicies();
  const claimsData = await getClaims();
  const policiesData = await getPolicies();
  const paymentsData = await getPayments();

  // Assuming a logged-in user with id 'user-1'
  const currentUserPolicies = userPoliciesData.filter(
    (up) => up.userId === "user-1"
  );
  const currentUserPolicyIds = currentUserPolicies.map((up) => up.id);
  const currentUserClaims = claimsData
    .filter((c) => currentUserPolicyIds.includes(c.userPolicyId))
    .slice(0, 5);
  const upcomingPayments = paymentsData.filter(
    (p) => currentUserPolicyIds.includes(p.userPolicyId) && p.status === "due"
  );

  return (
    <div className="grid flex-1 items-start gap-4 sm:gap-8">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>My Policies</CardTitle>
            <CardDescription>
              You have {currentUserPolicies.length} active policies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" asChild>
              <Link href="/policies">View All</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Claims</CardTitle>
            <CardDescription>
              {
                currentUserClaims.filter((c) => c.status === "pending").length
              }{" "}
              claims awaiting review.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" asChild>
              <Link href="/claims">View Claims</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>
              {upcomingPayments.length} premiums due soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" asChild>
              <Link href="/payments">Payment History</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Explore</CardTitle>
            <CardDescription>
              Browse and purchase new policies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" asChild>
              <Link href="/browse-policies">Browse Policies</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>
                An overview of your recent claim submissions.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/claims">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUserClaims.map((claim) => {
                  const userPolicy = userPoliciesData.find(
                    (up) => up.id === claim.userPolicyId
                  );
                  const policy = policiesData.find(
                    (p) => p.id === userPolicy?.policyId
                  );
                  return (
                    <TableRow key={claim.id}>
                      <TableCell>
                        <div className="font-medium">{policy?.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {claim.reason}
                        </div>
                      </TableCell>
                      <TableCell>${claim.amount.toLocaleString()}</TableCell>
                      <TableCell>{format(parseISO(claim.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            claim.status === "approved"
                              ? "default"
                              : claim.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {claim.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Your Active Policies</CardTitle>
                 <CardDescription>
                    A quick look at your current insurance coverage.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                {currentUserPolicies.map(userPolicy => {
                     const policy = policiesData.find(p => p.id === userPolicy.policyId);
                     if (!policy) return null;
                     return (
                        <div key={userPolicy.id} className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-secondary">
                                    <Shield className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium leading-none">{policy.name}</p>
                                    <p className="text-sm text-muted-foreground">Expires on {format(parseISO(userPolicy.endDate), "MMM d, yyyy")}</p>
                                </div>
                            </div>
                           <Button variant="outline" size="sm">Renew</Button>
                        </div>
                     )
                })}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
