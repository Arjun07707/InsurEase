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
import { Badge } from "@/components/ui/badge";
import { getClaims, getUserPolicies, getPolicies } from "@/lib/data";
import { format, parseISO } from "date-fns";

export default async function ClaimsPage() {
  const claimsData = await getClaims();
  const userPoliciesData = await getUserPolicies();
  const policiesData = await getPolicies();

  // Assuming a logged-in user with id 'user-1'
  const currentUserPolicies = userPoliciesData.filter(
    (up) => up.userId === "user-1"
  );
  const currentUserPolicyIds = currentUserPolicies.map((up) => up.id);
  const currentUserClaims = claimsData.filter((c) =>
    currentUserPolicyIds.includes(c.userPolicyId)
  );

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>My Claims</CardTitle>
          <CardDescription>
            An overview of all your claim submissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date Submitted</TableHead>
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
                    <TableCell className="font-medium">
                      {policy?.name ?? "N/A"}
                    </TableCell>
                    <TableCell>{claim.reason}</TableCell>
                    <TableCell>${claim.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {format(parseISO(claim.date), "MMM d, yyyy")}
                    </TableCell>
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
    </div>
  );
}
