export const fetchMovies = async (signal) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8', { signal });

    if (!response.ok) {
        throw new Error('Не вдалося завантажити дані з сервера');
    }

    const data = await response.json();

    // Масиви для наповнення початкових карток фільмів
    const movieTitles = [
        "Inception", "The Dark Knight", "Interstellar", "Avatar", 
        "The Matrix", "Pulp Fiction", "Forrest Gump", "Fight Club"
    ];
    const genres = ["Sci-Fi", "Action", "Sci-Fi", "Adventure", "Sci-Fi", "Crime", "Drama", "Drama"];

    return data.map((post, index) => ({
        id: post.id,
        title: movieTitles[index] || `Фільм №${post.id}`,
        description: post.body,
        rating: parseFloat((7 + Math.random() * 3).toFixed(1)), // Випадковий рейтинг від 7.0 до 10.0
        genre: genres[index] || "Drama",
        image: `https://picsum.photos/seed/${post.id}/300/450` // Генерація постера
    }));
};