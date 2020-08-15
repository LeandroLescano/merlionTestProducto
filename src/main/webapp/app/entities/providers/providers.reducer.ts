import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProviders, defaultValue } from 'app/shared/model/providers.model';

export const ACTION_TYPES = {
  FETCH_PROVIDERS_LIST: 'providers/FETCH_PROVIDERS_LIST',
  FETCH_PROVIDERS: 'providers/FETCH_PROVIDERS',
  CREATE_PROVIDERS: 'providers/CREATE_PROVIDERS',
  UPDATE_PROVIDERS: 'providers/UPDATE_PROVIDERS',
  DELETE_PROVIDERS: 'providers/DELETE_PROVIDERS',
  RESET: 'providers/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProviders>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProvidersState = Readonly<typeof initialState>;

// Reducer

export default (state: ProvidersState = initialState, action): ProvidersState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROVIDERS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROVIDERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROVIDERS):
    case REQUEST(ACTION_TYPES.UPDATE_PROVIDERS):
    case REQUEST(ACTION_TYPES.DELETE_PROVIDERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROVIDERS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROVIDERS):
    case FAILURE(ACTION_TYPES.CREATE_PROVIDERS):
    case FAILURE(ACTION_TYPES.UPDATE_PROVIDERS):
    case FAILURE(ACTION_TYPES.DELETE_PROVIDERS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROVIDERS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROVIDERS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROVIDERS):
    case SUCCESS(ACTION_TYPES.UPDATE_PROVIDERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROVIDERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/providers';

// Actions

export const getEntities: ICrudGetAllAction<IProviders> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROVIDERS_LIST,
  payload: axios.get<IProviders>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProviders> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROVIDERS,
    payload: axios.get<IProviders>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProviders> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROVIDERS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProviders> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROVIDERS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProviders> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROVIDERS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
