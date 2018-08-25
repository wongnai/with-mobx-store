import { Provider } from 'mobx-react'
import React from 'react'

/**
 * withStore is a higher order component (HOC) that allow you to initialize component without wraping any provider
 * @param { { string: Store } } stores                  - Object for mapping name of store with store object. 
 * @param {Object}              options                 - Options for modifying store lifecycle
 * @param {function}      options.onInitialized   - Function which is executed when the initialization of stores is complete.
 */
const withStore = (stores, options) => {
    if (options) {
        const { onInitialized } = options
        if (onInitialized) {
            onInitialized(stores)
        }
    }
    return Component => {
        const ComponentWithStore = props => (
            <Provider {...stores}>
                <Component {...props} />
            </Provider>
        )
        ComponentWithStore.displayName = 'withStore'
        return ComponentWithStore
    }
}

export default withStore
