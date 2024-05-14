import React from 'react';

const BrandFilter = ({ brands, selectedBrands, setSelectedBrands, setCurrentPage }) => {
    return (
        <div className="mb-3 p-3 border-top">
            <label className='fw-bold form-label'>Brands :</label>
            {brands.map((brand) => (
                <div key={brand} className="form-check mb-1">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        value={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                            setCurrentPage(1);
                            const brandName = e.target.value;
                            setSelectedBrands((prevSelected) => {
                                if (prevSelected.includes(brandName)) {
                                    return prevSelected.filter((b) => b !== brandName);
                                } else {
                                    return [...prevSelected, brandName];
                                }
                            });
                        }}
                    />
                    <label className="form-check-label">{brand}</label>
                </div>
            ))}
        </div>
    );
};

export default BrandFilter;


