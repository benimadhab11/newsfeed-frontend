import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allBooksSelector } from "../../reducers/items";
import { fetchItems } from "../../actions/items";
import { createItem } from "../../actions/items";
import { Item, Rating, Loader, Dimmer } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';


class DashboardPage extends React.Component {
  state = {
    guid:''
  };

  componentDidMount() {
    this.props.fetchItems();
    this.handleRate=this.handleRate.bind(this);
  }

  handleRate(e, { rating, maxRating, book}){
    var userRating = {};
    userRating.email = localStorage.getItem("email");;
    userRating.rating = rating;
    var guidObject = e.currentTarget.parentNode.parentNode.parentNode.id ;
    this.props.createItem(userRating,guidObject);
    this.setState({guid:guidObject});
    setTimeout(() => {
      toast(
          {
              title: 'Notification!',
              description: <p>Thanks for rating this article. Please refresh the page to see the cumulative ratings by different users</p>
          }
      );
  }, 1000);
  }

  render() {
    const { isConfirmed, items } = this.props;
    return (
      <div>
       
        {!isConfirmed}
        {items.length === 0 ? <Dimmer active inverted><Loader inverted>Loading</Loader></Dimmer>: 

        items.map(item => (

            <Item.Group key={item.guidObject}>
              <Item id={item.guidObject}>
                <Item.Content>
                  <Item.Header as="a"><a href={item.link}>{item.title}</a></Item.Header>
                  <Item.Description>{item.description}</Item.Description>
                  <Rating maxRating={5} defaultRating={item.rating} onRate={this.handleRate} clearable/>
                  <Item.Extra>{this.state.guid === item.guidObject?<SemanticToastContainer />:''}</Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
          ))
        }
        

        
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  createItem: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    items: allBooksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchItems, createItem})(DashboardPage);
