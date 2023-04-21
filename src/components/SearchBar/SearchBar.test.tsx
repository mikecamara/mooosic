/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar.tsx';

describe('SearchBar', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        onSearch={() => {
          console.log('Search bar exists');
        }}
      />
    );
    expect(getByPlaceholderText('Search for an artist')).toBeTruthy();
  });

  test('displays entered text', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <SearchBar
        onSearch={(searchQuery: string) => {
          console.log('Search query:', searchQuery);
        }}
      />
    );
    fireEvent.changeText(getByPlaceholderText('Search for an artist'), 'test');
    expect(getByDisplayValue('test')).toBeTruthy();
  });
});
