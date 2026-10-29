import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useHookGetGameGenres } from "../../../hooks/useHookApi.js";


function GenrerFilter({selectedGenreId, onGenreSelect }) {
    const { genres } = useHookGetGameGenres();
    const selectedGenre = genres.find(
        (genre) => String(genre.id) === String(selectedGenreId)
    );

    return (
        <div className="bg-secondary bg-opacity-25 rounded Filters">
            <DropdownButton 
                id="MonthlyFilterGenre" 
                title={selectedGenre?.name ?? "Genero"} 
                onSelect={onGenreSelect} 
                variant="primary" 
                className="GenreFilterMenu fs-2"
                >
                {genres.map((genre) => (
                    <Dropdown.Item 
                        key={genre.id} 
                        eventKey={genre.id}>{genre.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    )
}

export default GenrerFilter