import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={(searchQuery: string) => {}} />
    );
    expect(getByPlaceholderText('Search for an artist')).toBeTruthy();
  });

  test('displays entered text', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <SearchBar onSearch={(searchQuery: string) => {}} />
    );
    fireEvent.changeText(getByPlaceholderText('Search for an artist'), 'test');
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  // Remove this test since there's no "Clear" button in the provided SearchBar component
});
