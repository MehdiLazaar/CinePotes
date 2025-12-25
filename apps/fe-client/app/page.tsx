"use client"
import { useEffect, useState } from "react";
import { Header, Footer , BarreRecherche} from "../components/utils";

interface DetailsFilm {
  id: number;
  titre: string;
  resume: string;
  date_sortie: string;
  affiche_url: string | null;
  note_moyenne: number;
}
export function usefilms() {
  const [films, setFilms] = useState<DetailsFilm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        console.log('Appel API films populaires...');
        
        const response = await fetch('http://localhost:3333/tmdb/films/populaires');
        
        console.log('📡 Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Films reçus:', data.length);
        
        setFilms(data);
        setError(null);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return { films, loading, error };
}
export function RechercheFilms(requete: string) {
  const [resultats, setResultats] = useState<DetailsFilm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (requete.length < 3) {
      setResultats([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`🔍 Recherche: "${requete}"`);
        
        const response = await fetch(
          `http://localhost:3333/tmdb/recherche?query=${encodeURIComponent(requete)}`
        );

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}`);
        }

        const data = await response.json();
        console.log(`${data.length} résultat(s) trouvé(s)`);
        
        setResultats(data);
      } catch (err) {
        console.error('Erreur recherche:', err);
        setError(err instanceof Error ? err.message : 'Erreur de recherche');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [requete]);

  return { resultats, loading, error };
}
function paragraphes() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Bienvenue sur CinéPote
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        Ciné'Pote est une plateforme pour lister ses films vus et organiser des soirées cinéma entre amis. 
        Chaque participant propose une sélection de films, les listes sont fusionnées, 
        puis chacun classe la liste finale pour dégager un top commun et choisir le film de la soirée.
      </p>
    </div>
  );
}

function CarteFilms({ id, titre, resume, date_sortie, affiche_url, note_moyenne }: DetailsFilm) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex gap-4">
        {affiche_url ? (
          <img src={affiche_url} alt={titre} className="w-24 h-36 object-cover rounded flex-shrink-0" />
        ) : (
          <div className="w-24 h-36 bg-gray-200 rounded flex items-center justify-center text-gray-500 flex-shrink-0">
            No Image
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{titre}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{resume}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">{date_sortie ? new Date(date_sortie).toLocaleDateString() : "N/A"}</span>
            <span className="text-sm font-medium text-yellow-500">{typeof note_moyenne === "number" ? note_moyenne.toFixed(1) : "N/A"}/10</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const { films, loading, error } = usefilms();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-16 py-32 space-y-8">
        {BarreRecherche()}
        {paragraphes()}
        <div className="w-full max-w-7xl mt-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Films populaires
          </h2>
          
          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {error && (
            <div className="text-red-600 text-center">{error}</div>
          )}
          
          {!loading && !error && (
            <div className="space-y-6">
              {films.map(film => (
                <CarteFilms key={film.id} {...film} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
export default Home;