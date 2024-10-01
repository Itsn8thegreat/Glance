import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 75,
    color: '#008000',
    fontFamily: 'MP-Bold',
    textAlign: 'center',
    lineHeight: 75,
  },
  subtitle: {
    fontSize: 15,
    color: 'gray',
    fontFamily: 'MP-BoldIt',
    textAlign: 'center',
    lineHeight: 15,
    marginVertical: 5,
  },
  barcodeContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  barcodePlaceholder: {
    width: 200,
    height: 100,
    backgroundColor: '#C0C0C0',
  },
  barcodeText: {
    fontSize: 18,
    marginTop: 10,
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  numberButton: {
    width: 70,
    height: 60,
    backgroundColor: '#000',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  insideManhattanButton: {
    width: '75%',
    paddingVertical: 15,
    backgroundColor: 'green',
    borderRadius: 20,
    marginVertical: 10,
  },
  insideManhattanText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  eventsButton: {
    width: '75%',
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 20,
    marginVertical: 10,
  },
  eventsText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
