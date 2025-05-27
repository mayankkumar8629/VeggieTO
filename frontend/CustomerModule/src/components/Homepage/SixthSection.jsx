import bg from "../../assets/bg6.png";

const SixthSection = () => {
  return (
    <div className="flex flex-col lg:flex-row m-16 rounded-2xl px-6 py-27 relative"
    style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Left section with content */}
      <div
        className="flex-1 space-y-6 text-left p-6 rounded-xl"
      >
        <h2 className="text-4xl font-bold font-[Plus-Jakarta-Sans] text-white leading-tight">
          From Cart to Home, Your Grocery Simplified.
        </h2>
        <p className="text-lg font-[Plus-Jakarta-Sans] text-gray-200">
          Curious why Krishi stands out as the go-to choice for premium groceries? Our dedication to quality, convenience, and freshness transforms every shopping trip into a delightful and satisfying experience. Discover how Krishi makes your culinary journey exceptional, every step of the way.
        </p>
        <button className="rounded-full  py-2 px-6 shadow-md bg-white hover:shadow-lg transition-all duration-300">
          Learn More
        </button>
      </div>

      {/* Right section (empty) */}
      <div className="flex-1"></div>
    </div>
  );
};


export default SixthSection;