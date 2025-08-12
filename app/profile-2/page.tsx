"use client"

import Image from "next/image"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useProfile } from "@/stores/profile-store"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const profile = useProfile((s) => s.profile)
  const update = useProfile((s) => s.update)
  const addresses = useProfile((s) => s.addresses)
  const addAddress = useProfile((s) => s.addAddress)
  const updateAddress = useProfile((s) => s.updateAddress)
  const removeAddress = useProfile((s) => s.removeAddress)

  const [addrForm, setAddrForm] = useState({
    id: "",
    label: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
  })

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" })

  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-10 md:py-16">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Your Profile</h1>
            <p className="text-muted-foreground mt-2">Manage account info, addresses, and security.</p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {/* Left: w-1/3 */}
            <Card className="md:col-span-1">
              <CardContent className="p-6 grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 overflow-hidden rounded-full border bg-muted">
                    <Image
                      src={profile.avatarUrl || "/placeholder.svg?height=128&width=128&query=avatar"}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{profile.name || "Your Name"}</div>
                    <div className="text-sm text-muted-foreground">{profile.email || "you@example.com"}</div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue={profile.name}
                    onBlur={(e) => update({ name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={profile.email}
                    onBlur={(e) => update({ email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue={profile.phone}
                    onBlur={(e) => update({ phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Notes</Label>
                  <Textarea
                    id="bio"
                    defaultValue={profile.bio}
                    onBlur={(e) => update({ bio: e.target.value })}
                    placeholder="Any preferences or notes about your orders…"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Right: w-2/3 */}
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          defaultValue={profile.company}
                          onBlur={(e) => update({ company: e.target.value })}
                          placeholder="Company name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          defaultValue={profile.website}
                          onBlur={(e) => update({ website: e.target.value })}
                          placeholder="https://…"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        onClick={() =>
                          toast({ title: "Profile saved", description: "Your profile information has been updated." })
                        }
                      >
                        Save changes
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="addresses" className="mt-6">
                    <div className="grid gap-4">
                      {addresses.map((a) => (
                        <div key={a.id} className="rounded-lg border p-4 grid md:grid-cols-2 gap-4">
                          <div className="grid gap-1 text-sm">
                            <div className="font-medium">{a.label || "Address"}</div>
                            <div>{a.line1}</div>
                            {a.line2 ? <div>{a.line2}</div> : null}
                            <div>
                              {a.city}, {a.state} {a.zip}
                            </div>
                            <div>{a.country}</div>
                          </div>
                          <div className="flex items-center gap-2 md:justify-end">
                            <Button
                              variant="outline"
                              className="bg-transparent"
                              onClick={() => {
                                setAddrForm({ ...a })
                              }}
                            >
                              Edit
                            </Button>
                            <Button variant="destructive" onClick={() => removeAddress(a.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="rounded-lg border p-4 grid gap-3">
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className="grid gap-1">
                            <Label>Label</Label>
                            <Input
                              value={addrForm.label}
                              onChange={(e) => setAddrForm({ ...addrForm, label: e.target.value })}
                              placeholder="Home, Office…"
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>Line 1</Label>
                            <Input
                              value={addrForm.line1}
                              onChange={(e) => setAddrForm({ ...addrForm, line1: e.target.value })}
                              placeholder="Street address"
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>Line 2</Label>
                            <Input
                              value={addrForm.line2}
                              onChange={(e) => setAddrForm({ ...addrForm, line2: e.target.value })}
                              placeholder="Apt, suite, etc. (optional)"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-4 gap-3">
                          <div className="grid gap-1">
                            <Label>City</Label>
                            <Input
                              value={addrForm.city}
                              onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>State</Label>
                            <Input
                              value={addrForm.state}
                              onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>ZIP</Label>
                            <Input
                              value={addrForm.zip}
                              onChange={(e) => setAddrForm({ ...addrForm, zip: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>Country</Label>
                            <Input
                              value={addrForm.country}
                              onChange={(e) => setAddrForm({ ...addrForm, country: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              if (addrForm.id) {
                                updateAddress(addrForm.id, addrForm)
                                toast({ title: "Address updated", description: "Saved your changes." })
                              } else {
                                addAddress(addrForm)
                                toast({ title: "Address added", description: "New address saved to your profile." })
                              }
                              setAddrForm({
                                id: "",
                                label: "",
                                line1: "",
                                line2: "",
                                city: "",
                                state: "",
                                zip: "",
                                country: "USA",
                              })
                            }}
                          >
                            {addrForm.id ? "Update address" : "Add address"}
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-transparent"
                            onClick={() =>
                              setAddrForm({
                                id: "",
                                label: "",
                                line1: "",
                                line2: "",
                                city: "",
                                state: "",
                                zip: "",
                                country: "USA",
                              })
                            }
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="password" className="mt-6">
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="grid gap-2">
                        <Label htmlFor="current">Current password</Label>
                        <Input
                          id="current"
                          type="password"
                          value={pw.current}
                          onChange={(e) => setPw({ ...pw, current: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new">New password</Label>
                        <Input
                          id="new"
                          type="password"
                          value={pw.next}
                          onChange={(e) => setPw({ ...pw, next: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm">Confirm password</Label>
                        <Input
                          id="confirm"
                          type="password"
                          value={pw.confirm}
                          onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        onClick={() => {
                          if (!pw.next || pw.next.length < 8) {
                            toast({ title: "Password too short", description: "Use at least 8 characters." })
                            return
                          }
                          if (pw.next !== pw.confirm) {
                            toast({ title: "Passwords do not match", description: "Check your confirmation." })
                            return
                          }
                          toast({ title: "Password updated", description: "Your password was changed." })
                          setPw({ current: "", next: "", confirm: "" })
                        }}
                      >
                        Change password
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
