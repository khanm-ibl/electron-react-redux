import { persistStore } from 'redux-persist'
import { PERSIST_PREFIX } from '../../constants/redux-persist'

export default (store, rehydrationComplete = () => { }) => persistStore(store, {
  key: PERSIST_PREFIX
}, rehydrationComplete)
