# next-connect-redux
Connect Next.js to Redux.

## How to use

### Install
```
  npm install next-connect-redux --save
```

### Usage

Create `initStore` function which only accepts `initialState`.

```javascript
import { createStore } from 'redux'
import { reducer } from './reducer'

export const initStore = (initialState) => {
  return createStore(reducer, initialState)
}
```

And pass `initStore` function to `next-connect-redux` and it will return a wrapper function called `nextConnect`.

```javascript
import nextConnectRedux from 'next-connect-redux'
import { createStore } from 'redux'
import { reducer } from './reducer'

export const initStore = (initialState) => {
  return createStore(reducer, initialState)
}

export const nextConnect = nextConnectRedux(initStore)
```

Use `nextConnect` function to wrap every page component inside `/pages`, take `index.js` for example:

```javascript
import React from 'react'
import { nextConnect } from '../store'

class Page extends React.Component {
  render () {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}

export default nextConnect((state) => state)(Counter)
```

Just use `nextConnect` like you're using `connect`. It connects the page component to redux. In addition, it wraps page component with `react-redux`'s `<Provider />`, this will pass down the `store` to child components of the component tree. For safety considerations, you should wrap every page component with `nextConnect`. For normal components, you just need the `connect` provided by `react-redux` instead of `nextConnect`.

### Initial store
You can use `store.dispatch` inside `getInitialProps` to dispatch some actions for initialization purpose.

```javascript
import React from 'react'
import { nextConnect } from '../store'

class Page extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch({ type: 'SET_PAGE_TITLE', title: 'Index Page' })
    return {}
  }

  render () {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}

export default nextConnect((state) => state)(Counter)
```
### Asynchronously dispatch an action
Don't worry that you want to dispatch an async action in `getInitialProps`, it's surprisingly easy:

```javascript
import React from 'react'
import { nextConnect } from '../store'

class Page extends React.Component {
  static async getInitialProps ({ store }) {
    await store.dispatch(someAsyncAction())
    return {}
  }

  render () {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}

export default nextConnect((state) => state)(Counter)
```

## Example

See full example [here](https://github.com/zeit/next.js/tree/master/examples/with-redux).

More examples: TODO.

## License
MIT License

Copyright (c) 2017 huzidaha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
