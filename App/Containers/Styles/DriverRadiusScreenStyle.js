import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  countBox: {
    position: 'absolute',
    bottom: '20%',
    alignSelf: 'center',
    backgroundColor: '#7B2BFC',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 35,
    alignItems: 'center',
  },
  simbol: {
    color: '#fff',
    fontSize: 25,
    marginRight: 13,
    marginTop: 10
  },
  infoBox: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    backgroundColor: '#7B2BFC',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 20
  },
  infoText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
})
