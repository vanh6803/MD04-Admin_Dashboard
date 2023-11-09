import {all} from 'redux-saga/effects'
import watchFetchLogin from './AuthSaga'

function* rootSaga(){
    yield all([watchFetchLogin()])
}
export default rootSaga;