import { Phone } from '@/components/ios/phone'

export default function Page() {
  return (
    <main className="fixed inset-0 h-dvh w-full overflow-hidden bg-neutral-950">
      <h1 className="sr-only">iPhone running iOS 26</h1>
      <Phone />
    </main>
  )
}
