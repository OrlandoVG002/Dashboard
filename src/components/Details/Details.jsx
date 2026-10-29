import { useParams } from "react-router-dom";
import { useHookGameDetails } from '../../hooks/useHookApi.js';
import { loadingScreen as LoadingScreen, errorScreen as ErrorScreen } from '../../utils/utils.jsx';

function Details() {
    const {id} = useParams();
    const { game, loading, error } = useHookGameDetails(id);

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
        <section className="container-fluid">
            <img
                className="d-block carousel_item_overlay image-game"
                src={game.background_image}
                alt={game.name}
                />
        </section>
    );
}

export default Details