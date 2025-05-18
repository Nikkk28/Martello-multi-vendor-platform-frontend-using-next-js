"use client"

import { useState } from "react"
import { PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/admin/users-table"

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <UsersTable filter="all" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="customers" className="mt-4">
          <UsersTable filter="CUSTOMER" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="vendors" className="mt-4">
          <UsersTable filter="VENDOR" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="admins" className="mt-4">
          <UsersTable filter="ADMIN" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
