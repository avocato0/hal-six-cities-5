import React from 'react';
import { convertNumberToPercent, getDate } from 'utils/utils';
import PropTypes from 'prop-types';
import { propsComment } from '../../props/props';

const ReviewsItem = (props) => {
  const { comment, date, rating, user } = props.comment;
  const { fullDate, month, year } = getDate(date);
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{ width: convertNumberToPercent(rating) + `%` }}
            ></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={fullDate}>
          {month + ' ' + year}
        </time>
      </div>
    </li>
  );
};

ReviewsItem.propTypes = {
  comment: PropTypes.shape(propsComment),
};

export default ReviewsItem;
