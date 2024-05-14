import React from 'react';

const PowerFilter = ({ powers, selectedPower, setSelectedPower, setCurrentPage }) => {
    return (
        <div className="mb-3 p-3 border-top">
            <label className='fw-bold form-label'>Horse Power:</label>
            {powers.map((power) => (
                <div key={power} className="form-check mb-1">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        value={power}
                        checked={selectedPower.includes(power)}
                        onChange={(e) => {
                            setCurrentPage(1);
                            const horsePower = e.target.value;
                            setSelectedPower((prevSelected) => {
                                if (prevSelected.includes(horsePower)) {
                                    return prevSelected.filter((b) => b !== horsePower);
                                } else {
                                    return [...prevSelected, horsePower];
                                }
                            });
                        }}
                    />
                    <label className="form-check-label">{power}</label>
                </div>
            ))}
        </div>
    );
};

export default PowerFilter;
