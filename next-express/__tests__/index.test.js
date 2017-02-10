/* global it, expect, describe */

import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import App from '../pages'

describe('With Enzyme', () => {
  it('App shows "HOME PAGE is here!"', () => {
    const app = shallow(
      <App />
    )

    expect(app.find('p').text()).toEqual('HOME PAGE is here!')
  })
})

describe('With Snapshot Testing', () => {
  it('App shows "Hello world!"', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
