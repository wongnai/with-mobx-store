# with-mobx-store

[![npm package][npm-badge]][npm]

**with-mobx-store** is higher order components library for performing automated MobX Provider wrapping.

## Installation

```
npm i with-mobx-store
```

```
yarn add with-mobx-store
```


## Concept

When you want to work with MobX store, you have to create `at least two components` to work with it as the following example below.

```js
import React from 'react'
import { Provider } from 'mobx'
import DataHandler from './DataList'
import DataStore from './store'
const dataStore = new DataStore()
const DataListContainer = () => (
    <Provider dataStore={dataStore}>
        <DataHandler />
    </Provider>
)
export default DataListContainer
```

I want to inject `DataStore` to `DataHandler`. I have to create a component for wrapping `DataHandler` with `Provider`. After that I have to create another component `DataHandler` to inject `dataStore` to it like the following code.

```js
import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import DataItem from './DataItem'
import { compose } from 'recompose'
const DataHandler = ({ dataStore }) => (
    <Fragment>
        { dataStore.data.map(datum => (
            <DataItem
                key={datum.id}
                {...datum}
            />
        ) }
    </Fragment>
)
export default compose(
    inject('dataStore'),
    observer,
)(DataHandler)
```

Is it better if we don't have to create two new component just use the higher order component to wrap our target componnent?

This is why we create `with-mobx-store`

## Usage

### withStore(stores, options)

`withStore` is a higher order component (HOC) that allow you to initialize component without wraping any provider.

You just simply wrap your component with `withStore`, then it's worked!

#### Parameters

* `stores` - Object for mapping name of store with store object.
* `options` - Options for modifying store lifecycle

#### Example

```js
import React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { withStore } from 'with-mobx-store'
import DataItem from './DataItem'
import DataStore from './store'
const DataHandler = ({ dataStore }) => (
    <Fragment>
        { dataStore.data.map(datum => (
            <DataItem
                key={datum.id}
                {...datum}
            />
        ) }
    </Fragment>
)
export default compose(
    withStore({
        dataStore: new DataStore(),
    }),
    inject('dataStore'),
    observer,
)(DataHandler)
```

### withComponentStore(stores, options)

`withComponentStore` is higher order component (HOC) that allow you to initialize component without wraping any provider.

Moreover, it works specifically with stores per component.

#### Parameters

* `stores` - Object for mapping name of store with store class.
* `options` - Options for modifying store lifecycle.

#### Example

```js
import React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { withComponentStore } from 'with-mobx-store'
import DataItem from './DataItem'
import DataStore from './stores/DataStore'
const DataHandler = ({ data }) => (
    <Fragment>
        { dataStore.data.map(datum => (
            <DataItem
                key={datum.id}
                {...datum}
            />
        ) }
    </Fragment>
)
export default compose(
    withComponentStore({
        data: DataStore,
    }),
    inject('dataStore'),
    observer,
)(DataHandler)
```

## Options

We provide some options that you can modify your stores after it is initialized.

### onInitialized

`onInitialized` is a function which is executed when the initialization of stores is complete.

#### Example

```js
import React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { withComponentStore } from 'with-mobx-store'
import DataItem from './DataItem'
import DataStore from './stores/DataStore'
const DataHandler = ({ data }) => (
    <Fragment>
        { dataStore.data.map(datum => (
            <DataItem
                key={datum.id}
                {...datum}
            />
        ) }
    </Fragment>
)
export default compose(
    withComponentStore({
        data: DataStore,
    }, {
        onInitialized: (stores) => {
            stores.data.fetchData('https://api.example.com/sample')
        },
    }),
    inject('dataStore'),
    observer,
)(DataHandler)
```

## License

(C) 2017 Wongnai Media Co, Ltd.

with-mobx-store is licensd under [MIT License](LICENSE.md)


[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.com/package/with-mobx-store
