import {createSelector} from 'reselect'

const selectHomePage = () => state => state.get('homePage')

const makeSelectAddresses = () =>
  createSelector(selectHomePage(), substate => substate.get('addresses').toJS())

export {makeSelectAddresses}
