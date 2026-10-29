import { useState } from "react";
import { useHookGetGamePlatforms } from "../../../hooks/useHookApi.js"
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function AdditionalFilters() {
    const { platforms } = useHookGetGamePlatforms();
    const [ratingSort, setRatingSort] = useState("Calificación");
    const [selectedPlatform, setSelectedPlatform] = useState("Plataforma");
    const [dateSort, setDateSort] = useState("Fecha");

    return (
        <div className="row g-2 mb-4">
            <div className="col-4">
                <DropdownButton
                    id="monthly-filter-rating"
                    title={ratingSort}
                    onSelect={setRatingSort}
                    variant="primary"
                    className="AditionalFilters"
                >
                    <Dropdown.Item eventKey="De mayor a menor">De mayor a menor</Dropdown.Item>
                    <Dropdown.Item eventKey="De menor a mayor">De menor a mayor</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="col-4">
                <DropdownButton
                    id="monthly-filter-platform"
                    title={selectedPlatform}
                    onSelect={setSelectedPlatform}
                    variant="primary"
                    className="AditionalFilters"
                >
                    {platforms.map((platform) => (
                        <Dropdown.Item key={platform.id} eventKey={platform.name} className="fs-5">
                            {platform.name}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>
            <div className="col-4">
                <DropdownButton
                    id="monthly-filter-date"
                    title={dateSort}
                    onSelect={setDateSort}
                    variant="primary"
                    className="AditionalFilters"
                >
                    <Dropdown.Item eventKey="De más reciente a menos reciente">
                        De más reciente a menos reciente
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="De menos reciente a más reciente">
                        De menos reciente a más reciente
                    </Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    );
}

export default AdditionalFilters;