export function SkillsSection() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "HTML", color: "bg-orange-100 text-orange-800 border-orange-200" },
        { name: "CSS", color: "bg-blue-100 text-blue-800 border-blue-200" },
        { name: "JavaScript", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
        { name: "React", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
      ],
    },
    {
      category: "Design Tools",
      skills: [
        { name: "Figma", color: "bg-purple-100 text-purple-800 border-purple-200" },
        { name: "Photoshop", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
      ],
    },
    {
      category: "Other Tools",
      skills: [
        { name: "WordPress", color: "bg-gray-100 text-gray-800 border-gray-200" },
        { name: "Git", color: "bg-red-100 text-red-800 border-red-200" },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-16">Skills & Technologies</h2>

          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-6">{category.category}</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 hover:scale-105 hover:shadow-md ${skill.color}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills Overview */}
          <div className="mt-16 text-center">
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Always Learning</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                I'm constantly expanding my skill set and staying up-to-date with the latest technologies and best
                practices in web development, data science, and user experience design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
