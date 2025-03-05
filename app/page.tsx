import { Recipe } from '../src/types/recipe';
import recipeData from '../src/data/recipes.json';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const recipes: Recipe[] = recipeData.recipes;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">My Recipe Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="capitalize">Source: {recipe.source.type}</span>
              </div>
              <Link
                href={`/recipe/${recipe.id}`}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
