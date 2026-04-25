import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h4 className="text-xl font-heading font-bold text-text-primary mb-4">
              CrackWise
            </h4>
            <p className="text-text-secondary text-sm">
              Smart preparation platform for JEE and NEET aspirants. Crack exams with smart strategies and comprehensive study materials.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <a
                  href="https://www.reddit.com/r/CrackWise/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-orange transition-colors text-sm"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact.crackwise@gmail.com"
                  className="text-text-secondary hover:text-accent-orange transition-colors text-sm"
                >
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://x.com/CrackWisein"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-orange transition-colors text-sm"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/crackwise.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-orange transition-colors text-sm"
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-text-secondary text-sm">
            &copy; {currentYear} <span className="text-accent-orange font-semibold">CrackWise</span>. All rights reserved. Built with ❤️ for students.
          </p>
        </div>
      </div>
    </footer>
  )
}
