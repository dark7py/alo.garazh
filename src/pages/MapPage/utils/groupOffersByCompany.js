export const groupOffersByCompany = (offers) => offers.reduce((acc, offer) => {
  const { companyId } = offer;

  if (!acc[companyId]) {
    return ({
      ...acc,
      [companyId]: {
        company: {
          id: companyId,
          companyName: offer.companyName,
          companyRating: offer.companyRating,
          address: offer.addressWithOutCountry,
          certifiedPark: offer.certifiedPark
        },
        offers: [offer]
      }
    });
  }

  acc[companyId].offers.push(offer);
  return acc;
}, {});
