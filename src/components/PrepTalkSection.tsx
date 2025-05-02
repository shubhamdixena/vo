const PrepTalkSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="order-2 md:order-1">
            <div className="bg-[#F1F1F1] px-3 py-2 rounded-md inline-block mb-6">
              <span className="text-xs font-proxima font-bold uppercase tracking-wider text-gray-600">PREP TALK</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl mb-4 leading-[1.1] text-[#1A1A1A]">
              From once a day to twice a year
            </h2>
            <p className="font-proxima text-lg text-[#4A4A4A] mb-10">
              Long-acting preventatives will save more lives from HIV/AIDS.
            </p>
            <div className="relative h-80 overflow-hidden rounded-lg shadow-lg">
              <img
                src="/assets/111824 - HIV-PREP - BLOGROLL IMAGE - 800x484.jpg"
                alt="HIV Preventative Medication"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <button className="absolute right-5 top-5 bg-white rounded-full p-2.5 shadow-md hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative h-full w-full rounded-xl overflow-hidden shadow-xl">
              <img
                src="/assets/20241108-HITF-Dora-vNext-2400x1500-001.jpeg"
                alt="Woman in field"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ minHeight: "600px" }}
              />

              <div className="absolute bottom-8 left-8 bg-white p-7 rounded-lg max-w-xs shadow-lg">
                <div className="text-sm font-proxima font-bold uppercase tracking-wider text-[#1CABA2] mb-2">
                  DORA THE PLANT EXPLORER
                </div>
                <h3 className="text-2xl font-proxima font-bold text-[#1A1A1A] mb-3 leading-tight">
                  She's up at 3 a.m. to help farmers thrive
                </h3>
                <p className="text-[#4A4A4A] font-proxima font-medium">
                  Dora Shimbwambwa looks for novel ways to fight invasive pests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrepTalkSection
