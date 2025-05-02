const ImpactSection = () => {
  const impactStats = [
    {
      stat: "100%",
      description: "of your money funds water projects",
    },
    {
      stat: "85M+",
      description: "people have been helped with clean water",
    },
    {
      stat: "29",
      description: "countries with charity: water projects",
    },
  ]

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            We've brought clean water to more than 15.5 million people
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Since 2006, with a network of passionate local partners, we've funded more than 124,000 water projects in 29
            countries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {impactStats.map((stat, index) => (
            <div className="text-center" key={index}>
              <h3 className="text-5xl font-bold text-charity-black mb-2">{stat.stat}</h3>
              <p className="text-gray-600 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactSection
