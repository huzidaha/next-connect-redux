import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'

let store = null

const wrapWithProvider = (createStore, PageComponent) => class extends Component {
  static propTypes = {
    initialState: PropTypes.object
  }

  static async getInitialProps (ctx) {
    const { req } = ctx
    const isServer = !!req
    if (isServer && typeof window === 'undefined') {
      store = createStore({})
    }
    ctx.store = store
    ctx.isServer = isServer
    const props = PageComponent.getInitialProps
      ? await PageComponent.getInitialProps(ctx)
      : {}
    props.initialState = store.getState()
    return props
  }

  constructor (props) {
    super(props)
    if (!store) {
      store = createStore(props.initialState)
    }
  }

  render () {
    return (
      <Provider store={store}>
        <PageComponent {...this.props} />
      </Provider>
    )
  }
}

export default (createStore) => (
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options
) => (PageComponent) => {
  PageComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )(PageComponent)
  return wrapWithProvider(createStore, PageComponent)
}
