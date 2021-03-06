import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useOfferListData from '../../hooks/useOfferListData';

import './OfferList.scss'
import OfferListItem from './OfferListItem';
/**
 * Displays OfferListItem components for offer details
 * @param {*} props
 * @returns
 */

const OfferList = (props) => {
    const history = useHistory();

    const { assignOffer } = useOfferListData();

    // assignOffer && console.log('typeof assignOffer :>> RequestListItem ', typeof assignOffer);

    const [state, setstate] = useState(history && history.location.state);

    // state.OffersRequests && console.log("offerList assign offer", typeof state.OffersRequests.assignOffer)
    return (
        <div className="offerlist-main">
            <h1>Offers Received</h1>
            {(!state.requestOffer || state.requestOffer.length === 0) && <h3>Loading...</h3>}
            {state.requestOffer && state.requestOffer.map(offer => <OfferListItem key={offer.id} {...offer} assignOffer={assignOffer} />)}
        </div>
    )
}

export default OfferList
