import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { MainProfile } from "./_components/mainprofile"

export default async function ProfilePage() {
    const session = await auth()

    if (!session?.user) {
        redirect('/signin')
    }

    return <MainProfile />
}
