import React from "react";

function CostRating({ price }) {
  const renderPrice = () => {
    const maxPrice = 4;
    
    if (!price || price.length === 0) {
      return <div>Loading...</div>; // or any other loading indicator
    }
    const numPrice = Math.min(price.length, maxPrice);

    const priceRating = "$".repeat(numPrice);

    const missingSigns = maxPrice - numPrice;
    const missingPrice = (
      <span className="lighter-color">{ "$".repeat(missingSigns) }</span>
    );

    return (
      <>
        {priceRating}
        {missingPrice}
      </>
    );
  };

  return (
    <div>
      <span>{renderPrice()}</span>
    </div>
  );
}

export default CostRating;
