import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AuthorPage = () => {
  const { id } = useParams<{ id: string }>(); // Hämtar author-id från URL
  const [authorData, setAuthorData] = useState<any>(null); // Här lagrar vi författarens data
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulerat API-anrop för att hämta författarens data baserat på id
    const fetchAuthorData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openlibrary.org/authors/${id}.json`,
        );
        const data = await response.json();
        setAuthorData(data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  if (loading) {
    return <div>Loading author information...</div>;
  }

  if (!authorData) {
    return <div>No author data found.</div>;
  }

  return (
    <div className="author-page p-6">
      <h1 className="text-4xl font-bold mb-4">{authorData.name}</h1>
      <p className="text-lg mb-4">Born: {authorData.birth_date || "N/A"}</p>
      <p className="mb-4">Nationality: {authorData.country || "Unknown"}</p>
      <div>
        <h2 className="text-2xl mb-4">Notable Works</h2>
        <ul>
          {authorData.works ? (
            authorData.works.map((work: any, index: number) => (
              <li key={index} className="mb-2">
                <a
                  href={`https://openlibrary.org/works/${work.key}`}
                  className="text-blue-500 hover:underline"
                >
                  {work.title}
                </a>
              </li>
            ))
          ) : (
            <p>No notable works found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AuthorPage;
