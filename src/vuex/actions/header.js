import * as types from '../mutation-types'
import api from '../../api/index'

export const setHeaderTitle = ({dispatch}, title) => {
	dispatch(types.RECEIVE_HEADERTITLE, title);
}