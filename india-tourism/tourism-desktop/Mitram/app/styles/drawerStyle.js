 import { StyleSheet } from 'react-native';
 
 const Drawerstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    
    width: 100,
    height: 200,
    width: 100,
    backgroundColor: '#673AB7',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  mainContent: {
      width: 100, // Fixed width of 50 logical pixels
    backgroundColor: '#673AB7',
    padding: 20, 
    flexDirection: 'row',
  },
  menuButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ddd',
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 60,
    bottom: 0,
    width: 180,
    height: 1000,
    backgroundColor: '#a34040ff',
     borderColor: '#a54274ff',
    zIndex: 2,
  },
  sidebarItem: {
     color: 'white',
    fontWeight: 'bold',
    padding: 20,
     zIndex: 2,
     width: 180
  },
  overlay: {
    position: 'absolute',
    top: 60,
    right: 0,
    bottom: 0,
    width: 140,
    height: 1000,
    backgroundColor: '#1e0ff0c7',
    flex: 1,
    zIndex: 2,
  },
});

export default Drawerstyles