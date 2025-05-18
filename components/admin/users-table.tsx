"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface UsersTableProps {
  filter: "all" | "CUSTOMER" | "VENDOR" | "ADMIN"
  searchQuery: string
}

// Sample data
const users = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "CUSTOMER",
    status: "Active",
    joinedAt: "Jan 12, 2023",
    avatarUrl: "",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "VENDOR",
    status: "Active",
    joinedAt: "Feb 23, 2023",
    avatarUrl: "",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    role: "CUSTOMER",
    status: "Inactive",
    joinedAt: "Mar 14, 2023",
    avatarUrl: "",
  },
  {
    id: "4",
    name: "William Kim",
    email: "william.kim@email.com",
    role: "VENDOR",
    status: "Pending",
    joinedAt: "Apr 5, 2023",
    avatarUrl: "",
  },
  {
    id: "5",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@email.com",
    role: "ADMIN",
    status: "Active",
    joinedAt: "May 18, 2023",
    avatarUrl: "",
  },
  {
    id: "6",
    name: "Liam Johnson",
    email: "liam.johnson@email.com",
    role: "CUSTOMER",
    status: "Active",
    joinedAt: "Jun 30, 2023",
    avatarUrl: "",
  },
  {
    id: "7",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    role: "VENDOR",
    status: "Inactive",
    joinedAt: "Jul 22, 2023",
    avatarUrl: "",
  },
  {
    id: "8",
    name: "Noah Wilson",
    email: "noah.wilson@email.com",
    role: "CUSTOMER",
    status: "Active",
    joinedAt: "Aug 14, 2023",
    avatarUrl: "",
  },
]

export function UsersTable({ filter, searchQuery }: UsersTableProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [filteredUsers, setFilteredUsers] = useState<typeof users>([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter users based on role and search query
    let result = users

    if (filter !== "all") {
      result = result.filter((user) => user.role === filter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
      )
    }

    setFilteredUsers(result)
  }, [filter, searchQuery])

  const handleDelete = (userId: string) => {
    toast({
      title: "User deleted",
      description: `User ID: ${userId} has been deleted.`,
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
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
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              No users found
            </TableCell>
          </TableRow>
        ) : (
          filteredUsers.map((user) => (
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
                <Badge
                  variant={user.role === "ADMIN" ? "destructive" : user.role === "VENDOR" ? "outline" : "secondary"}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.status === "Active" ? "default" : user.status === "Inactive" ? "secondary" : "outline"}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{user.joinedAt}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
