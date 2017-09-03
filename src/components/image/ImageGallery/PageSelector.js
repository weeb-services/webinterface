import React from "react";
import {IconButton} from "material-ui";
import NavigationBack from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationForward from 'material-ui/svg-icons/navigation/chevron-right'

export default class PageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.onBackButtonClick = this.onBackButtonClick.bind(this);
        this.onForwardButtonClick = this.onForwardButtonClick.bind(this);
    }
    onBackButtonClick(event) {
        this.props.changePage(this.props.page - 1);
    }

    onForwardButtonClick(event) {
        this.props.changePage(this.props.page + 1);
    }

    render() {
        return (<div className="gallery-pageselector">
            <IconButton
                disabled={this.props.page <= 1} onTouchTap={this.onBackButtonClick}><NavigationBack/>
            </IconButton>
            {this.props.page}/{this.props.maxPage}
            <IconButton onTouchTap={this.onForwardButtonClick} disabled={this.props.page === this.props.maxPage}><NavigationForward/>
            </IconButton>
        </div>);
    }
}
