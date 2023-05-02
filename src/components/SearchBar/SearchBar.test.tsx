/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar.tsx';

describe('SearchBar', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText } = render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <SearchBar onSearch={async () => {}} />
    );
    expect(getByPlaceholderText('Search for an artist')).toBeTruthy();
  });

  test('displays entered text', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <SearchBar onSearch={async () => {}} />
    );
    fireEvent.changeText(getByPlaceholderText('Search for an artist'), 'test');
    expect(getByDisplayValue('test')).toBeTruthy();
  });
});
