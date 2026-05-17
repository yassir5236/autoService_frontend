export default function SellCar() {
  return (
    <section className="bg-white dark:bg-gray-900 py-0 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mx-8 mb-12">
          {/* Left — Mountain Image */}
          <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" alt="Mountain landscape" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          </div>
          {/* Right — Content */}
          <div className="md:w-1/2 bg-white dark:bg-gray-800 p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Get A Fair Price For Your <span className="text-blue-600 dark:text-blue-400">Car</span>{" "}Sell To Us Today
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
              We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of options.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors w-fit text-sm">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}