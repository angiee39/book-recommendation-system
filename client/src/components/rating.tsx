import React, { useState, useEffect } from 'react';

interface StarRatingProps {
    initialRating: number;
    isEditable: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating, isEditable }) => {
    const [rating, setRating] = useState(initialRating); // Current rating value
    const [hover, setHover] = useState(0); // Current hovered star

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleClick = (value: number) => {
        if (isEditable) {
            setRating(value);
        }
    };

    const handleMouseEnter = (value: number) => {
        if (isEditable) {
            setHover(value);
        }
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={hover >= star || rating >= star ? '#FFD700' : '#D1D5DB'}
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    style={{ pointerEvents: isEditable ? 'auto' : 'none' }} // Disable clicks if not editable
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;