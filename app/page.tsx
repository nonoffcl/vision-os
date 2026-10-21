import { Phone } from '@/components/ios/phone'

export default function Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-neutral-950">
      <h1 className="sr-only">iPhone running iOS 26</h1>
      <Phone />
    </main>
  )
}
