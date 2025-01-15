import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">© 2023 Kaminari Enhanced. All rights reserved.</p>
        <nav className="space-x-4">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  )
}

