import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';

export interface Props {
    children: React.ReactNode,
    onChange: (isVisible: boolean) => void
}

interface State {
    rectTop: number,
    rectBottom: number,
    rectWidth: number
}

const InViewPort = class extends Component<Props, State> {
    lastValue = false;
    interval: number | null = null;
    myview: View | null = null;

    constructor(props: Props) {
        super(props);
        this.state = { rectTop: 0, rectBottom: 0, rectWidth: 0 };
    }

    componentDidMount() {
        this.startWatching();
    }

    componentWillUnmount() {
        this.stopWatching();
    }

    startWatching() {
        if (this.interval) {
            return;
        }

        this.interval = setInterval(() => {
            if (!this.myview) {
                return;
            }
            this.myview.measure((x, y, width, height, pageX, pageY) => {
                this.setState({
                    rectTop: pageY,
                    rectBottom: pageY + height,
                    rectWidth: pageX + width
                });
            });
            this.isInViewPort();
        }, 0);
    }

    stopWatching() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    isInViewPort() {
        const window = Dimensions.get('window');

        const isVisible =
            this.state.rectBottom !== 0 &&
            this.state.rectTop >= 0 &&
            this.state.rectBottom <= window.height &&
            this.state.rectWidth > 0 &&
            this.state.rectWidth <= window.width;

        if (this.lastValue !== isVisible) {
            this.lastValue = isVisible;
            this.props.onChange(isVisible);
        }
    }

    render() {
        return (
            <View
                collapsable={false}
                ref={component => {
                    this.myview = component;
                }}
                {...this.props}
            >
                {this.props.children}
            </View>
        );
    }
};

export default InViewPort;
