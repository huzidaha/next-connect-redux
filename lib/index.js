import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'

const wrapWithProvider = (createStore, PageComponent, cache) => class extends Component {
  static propTypes = {
    initialState: PropTypes.object
  }

  static async getInitialProps (ctx) {
    const {req} = ctx
    const isServer = !!req
    if (isServer && typeof window === 'undefined') {
      cache.store = createStore()
    }
    ctx.store = cache.store
    ctx.isServer = isServer
    const props = PageComponent.getInitialProps
      ? await PageComponent.getInitialProps(ctx)
      : {}
    props.initialState = cache.store.getState()
    return props
  }

  constructor (props) {
    super(props)
    if (!cache.store) {
      cache.store = createStore(props.initialState)
    }
  }

  render () {
    return (
      <Provider store={cache.store}>
        <PageComponent {...this.props} />
      </Provider>
    )
  }
}

export default (createStore) => {
  let cache = {}
  return (...args) => (PageComponent) => {
    PageComponent = connect(...args)(PageComponent)
    return wrapWithProvider(createStore, PageComponent, cache)
  }
}
