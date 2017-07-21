import {fromJS} from 'immutable'
import addAddressReducer from '../reducer'

describe('addAddressReducer', () => {
  it('returns the initial state', () => {
    expect(addAddressReducer(undefined, {})).toEqual(fromJS({}))
  })
})
