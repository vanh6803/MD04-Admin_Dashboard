import {all} from 'redux-saga/effects'
import watchFetchLogin from './LoginSaga'

function* rootSaga(){
    yield all([watchFetchLogin()])
}
export default rootSaga;