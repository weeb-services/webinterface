import React from 'react';
import {Card, CardMedia, CardTitle} from "material-ui";

const wolkeAvatar = "https://cdn.discordapp.com/avatars/128392910574977024/a_226d78e3df190b9f2defbd54b426d409.gif?size=1024&f=.gif";
export default class AccountOverview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const imgStyle = {
            backgroundImage: `url(${wolkeAvatar })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '200px',
            height: '200px'
        };
        {/*<List>*/
        }
        {/*<ListItem style={{color: 'white'}} primaryText="Wolke" leftAvatar={<Avatar src={wolkeAvatar}/>}/>*/
        }
        {/*<ListItem style={{color: 'white'}} primaryText="Wolke" leftAvatar={<Avatar src={wolkeAvatar}/>}/>*/
        }
        {/*<ListItem style={{color: 'white'}} primaryText="Wolke" leftAvatar={<Avatar src={wolkeAvatar}/>}/>*/
        }
        {/*<ListItem style={{color: 'white'}} primaryText="Wolke" leftAvatar={<Avatar src={wolkeAvatar}/>}/>*/
        }
        {/*<ListItem style={{color: 'white'}} primaryText="Wolke" leftAvatar={<Avatar src={wolkeAvatar}/>}/>*/
        }
        {/*<ListItem style={{color: 'white'}} primaryText="Wolke" leftAvatar={<Avatar src={wolkeAvatar}/>}/>*/
        }
        {/*<ListItem style={{color: 'white'}} primaryText="Wolke" leftAvatar={<Avatar src={wolkeAvatar}/>}/>*/
        }
        {/*</List>*/
        }
        return (<div>
            <Card>
                <CardMedia overlay={<CardTitle title='Wolke' subtitle="Wolke#5985"/>}>
                    <div style={imgStyle}/>
                </CardMedia>

            </Card>
        </div>)
    }
}
