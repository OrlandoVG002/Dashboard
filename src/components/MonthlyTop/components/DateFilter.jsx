function DateFilter({selectedMonth, selectedYear, months, years, onPeriodChange}) {
    return (
        <div className="bg-success bg-opacity-75 rounded d-flex flex-column justify-content-center gap-2 p-2 Date">
            <select
                aria-label="Seleccionar mes"
                className="text-capitalize bg-opacity-25 fs-3 bg-transparent border-0 text-sm-center DateStyle"
                value={selectedMonth}
                onChange={(event) => onPeriodChange(
                    `${selectedYear}-${String(Number(event.target.value)).padStart(2, "0")}`
                )}
            >
                {months.map((month) => (
                    <option key={month.value} value={month.value}>
                        {month.name}
                    </option>
                ))}
            </select>
            <select
                aria-label="Seleccionar año"
                className="text-capitalize bg-opacity-25 fs-5 bg-transparent border-0 text-sm-center DateStyle"
                value={selectedYear}
                onChange={(event) => onPeriodChange(
                    `${event.target.value}-${String(selectedMonth).padStart(2, "0")}`
                )}
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DateFilter;