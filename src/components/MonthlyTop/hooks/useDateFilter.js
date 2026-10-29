import { useState } from "react";

export function useMonthlyTopPeriod() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const [selectedPeriod, setSelectedPeriod] = useState(
        `${currentYear}-${String(currentMonth).padStart(2, "0")}`
    );
    const [selectedYear, selectedMonth] = selectedPeriod.split("-").map(Number);
    const isCurrentMonth = selectedYear === currentYear && selectedMonth === currentMonth;
    const lastDayOfMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const givenDate = `${selectedPeriod}-${String(
        isCurrentMonth ? today.getDate() : lastDayOfMonth
    ).padStart(2, "0")}`;
    const months = Array.from({ length: 12 }, (_, index) => ({
        value: index + 1,
        name: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(
            new Date(2000, index, 1)
        )
    }));
    const years = Array.from(
        { length: currentYear - 1990 + 6 },
        (_, index) => currentYear - index
    );

    return {
        selectedPeriod,
        selectedMonth,
        selectedYear,
        months,
        years,
        setSelectedPeriod,
        givenDate
    };
}
