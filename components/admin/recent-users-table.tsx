"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface RecentUsersTableProps {
  isLoading?: boolean
}

// Sample data
const recentUsers = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "CUSTOMER",
    joinedAt: "2 hours ago",
    avatarUrl: "",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "VENDOR",
    joinedAt: "5 hours ago",
    avatarUrl: "",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    role: "CUSTOMER",
    joinedAt: "1 day ago",
    avatarUrl: "",
  },
  {
    id: "4",
    name: "William Kim",
    email: "william.kim@email.com",
    role: "VENDOR",
    joinedAt: "2 days ago",
    avatarUrl: "",
  },
]

export function RecentUsersTable({ isLoading = false }: RecentUsersTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={user.role === "ADMIN" ? "destructive" : user.role === "VENDOR" ? "outline" : "secondary"}>
                {user.role}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{user.joinedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
