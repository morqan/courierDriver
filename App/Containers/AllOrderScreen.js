import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Dash from 'react-native-dash'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import API from '../Services/Api'
// import I18n from '../I18n'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AllOrderScreenStyle'
import AsyncStorage from '@react-native-community/async-storage'
import OrderInnerAction from '../Redux/OrderInnerRedux'

class AllOrderScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      error: null
    }
    this.getOrderHistory()
  }

  getOrderHistory = async () => {
    const token = await AsyncStorage.getItem('@token')
    this.token = 'Bearer ' + token
    this.setState({
      token: this.token
    })
    const api = API.create()
    let headers = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
      }
    }
    const orderHistory = await api.getOrderHistory(headers)

    if (orderHistory.status === 200) {
      this.setState({
        data: orderHistory.data.data,
        getOrders: orderHistory.config.url
      })
    } else {
      console.log(orderHistory)
      this.setState({
        error: orderHistory.data.msg
      })
    }
  }
  renderOrdersItem = ({item}) => {
    item.created = new Date(item.created)
    let onPress = async () => {
      let orderId = await item.id
      this.setState({
        orderId
      })
      console.log(this.state.orderId)
      let url = this.state.getOrders + '/' + orderId
      console.log(url)
      const self = this
      console.log(self.state.token)
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Authorization': self.state.token
        }
      })
        .then(json)
        .then(function (data) {
          console.log('Request succeeded with JSON response', data)
          console.log(data)
          self.props.attemptOrderInnerSuccess(data)
          self.setState({
            orderInner: data
          })
          self.props.navigation.navigate('OrderHistoryInnerScreen')
        })
        .catch(function (error) {
          console.log(error)
          console.log('err')
          self.setState({
            error: error.detail,
            loading: false
          })
        })
      function json (response) {
        console.log(response)
        console.log('json')
        return response.json()
      }
    }
    return (
      <TouchableOpacity style={styles.orderContainer}
        orderId={item.id}
        onPress={onPress}>
        <View style={styles.orderBox}>
          <Icon name='chevron-right' size={30} color='#451E5D' />
          {/* <Image style={styles.orderImg} source={item.picture}/> */}
          <Text style={styles.orderText}>Piyada | {item.created.toLocaleDateString()} </Text>
        </View>
        <View style={styles.orderBox}>
          <View>
            <View style={styles.orderAdressBox}>
              <Icon style={{paddingLeft: 3}} name='circle-outline' size={16} color='#606060' />
              <Text style={styles.orderAdress}>{item.pickup_location}</Text>
            </View>
            <Dash style={styles.orderDash} />
            <View style={styles.orderAdressBox}>
              <Icon name='map-marker-outline' size={21} color='#606060' />
              <Text style={styles.orderAdress}>{item.drop_location}</Text>
            </View>
          </View>
          <View style={styles.orderPriceBox}>
            <Text style={styles.orderPrice}>{item.bill_amount} AZN</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 8}}>
          <FlatList
            renderItem={this.renderOrdersItem}
            keyExtractor={(item) => item.id}
            data={this.state.data} />
        </View>
        {/* <View style={{flex: 1 }}> */}
        {/*  <MyButton */}
        {/*    text="TƏQVİMDƏN SEÇ" */}
        {/*    color="#fff" */}
        {/*    backgroundColor="#451E5D" /> */}
        {/* </View> */}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    orderInner: state.orderInner.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptOrderInnerSuccess: (payload) => dispatch(OrderInnerAction.orderInnerSuccess(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderScreen)
