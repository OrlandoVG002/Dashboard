import { useParams } from "react-router-dom";
import { useHookApi } from '../../hooks/useHookApi.js';
import { loadingScreen as LoadingScreen, errorScreen as ErrorScreen } from '../../utils/utils.jsx';


function TopDevs(){
    const Service = "getDevelopersTop";
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
    return(
        <h1>hola</h1>
    )
}

export default TopDevs