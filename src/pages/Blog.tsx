const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "How We Rate Race Excitement",
      excerpt: "Learn about our methodology for determining which races are worth watching.",
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "The Evolution of Race Replay",
      excerpt: "From VHS to streaming: How technology changed how we watch races.",
      date: "2024-03-10",
    },
    {
      id: 3,
      title: "Top 5 Most Exciting Races of 2023",
      excerpt: "A look back at last year's most thrilling motorsport moments.",
      date: "2024-03-05",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-muted mb-4">{post.date}</p>
            <p className="mb-4">{post.excerpt}</p>
            <button className="text-primary hover:text-primary/90 font-medium">
              Read More →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;