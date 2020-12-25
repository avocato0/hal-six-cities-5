import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PlaceCardFavorites from '../place-card-favorites/place-card-favorites';
import { getCountRandom } from '../../mocks/offers';
import { propsOffers } from '../../props/props';

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { offers, city } = this.props;
    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="main.html">
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width="81"
                    height="41"
                  />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {city.map((el, id) => {
                  return (
                    <li className="favorites__locations-items" key={id}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{el}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {offers
                          .slice(getCountRandom(1, 3), getCountRandom(3, 5))
                          .map((offer, ind) => (
                            <PlaceCardFavorites
                              offer={offer}
                              key={offer + ind}
                            />
                          ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </a>
        </footer>
      </div>
    );
  }
}

Favorites.propTypes = {
  city: PropTypes.array.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(propsOffers)),
};

export default Favorites;
