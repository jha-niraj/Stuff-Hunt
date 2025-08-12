"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Profile = {
  name: string
  email: string
  phone?: string
  avatarUrl?: string
  bio?: string
  company?: string
  website?: string
}
type Address = {
  id: string
  label?: string
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
  country: string
}
type State = {
  profile: Profile
  addresses: Address[]
}
type Actions = {
  update: (partial: Partial<Profile>) => void
  addAddress: (addr: Omit<Address, "id"> & { id?: string }) => void
  updateAddress: (id: string, partial: Partial<Address>) => void
  removeAddress: (id: string) => void
}

export const useProfile = create<State & Actions>()(
  persist(
    (set, get) => ({
      profile: {
        name: "Taylor Smith",
        email: "taylor@example.com",
        phone: "+1 (555) 123-4567",
      },
      addresses: [],
      update: (partial) => set({ profile: { ...get().profile, ...partial } }),
      addAddress: (addr) =>
        set({
          addresses: [
            ...get().addresses,
            { ...addr, id: addr.id || crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36) },
          ],
        }),
      updateAddress: (id, partial) =>
        set({ addresses: get().addresses.map((a) => (a.id === id ? { ...a, ...partial } : a)) }),
      removeAddress: (id) => set({ addresses: get().addresses.filter((a) => a.id !== id) }),
    }),
    { name: "profile" },
  ),
)
