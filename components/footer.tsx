import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
                <div>
                    <div className="font-semibold text-lg">StuffHunt</div>
                    <p className="text-sm text-muted-foreground mt-2">
                        Premium embroidery and custom apparel for teams and brands.
                    </p>
                </div>
                <div>
                    <div className="font-semibold mb-3">Shop</div>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/products" className="text-muted-foreground hover:underline">
                                All products
                            </Link>
                        </li>
                        <li>
                            <a href="/products?category=Hats" className="text-muted-foreground hover:underline">
                                Hats
                            </a>
                        </li>
                        <li>
                            <a href="/products?category=Polos" className="text-muted-foreground hover:underline">
                                Polos
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="font-semibold mb-3">Company</div>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/contact" className="text-muted-foreground hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="font-semibold mb-3">Get in touch</div>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/contact" className="text-muted-foreground hover:underline">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="text-muted-foreground hover:underline">
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-muted-foreground hover:underline">
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t">
                <div className="container mx-auto px-4 py-6 text-xs text-muted-foreground">
                    © {new Date().getFullYear()} StuffHunt. All rights reserved.
                </div>
            </div>
        </footer>
    )
}