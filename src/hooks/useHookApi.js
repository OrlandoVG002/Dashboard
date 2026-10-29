import { useEffect, useState } from "react";
import { rawgService } from "../services/RawgApi.js";

export function useApi(apiRequest, dependencies = []) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            setLoading(true);
            setError("");

            try {
                const result = await apiRequest();

                if (!cancelled) {
                    setData(result);
                }
            } catch (requestError) {
                if (!cancelled) {
                    setError(requestError);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadData();
        return () => {
            cancelled = true;
        };
    }, dependencies);

    return { data, loading, error };
}

async function fetchApiService(Service, filtersURL = "", givenDate = "") {
    const hasfiltersURL = filtersURL !== "" && filtersURL !== null && filtersURL !== undefined;
    const hasGivenDate = givenDate !== "" && givenDate !== null && givenDate !== undefined;
    const games = hasfiltersURL || hasGivenDate
        ? await rawgService[Service](givenDate, filtersURL)
        : await rawgService[Service]();

    if (games.length === 0) {
        return rawgService.getBackupGames();
    }

    return games;
}

export function useHookApi(Service, filtersURL = "", givenDate = "") {
    const { data: games, loading, error } = useApi(
        () => fetchApiService(Service, filtersURL, givenDate),
        [Service, filtersURL, givenDate]
    );

    return { games, loading, error };
}

export function useHookGameDetails(id) {
    const { data: game, loading, error } = useApi(
        () => rawgService.getGameDetails(id),
        [id]
    );

    return { game, loading, error };
}

export function useHookGetGameGenres() {
    const { data: genres, loading, error } = useApi(
        () => rawgService.getGameGenres(),
        []
    );

    return { genres, loading, error };
}

export function useHookGetGamePlatforms() {
    const { data: platforms, loading, error } = useApi(
        () => rawgService.getGamePlatforms(),
        []
    );

    return { platforms, loading, error };
}