import { Recipe } from '../../../src/types/recipe';
import recipeData from '../../../src/data/recipes.json';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export type ParamsType = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: ParamsType }): Promise<Metadata> {
  const { id } = await params;
  const recipe = (recipeData.recipes as Recipe[]).find((r) => r.id === id);
  return {
    title: recipe ? recipe.name : 'Recipe Not Found',
    description: recipe?.description,
  };
}

export default async function Page({ params }: { params: ParamsType }) {
  const { id } = await params;
  const recipe = (recipeData.recipes as Recipe[]).find((r) => r.id === id);

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
        <div className="aspect-video w-full mb-8">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${recipe.source.embedId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      );
    }
    if (recipe.source.type === 'instagram' && recipe.source.embedId) {
      return (
        <div className="flex justify-center mb-8">
          <div className="w-[320px] h-[570px]">
            <iframe
              src={`https://www.instagram.com/reel/${recipe.source.embedId}/embed`}
              width="320"
              height="570"
              frameBorder="0"
              scrolling="no"
              allowTransparency
              className="rounded-lg"
            />
          </div>
        </div>
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
