import { Provider } from 'mobx-react'
import React, { PureComponent } from 'react'

/**
 * withStore is a higher order component (HOC) that allow you to initialize component without wraping any provider
 * @param { { string: Store } } stores                  - Object for mapping name of store with store object. 
 * @param {Object}              options                 - Options for modifying store lifecycle.
 * @param {function}            options.onInitialized   - Function which is executed when the initialization of stores is complete.
 * @param {function}            options.onMounted       - Function which is executed when the component is mounted.
 * @param {function}            options.onUnMounted     - Function which is executed when the component is unmounted.
 */
const withStore = (stores, options) => {
    if (options) {
        const { onInitialized, onMounted } = options
        if (onInitialized) {
            onInitialized(stores)
        }
    }
    return Component => {
        class ComponentWithStore extends PureComponent {
            componentDidMount() {
                if (onMounted) {
                    onMounted(stores, this.props)
                }
            }

            componentWillUnmount() {
                if (onUnMounted) {
                    onUnMounted(stores, this.props)
                }
            }

            render() {
                return (
                    <Provider {...stores}>
                        <Component {...this.props} />
                    </Provider>
                )
            }
        }
        ComponentWithStore.displayName = 'withStore'
        return ComponentWithStore
    }
}

export default withStore
