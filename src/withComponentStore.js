import withStore from './withStore'

/**
 * withComponentStore is higher order component (HOC) that allow you to initialize component without wraping any provider.
 * Moreover, it works specifically with stores per component.
 * @param { { string: class } } stores                  - Object for mapping name of store with store class. 
 * @param {Object}              options                 - Options for modifying store lifecycle.
 * @param {async function}      options.onInitialized   - Function which is executed when the initialization of stores is complete.
 */
const withComponentStore = (stores, options) => Component => {
    for (const storeName in stores) {
        stores[storeName] = new stores[storeName]()
    }
    const ComponentWithComponentStore = withStore(stores, options)(Component)
    ComponentWithComponentStore.displayName = 'withComponentStore'
    return ComponentWithComponentStore
}

export default withComponentStore
