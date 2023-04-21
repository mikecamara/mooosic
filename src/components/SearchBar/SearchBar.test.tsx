import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    test('renders correctly', () => {
      render(<SearchBar />);
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });
  
    test('displays entered text', () => {
      render(<SearchBar />);
      fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'test' } });
      expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    });
  
    test('clears entered text when clear button is clicked', () => {
      render(<SearchBar />);
      fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'test' } });
      fireEvent.click(screen.getByText('Clear'));
      expect(screen.queryByDisplayValue('test')).not.toBeInTheDocument();
    });
  });
  
