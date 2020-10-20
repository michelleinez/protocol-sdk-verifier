import * as React from 'react';

import {ScreenDispatcherProps} from "../interfaces/ScreenDispatcherInterfaces";

import ScreenContainer from "../screens/ScreenDictionary";

export class ScreenDispatcher extends React.Component<ScreenDispatcherProps> {

    renderScreens() {
        return (
            <ScreenContainer
                screen={this.props.screen}
                authMethod={this.props.authMethod}
            />
        );
    }

    render() {
        return this.renderScreens();
    }
}