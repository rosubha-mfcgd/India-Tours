import { StyleSheet } from 'react-native';

const TripListStyle = StyleSheet.create({

 
  screenText: {
        fontSize: 10,
        color: 'blue',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      image :{flex: 1,
         width: 300, 
         height: 200 },
      cardText: {fontSize:12,
            fontWeight: "bold",
            color: "black",
            backgroundColor: '#0000002f',
            position: "absolute", // child
            bottom: 160, // position where you want
            right: 0}
});

export default TripListStyle