export function AboutSection() {
  const interests = [
    { icon: "☕", text: "Coffee" },
    { icon: "📸", text: "Photography" },
    { icon: "🎬", text: "Netflix" },
    { icon: "🌊", text: "Ocean documentaries" },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-16">About Me</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - About Text */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate Information Science student at the University of Illinois Urbana-Champaign, where I'm
                exploring the fascinating world of data, technology, and human-computer interaction. My academic journey
                has given me a deep appreciation for how information systems can solve real-world problems and improve
                people's lives.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond academics, I have a creative side that I love to explore. Whether I'm experimenting with new
                cocktail recipes, capturing moments through photography, or diving deep into ocean documentaries, I'm
                always seeking new experiences and knowledge. This curiosity drives my approach to both learning and
                problem-solving.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe in the power of combining technical skills with creative thinking to build meaningful digital
                experiences. My goal is to bridge the gap between complex technology and intuitive user experiences.
              </p>

              <div className="mt-8">
                <img
                  src="/images/nivedita-casual.jpeg"
                  alt="Nivedita enjoying a night out by the waterfront"
                  className="w-full max-w-md rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>

            {/* Right Column - Interests */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">What I Enjoy</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl">{interest.icon}</span>
                    <span className="text-lg font-medium text-card-foreground">{interest.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="text-lg font-semibold text-foreground mb-3">Currently Learning</h4>
                <p className="text-muted-foreground">
                  Advanced data visualization techniques, machine learning applications in information systems, and
                  modern web development frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
