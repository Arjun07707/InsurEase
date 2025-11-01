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
  import { getClaims, getUserPolicies, getPolicies, getUsers } from "@/lib/data";
  import { format, parseISO } from "date-fns";
  import { Button } from "@/components/ui/button";
  import { MoreHorizontal } from "lucide-react";
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
  
  
  export default async function AdminClaimsPage() {
    const claims = await getClaims();
    const userPolicies = await getUserPolicies();
    const policies = await getPolicies();
    const users = await getUsers();
  
    return (
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>All Claims</CardTitle>
            <CardDescription>
              Review and manage all claims submitted by users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policyholder</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim) => {
                  const userPolicy = userPolicies.find(
                    (up) => up.id === claim.userPolicyId
                  );
                  const policy = policies.find(
                    (p) => p.id === userPolicy?.policyId
                  );
                  const user = users.find(u => u.id === userPolicy?.userId);
                  return (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{user?.name ?? "N/A"}</TableCell>
                      <TableCell>{policy?.name ?? "N/A"}</TableCell>
                      <TableCell>${claim.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        {format(parseISO(claim.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
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
                       <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                <DropdownMenuItem>Reject</DropdownMenuItem>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
