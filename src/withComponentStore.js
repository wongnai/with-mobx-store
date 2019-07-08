import withStore from './withStore'
import React, { useMemo, useEffect } from 'react'
import { Provider } from 'mobx-react'

/**
 * withComponentStore is higher order component (HOC) that allow you to initialize component without wraping any provider.
 * Moreover, it works specifically with stores per component.
 * @param { { string: class } } stores                  - Object for mapping name of store with store class. 
 * @param {Object}              options                 - Options for modifying store lifecycle.
 * @param {async function}      options.onInitialized   - Function which is executed when the initialization of stores is complete.
 */
const withComponentStore = (stores, options) => Component => {
    const { onInitialized, onMounted, onUnMounted } = options
    const ComponentWithComponentStore = props => {
        const stores = useMemo(() => {
            const initializedStores = {}
            for (const storeName in stores) {
                initializedStores[storeName] = new stores[storeName]()
            }
            onInitialized(initializedStores)
            return initializedStores
        }, [])
        useEffect(() => {
            onMounted && onMounted(stores, props)
            return () => {
                onUnMounted && onUnMounted(stores, props)
            }
        }, [])
        return (
            <Provider>
                <Component {...props} />
            </Provider>
        )
    }
    ComponentWithComponentStore.displayName = 'withComponentStore'
    return ComponentWithComponentStore
}

export default withComponentStore
