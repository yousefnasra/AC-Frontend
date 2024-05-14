import React, { useState } from 'react';

const PriceFilter = ({ maxPrice, setMaxPrice, setCurrentPage }) => {
    const [rangeValue, setRangeValue] = useState(0);

    return (
        <div className="mb-3 px-2 py-1">
            <label htmlFor="maxPrice" className="form-label fw-bold">
                Max Price: {Intl.NumberFormat().format(rangeValue)}
            </label>
            <input
                type="range"
                className="form-range"
                id="maxPrice"
                min={0}
                max={150000}
                value={maxPrice}
                onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setRangeValue(e.target.value);
                    setCurrentPage(1);
                }}
            />
        </div>
    );
};

export default PriceFilter;

