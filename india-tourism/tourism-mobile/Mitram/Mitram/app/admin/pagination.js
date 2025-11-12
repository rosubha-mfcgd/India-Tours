import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PaginationStyle from '../styles/paginationStyle.js';
export default function Pagination ({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={PaginationStyle.paginationContainer}>
      {/* Previous Button (Optional) */}
      {/* <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.pageButton}
      >
        <Text style={styles.buttonText}>Prev</Text>
      </TouchableOpacity> */}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <TouchableOpacity
          key={page}
          onPress={()=>onPageChange(page)}
          style={[PaginationStyle.pageButton, currentPage === page && PaginationStyle.activePageButton]}
        >
          <Text style={[PaginationStyle.buttonText, currentPage === page && PaginationStyle.activeButtonText]}>
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Next Button */}
      <TouchableOpacity
        onClick={()=>onPageChange(page)}
        disabled={currentPage === totalPages}
        style={PaginationStyle.pageButton}
      >
        <Text style={PaginationStyle.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};