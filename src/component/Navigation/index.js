import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import SvgIcon from 'material-ui/SvgIcon';

const Complete = (props) => (
    <SvgIcon {...props}>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </SvgIcon>
);
const Created = (props) => (
    <SvgIcon {...props}>
        <circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="12" r="10"/>
    </SvgIcon>
);
const All = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

const completeIcon = <Complete />;
const created = <Created />;
const all = <All />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Menu: 0,
        };
        this.setSelect = this.setSelect.bind(this);
    }
    setSelect(index){
        this.props.menuChange(index)
    }
    render() {
        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.props.menu}>
                    <BottomNavigationItem
                        label="All"
                        icon={all}
                        onClick={() => this.setSelect(0)}
                    />
                    <BottomNavigationItem
                        label="Created"
                        icon={created}
                        onClick={() => this.setSelect(1)}
                    />
                    <BottomNavigationItem
                        label="Completed"
                        icon={completeIcon}
                        onClick={() => this.setSelect(2)}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}

export default Navigation;