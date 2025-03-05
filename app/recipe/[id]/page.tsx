import { Recipe } from '../../../src/types/recipe';
import recipeData from '../../../src/data/recipes.json';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export default function RecipePage({ params }: Props) {
  const recipe: Recipe | undefined = recipeData.recipes.find(
    (r) => r.id === params.id
  );

  if (!recipe) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to recipes
        </Link>
      </div>
    );
  }

  const EmbeddedContent = () => {
    if (recipe.source.type === 'youtube' && recipe.source.embedId) {
      return (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${recipe.source.embedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mb-8 rounded-lg"
        />
      );
    }
    if (recipe.source.type === 'instagram' && recipe.source.embedId) {
      return (
        <iframe
          src={`https://www.instagram.com/p/${recipe.source.embedId}/embed`}
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          allowTransparency
          className="mb-8 rounded-lg"
        />
      );
    }
    return null;
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to recipes
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
          <p className="text-gray-600 mb-6">{recipe.description}</p>
          
          <EmbeddedContent />
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc pl-6 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Preparation</h2>
            <ol className="list-decimal pl-6 space-y-4">
              {recipe.preparation.map((step, index) => (
                <li key={index} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-500">
              Source: <a href={recipe.source.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {recipe.source.type === 'website' ? 'Original Recipe' : recipe.source.type}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
