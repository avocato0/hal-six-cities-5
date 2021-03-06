import { ActionCreator } from 'store/action';
import { AppRoute, AuthorizationStatus } from 'const/const';
import {
  formattingDataServerToClinet,
  serverAdapter,
  transformBoolToNumber,
} from 'utils/utils';

export const fetchPlacesList = () => (dispatch, _getState, api) =>
  api.get(AppRoute.HOTELS).then(({ data }) => {
    const formatData = formattingDataServerToClinet(data);
    dispatch(ActionCreator.loadingHotels(formatData));
    return formatData;
  });

export const fetchNearbyList = (id) => (dispatch, _getState, api) =>
  api.get(AppRoute.HOTELS + id + `/nearby`).then(({ data }) => {
    const formatData = formattingDataServerToClinet(data);
    return dispatch(ActionCreator.loadingHotelsNearby(formatData));
  });

export const checkAuth = () => (dispatch, _getState, api) =>
  api
    .get(AppRoute.LOGIN)
    .then(({ data }) => {
      dispatch(ActionCreator.requereAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.loadUserData(serverAdapter(data)));
    })
    .catch((err) => {
      // throw err;
      console.log(err);
    });

export const login =
  ({ login: email, password: password }) =>
  (dispatch, _getState, api) =>
    api
      .post(AppRoute.LOGIN, { email, password })
      .then(
        ({ data }) => dispatch(ActionCreator.loadUserData(serverAdapter(data))),
        dispatch(ActionCreator.requereAuthorization(AuthorizationStatus.AUTH))
      )
      .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)));

export const commentPost =
  ({ description: comment, rating: rating, id: commentId }) =>
  (dispatch, _getState, api) =>
    api
      .post(AppRoute.COMMENTS + commentId, { comment, rating })
      .then(({ data }) =>
        dispatch(ActionCreator.loadComments(data.map(serverAdapter)))
      );

export const commentGet = (id) => (dispatch, _getState, api) =>
  api
    .get(AppRoute.COMMENTS + id)
    .then(({ data }) =>
      dispatch(ActionCreator.loadComments(data.map(serverAdapter)))
    );

export const favoritesGet = () => (dispatch, _getState, api) =>
  api
    .get(AppRoute.FAVORITES)
    .then(({ data }) => dispatch(ActionCreator.loadFavoritesOffers(data)));

export const favoritePost = (offerID, status) => (dispatch, _getState, api) =>
  api
    .post(
      AppRoute.FAVORITES + '/' + offerID + '/' + transformBoolToNumber(status)
    )
    .then(({ data }) =>
      dispatch(ActionCreator.changeOfferFavorite(serverAdapter(data)))
    );
