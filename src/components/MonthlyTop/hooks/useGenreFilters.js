import { useState } from "react";

export function useFilters(){
    const [filters, setFilters] = useState("");

    const handleGenreSelect = (genreId) => {
        setFilters(`genres=${genreId}`);
    };
    const selectedGenreId = filters.startsWith("genres=")
        ? filters.slice("genres=".length): "";

    return {filters,selectedGenreId, handleGenreSelect}
}