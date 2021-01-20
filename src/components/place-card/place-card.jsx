import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propsOffers } from '../../props/props';
import { Link } from 'react-router-dom';

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const {
      title,
      type,
      isPremium,
      price,
      rating,
      tariff,
      images,
      id,
    } = this.props.offer;
    const { onActiveCard, onActiveCardLeave } = this.props;

    return (
      <article
        className="cities__place-card place-card"
        onMouseOver={onActiveCard}
        onMouseLeave={onActiveCardLeave}
      >
        <div
          className="place-card__mark"
          style={isPremium ? { display: `block` } : { display: `none` }}
        >
          <span>Premium</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link to={'/offer/' + id}>
            <img
              className="place-card__image"
              src={images}
              width="260"
              height="200"
              alt="Place image"
            />
          </Link>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">
                &#47;&nbsp;{tariff}
              </span>
            </div>
            <button
              className="place-card__bookmark-button button"
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: rating + `%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={'/offer/' + id}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  onActiveCard: PropTypes.func.isRequired,
  onActiveCardLeave: PropTypes.func.isRequired,
  offer: PropTypes.shape(propsOffers),
};

export default PlaceCard;