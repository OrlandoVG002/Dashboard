import { useParams } from "react-router-dom";
import { useHookGameDetails } from '../../hooks/useHookApi.js';
import { loadingScreen as LoadingScreen, errorScreen as ErrorScreen } from '../../utils/utils.jsx';

function Calendar(){
    const Service = "getMonthlyGames";
    const { games, loading, error } = useHookApi(Service);
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
    return (
        <h1>Calendario.png</h1>
    )
}

export default Calendar