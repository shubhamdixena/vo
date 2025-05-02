import { Twitter, Instagram, Facebook, Youtube, Linkedin } from "lucide-react"

const Footer = () => {
  const navigation = {
    "take action": [
      { name: "give", href: "#" },
      { name: "join the spring", href: "#" },
      { name: "give to a fundraiser", href: "#" },
      { name: "give in someone's honor", href: "#" },
      { name: "sponsor a community", href: "#" },
      { name: "legacy giving", href: "#" },
    ],
    "get involved": [
      { name: "create an account", href: "#" },
      { name: "fundraise", href: "#" },
      { name: "tiny heroes", href: "#" },
      { name: "students & teachers", href: "#" },
      { name: "stream for us", href: "#" },
      { name: "experience lab", href: "#" },
    ],
    "get to know us": [
      { name: "our work", href: "#" },
      { name: "100% model", href: "#" },
      { name: "see our financials", href: "#" },
      { name: "meet the founder", href: "#" },
      { name: "careers", href: "#" },
    ],
    connect: [
      { name: "contact us", href: "#" },
      { name: "help center", href: "#" },
      { name: "request a speaker", href: "#" },
      { name: "brand partnerships", href: "#" },
      { name: "shop our store", href: "#" },
    ],
  }

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(navigation).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-medium text-gray-600 mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-600 hover:text-gray-900 text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between py-6 border-t border-gray-200">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
          <div>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
              privacy policy
            </a>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-4">
          <p className="mb-2">charity: water is a 501(c)(3) nonprofit organization.</p>
          <p className="mb-2 font-bold text-gray-700">
            100% of public donations go directly to fund clean water projects.
          </p>
          <p>
            &copy; {new Date().getFullYear()} | charity: water Donation Processing Center, 230 Franklin Rd., Ste. 11-E,
            Franklin, TN 37064 | c/o TC Cititzen Wells Limited, 5th Floor, 3 Durwed Road, London EC4V 8DL | Charity
            Global, Inc., a US 501 (c)(3) public charity, EIN 22-3936753 and an ANBI in the Netherlands, RSIN 826151656.
            Charity Global UK Limited is a UK registered charity (number 1169228) led by Charity Global, Inc.
          </p>
        </div>
        <div className="flex justify-end mt-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm mr-2">United States dollar</span>
              <span className="rounded-sm border border-gray-300 px-1">$</span>
            </div>
            <div className="flex space-x-3">
              <img
                src="https://www.charitywater.org/static/guidestar-e5fd0bdd467c1abf14b9d0d937113262.svg"
                alt="Guidestar"
                className="h-12"
              />
              <img
                src="https://www.charitywater.org/static/bbb-db2b4f038fa2dedbcad50d9db932bc34.svg"
                alt="BBB"
                className="h-12"
              />
              <img
                src="https://www.charitywater.org/static/charity-navigator-c0b1a8ce06f4bf9ce7d4d38e63aca6e3.svg"
                alt="Charity Navigator"
                className="h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
