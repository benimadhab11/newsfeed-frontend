import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allItemsSelector } from "../../reducers/bestitems";
import { fetchBest } from "../../actions/bestitems";
import { Item, Loader, Dimmer } from 'semantic-ui-react';

class BestItemPage extends React.Component {
  state = {
    guid:''
  };

  componentDidMount() {
    this.props.fetchBest().then(data => this.setState({bestitems:data}));
  }


  render() {
    const { isConfirmed } = this.props;
    var fiveitems = [];
    if("bestitems" in this.state) {
      fiveitems = this.state.bestitems.data;
    }
    return (
      <div>
       
        {!isConfirmed}
        {fiveitems.length === 0 ? <Dimmer active inverted><Loader inverted>Loading</Loader></Dimmer>: 

        fiveitems.map(item => (

            <Item.Group>
              <Item id={item.guidObject}>
                <Item.Content>
                  <Item.Header as='a'><a href={item.link}>{item.title}</a></Item.Header>
                  <Item.Description>{item.description}</Item.Description>
                  </Item.Content>
              </Item>
            </Item.Group>
          ))
        }
        

        
      </div>
    );
  }
}

BestItemPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBest: PropTypes.func.isRequired,
  bestitems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    bestitems: allItemsSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBest})(BestItemPage);
