import { Carousel } from 'react-bootstrap';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHookApi } from '../../hooks/useHookApi.js';
import './Homeboard.css';
import { loadingScreen as LoadingScreen, errorScreen as ErrorScreen } from '../../utils/utils.jsx';


function Homeboard() {
    const Service = "getHomeGames";
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
        <Carousel className='bg-secondary homeboard_carousel'>
            {games.map((game) => (
                <Carousel.Item key={game.id}>
                    <NavLink to={`/details/${game.id}`} className="carousel_item_link " aria-label="Ver detalles del juego">
                        <div className='carousel_item_overlay'>
                            <img
                                className="d-block carousel_item_overlay homeboard-image"
                                src={game.background_image} 
                                alt={game.name}
                            />
                        </div>
                        
                        <Carousel.Caption className='text-start h-25 d-flex justify-content-around pe-none'>
                            <div>
                                <h2 className='mx-1 my-2 fw-bold'>
                                    {game.name}
                                </h2>
                                <h5 className='mx-3'>
                                    Average playtime:
                                    <span className='mx-1 info span-game'>
                                        {game.playtime}
                                    </span>
                                    hours
                                </h5>
                                <div className='mx-3 d-none d-md-block slide-description'>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: game.description || 'Descripcion no disponible'
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className='my-2'>
                                    Rating: {game.rating} ⭐
                                </h3>
                            </div>
                        </Carousel.Caption>
                    </NavLink>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Homeboard;
