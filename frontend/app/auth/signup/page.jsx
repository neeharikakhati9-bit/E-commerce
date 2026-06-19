"use client"

import React, { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Sign up to access your dashboard and manage your items.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="new-password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>

          {submitted ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
              Thanks for signing up! We'll send a confirmation email once your account is activated.
            </div>
          ) : null}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Already have an account?</p>
          <Link href="/auth/login" className="text-primary underline hover:text-primary/80">
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignupPage;
