import React from "react";
import {IconButton} from "material-ui";
import NavigationBack from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationForward from 'material-ui/svg-icons/navigation/chevron-right'
import BlockIcon from 'material-ui/svg-icons/content/block';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import AddIcon from 'material-ui/svg-icons/content/add';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => {
    return {
        total: state.image.total,
        page: state.image.page,
        maxPage: Math.ceil(state.image.total / 25)
    }
};
class PageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.onBackButtonClick = this.onBackButtonClick.bind(this);
        this.onForwardButtonClick = this.onForwardButtonClick.bind(this);
        this.onNsfwButtonClick = this.onNsfwButtonClick.bind(this);
    }

    onBackButtonClick(event) {
        this.props.changePage(this.props.page - 1);
    }

    onForwardButtonClick(event) {
        this.props.changePage(this.props.page + 1);
    }

    onNsfwButtonClick(event) {
        this.props.cycleNsfw(this.props.nsfw);
    }

    render() {
        let nsfwIcon;
        switch (this.props.nsfw) {
            case 'false':
                nsfwIcon = <BlockIcon color="red"/>;
                break;
            case 'true':
                nsfwIcon = <RemoveIcon/>;
                break;
            case 'only':
                nsfwIcon = <AddIcon color="green"/>;
                break;
            default:
                nsfwIcon = <BlockIcon color="red"/>;
                break;
        }
        return (<div className="gallery-pageselector">
            NSFW:
            <IconButton tooltip={this.props.nsfw} onTouchTap={this.onNsfwButtonClick}>
                {nsfwIcon}
            </IconButton>
            <IconButton
                disabled={this.props.page <= 1} onTouchTap={this.onBackButtonClick}><NavigationBack/>
            </IconButton>
            {this.props.page}/{this.props.maxPage}
            <IconButton onTouchTap={this.onForwardButtonClick}
                        disabled={this.props.page === this.props.maxPage}><NavigationForward/>
            </IconButton>
        </div>);
    }
}
const ConnectedPageSelector = withRouter(connect(mapStateToProps)(PageSelector));
export default ConnectedPageSelector
