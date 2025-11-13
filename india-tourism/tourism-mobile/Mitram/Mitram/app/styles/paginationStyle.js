import { StyleSheet } from 'react-native';

const PaginationStyle = StyleSheet.create({
    paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pageButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  activePageButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
  },
});

export default PaginationStyle