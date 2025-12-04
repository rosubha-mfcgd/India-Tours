 import React from 'react';
    import { View } from 'react-native';
    import { AnimatedCircularProgress } from 'react-native-circular-progress';

    const PleaseWaitScreen = () => {
      return (
        <View>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={75} // Current progress percentage (0-100)
            tintColor="#00e0ff" // Color of the progress arc
            backgroundColor="#3d5875" // Color of the background circle
            onAnimationComplete={() => console.log('onAnimationComplete')}
            // Optional: Add a text component inside for displaying the value
            // renderCap={({ center }) => <Text style={{ position: 'absolute', top: center.y - 10, left: center.x - 10 }}>75%</Text>}
          />
        </View>
      );
    };

    export default PleaseWaitScreen;