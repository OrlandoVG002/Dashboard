import { useHookApi} from '../../hooks/useHookApi.js';
import { loadingScreen as LoadingScreen, errorScreen as ErrorScreen } from '../../utils/utils.jsx';
import './MonthlyTop.css';

import { useFilters } from "./hooks/useGenreFilters.js";
import GenrerFilter from "./components/GenrerFilter.jsx";

import DateFilter from "./components/DateFilter.jsx";
import { useMonthlyTopPeriod } from "./hooks/useDateFilter.js";
import AdditionalFilters from "./components/AdditionalFilters.jsx";

function MonthlyTop(){
    const Service = "getMonthlyTopDetails";
    const { filters, selectedGenreId, handleGenreSelect } = useFilters();
    const period = useMonthlyTopPeriod();
    const { games, loading, error } = useHookApi(Service, filters, period.givenDate);

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    if (error) {
        return (
            <ErrorScreen error={error instanceof Error ? error.message : String(error)} />
        );
    }
    return(
        <div className="container-fluid monthly-top-container">
            <div className="card p-3 shadow-sm">
                {/* 1. SECCIÓN SUPERIOR (Header) */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                    {/* Filtro por generos */}
                    <GenrerFilter
                        selectedGenreId={selectedGenreId}
                        onGenreSelect={handleGenreSelect}
                    />
                    <DateFilter
                        selectedMonth={period.selectedMonth}
                        selectedYear={period.selectedYear}
                        months={period.months}
                        years={period.years}
                        onPeriodChange={period.setSelectedPeriod}
                    />
                </div>

                {/* 2. SECCIÓN DE CUBOS CENTRALES */}
                <div className="container-fluid TopChart" aria-hidden="true">
                    <div>
                        <div className="bg-secondary bg-opacity-25 rounded Top2Podium"></div>
                        <div className="bg-secondary bg-opacity-25 rounded Top2Image"></div>
                    </div>
                    <div>
                        <div className="bg-secondary bg-opacity-25 rounded Top1Podium"></div>
                        <div className="bg-secondary bg-opacity-25 rounded Top1Image"></div>
                    </div>
                    <div>
                        <div className="bg-secondary bg-opacity-25 rounded Top3Podium"></div>
                        <div className="bg-secondary bg-opacity-25 rounded Top3Image"></div>
                    </div>
                </div>

                {/* 3. SECCIÓN DE FILTROS ADICIONALES */}
                <AdditionalFilters />

                {/* 4. SECCIÓN DE LISTA (Feed) */}
                <div>
                    {games.map((game) => (
                        <FeedItem key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    )
}
// Componente para las tarjetas del Feed inferior
const FeedItem = ({ game }) => {
    return (
        <div className="bg-light p-3 rounded mb-3 border d-flex justify-content-between">
            <div>
                <div className="GameCover">
                    {game.background_image ? (
                        <img
                            className="GameCoverImage"
                            src={game.background_image}
                            alt={`Portada de ${game.name}`}
                            loading="lazy"
                        />
                    ) : (
                        <div
                            className="GameCoverPlaceholder h-100 w-100"
                            role="img"
                            aria-label={`Sin portada disponible para ${game.name}`}
                        />
                    )}
                </div>
            </div>
            <div className="w-100 ms-3">
                <div className="d-flex justify-content-between align-items-start gap-3">
                    <div className="d-flex flex-column gap-2">
                        <h3 className="rounded GameName mb-0">{game.name}</h3>
                        <p className="mb-0">
                            {game.genres?.length
                                ? game.genres.map((genre) => genre.name).join(", ")
                                : "Género no disponible"}
                        </p>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <p className="rounded GameRating mb-0">
                            {game.rating != null
                                    ? `RAWG: ${game.rating}/5`
                                    : "Calificación no disponible"}
                        </p>
                        <p className="rounded GamePlatforms mb-0">
                            {/* {game || "Plataformas no disponibles"} */}
                        </p>
                    </div>
                </div>
                <p className="rounded GameSinopsis mt-3 mb-0">
                    {/* {game.description_raw || "Sin descripción disponible."} */}
                </p>
            </div>
        </div>
    );
};

export default MonthlyTop
