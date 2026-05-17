// SVG brand logos — stroke color adapts via CSS currentColor
const AudiLogo = () => (
  <svg viewBox="0 0 80 30" className="w-12 h-8" fill="none">
    {[0,14,28,42].map((x, i) => (
      <circle key={i} cx={x+14} cy={15} r={12} stroke="currentColor" strokeWidth="2.5" fill="none"/>
    ))}
  </svg>
);

const BMWLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="20" cy="20" r="19" fill="none" stroke="#1a1a2e" strokeWidth="2"/>
    <circle cx="20" cy="20" r="13" fill="none" stroke="#1a1a2e" strokeWidth="1"/>
    <path d="M20 7 v13 M7 20 h13" stroke="#1a1a2e" strokeWidth="1"/>
    <path d="M20 7 A13 13 0 0 1 33 20" fill="#1a5c99"/>
    <path d="M20 33 A13 13 0 0 1 7 20" fill="#1a5c99"/>
    <text x="20" y="24" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1a1a2e">BMW</text>
  </svg>
);

const FordLogo = () => (
  <svg viewBox="0 0 80 40" className="w-14 h-8">
    <ellipse cx="40" cy="20" rx="38" ry="17" fill="#003178"/>
    <text x="40" y="26" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" fontStyle="italic" fontFamily="serif">Ford</text>
  </svg>
);

const MercedesLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="20" cy="20" r="18" fill="none" stroke="#333" strokeWidth="1.5"/>
    <circle cx="20" cy="20" r="16" fill="none" stroke="#333" strokeWidth="0.5"/>
    <line x1="20" y1="4" x2="20" y2="20" stroke="#333" strokeWidth="1.5"/>
    <line x1="20" y1="20" x2="6" y2="30" stroke="#333" strokeWidth="1.5"/>
    <line x1="20" y1="20" x2="34" y2="30" stroke="#333" strokeWidth="1.5"/>
  </svg>
);

const PeugeotLogo = () => (
  <svg viewBox="0 0 40 48" className="w-8 h-10">
    <path d="M20 2 L36 12 L36 32 L20 46 L4 32 L4 12 Z" fill="none" stroke="#333" strokeWidth="2"/>
    <text x="20" y="30" textAnchor="middle" fontSize="20" fill="#333" fontWeight="bold">P</text>
  </svg>
);

const VWLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="20" cy="20" r="18" fill="none" stroke="#1a3d6e" strokeWidth="1.5"/>
    <text x="20" y="26" textAnchor="middle" fontSize="16" fill="#1a3d6e" fontWeight="bold">VW</text>
  </svg>
);

const brands = [
  { name: "Audi", logo: AudiLogo },
  { name: "BMW", logo: BMWLogo },
  { name: "Ford", logo: FordLogo },
  { name: "Mercedes Benz", logo: MercedesLogo },
  { name: "Peugeot", logo: PeugeotLogo },
  { name: "Volkswagen", logo: VWLogo },
];

export default function PremiumBrands() {
  return (
    <section className="bg-white dark:bg-gray-900 py-10 px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Explore Our Premium Brands</h2>
          <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
            Show All Brands
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {brands.map(({ name, logo: Logo }) => (
            <a
              key={name}
              href="#"
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-500/10 transition-all group cursor-pointer text-gray-700 dark:text-gray-300"
            >
              <div className="h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Logo />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium text-center">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}